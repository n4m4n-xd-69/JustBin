import { BookOpen, CheckCircle2, Clock, Mail, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

async function getStats() {
  try {
    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      collectedBookings,
      totalContacts,
      totalUsers,
    ] = await Promise.all([
      prisma.pickupBooking.count(),
      prisma.pickupBooking.count({ where: { status: "PENDING" } }),
      prisma.pickupBooking.count({ where: { status: "CONFIRMED" } }),
      prisma.pickupBooking.count({ where: { status: "COLLECTED" } }),
      prisma.contactMessage.count(),
      prisma.user.count({ where: { role: "USER" } }),
    ]);

    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      collectedBookings,
      totalContacts,
      totalUsers,
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      collectedBookings: 0,
      totalContacts: 0,
      totalUsers: 0,
    };
  }
}

async function getRecentBookings() {
  try {
    return await prisma.pickupBooking.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });
  } catch (error) {
    console.error("Failed to fetch recent bookings:", error);
    return [];
  }
}

export default async function AdminDashboard() {
  await requireAdmin();

  const stats = await getStats();
  const recentBookings = await getRecentBookings();

  const STATS = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: BookOpen,
      color: "text-brand-green bg-brand-green/10",
    },
    {
      label: "Pending",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-600/10 dark:text-yellow-500 dark:bg-yellow-500/10",
    },
    {
      label: "Confirmed",
      value: stats.confirmedBookings,
      icon: CheckCircle2,
      color: "text-blue-600 bg-blue-600/10 dark:text-blue-500 dark:bg-blue-500/10",
    },
    {
      label: "Collected",
      value: stats.collectedBookings,
      icon: TrendingUp,
      color: "text-brand-emerald bg-brand-emerald/10",
    },
    {
      label: "Contact Messages",
      value: stats.totalContacts,
      icon: Mail,
      color: "text-brand-teal bg-brand-teal/10",
    },
    {
      label: "Registered Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-brand-green bg-brand-green/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with JustBin.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`flex size-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="size-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Recent Bookings</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    City
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Pickup Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((booking) => (
                    <tr key={booking.id} className="transition-colors hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <p className="font-medium">{booking.name}</p>
                          {booking.user && (
                            <p className="text-xs text-muted-foreground">{booking.user.email}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {booking.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {booking.city}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            booking.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : booking.status === "CONFIRMED"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : booking.status === "COLLECTED"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
