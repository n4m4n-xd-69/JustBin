"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function updateBookingStatus(bookingId: string, status: string) {
  await requireAdmin();

  const validStatuses = ["PENDING", "CONFIRMED", "COLLECTED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  try {
    await prisma.pickupBooking.update({
      where: { id: bookingId },
      data: { status: status as any },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/bookings");

    return { success: true };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    throw new Error("Failed to update booking status");
  }
}
