import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { BookingStatusBadge } from "@/components/admin/booking-status-badge";
import { BookingActions } from "@/components/admin/booking-actions";
import { BookingFilters } from "@/components/admin/booking-filters";

async function getBookings(searchParams: {
  status?: string;
  search?: string;
}) {
  try {
    const where: any = {};

    if (searchParams.status && searchParams.status !== "ALL") {
      where.status = searchParams.status;
    }

    if (searchParams.search) {
      where.OR = [
        { name: { contains: searchParams.search, mode: "insensitive" } },
        { phone: { contains: searchParams.search } },
        { city: { contains: searchParams.search, mode: "insensitive" } },
        { address: { contains: searchParams.search, mode: "insensitive" } },
      ];
    }

    return await prisma.pickupBooking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string };
}) {
  await requireAdmin();

  const bookings = await getBookings(searchParams);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Pickup Bookings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage all pickup requests and update their status
        </p>
      </div>

      <BookingFilters />

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Scrap Types
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Pickup
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        {booking.user && (
                          <p className="text-xs text-muted-foreground">
                            {booking.user.email}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">{booking.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium">{booking.city}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.address.slice(0, 30)}
                          {booking.address.length > 30 ? "..." : ""}
                        </p>
                        {booking.pincode && (
                          <p className="text-xs text-muted-foreground">
                            {booking.pincode}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {booking.scrapTypes.slice(0, 2).map((type) => (
                          <span
                            key={type}
                            className="inline-flex rounded-md bg-brand-green/10 px-2 py-0.5 text-xs text-brand-green"
                          >
                            {type}
                          </span>
                        ))}
                        {booking.scrapTypes.length > 2 && (
                          <span className="inline-flex items-center text-xs text-muted-foreground">
                            +{booking.scrapTypes.length - 2}
                          </span>
                        )}
                      </div>
                      {booking.estimatedWeight && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Est: {booking.estimatedWeight}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium">
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </p>
                        {booking.pickupTime && (
                          <p className="text-xs text-muted-foreground">
                            {booking.pickupTime}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-4 py-3">
                      <BookingActions bookingId={booking.id} currentStatus={booking.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
