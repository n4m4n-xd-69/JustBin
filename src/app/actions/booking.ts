"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { WHATSAPP_NUMBER } from "@/lib/data";

export type BookingResult =
  | { success: true; bookingId: string | null; whatsappUrl: string }
  | { success: false; error: string };

function buildWhatsappUrl(data: BookingInput): string {
  const message = [
    "🗑️ *New JustBin Pickup Request*",
    "",
    `👤 Name: ${data.name}`,
    `📞 Phone: ${data.phone}`,
    `📍 Address: ${data.address}, ${data.city}${data.pincode ? ` - ${data.pincode}` : ""}`,
    `♻️ Scrap: ${data.scrapTypes.join(", ")}`,
    data.estimatedWeight ? `⚖️ Approx weight: ${data.estimatedWeight}` : null,
    `📅 Date: ${data.pickupDate}`,
    `⏰ Time: ${data.pickupTime}`,
    data.notes ? `📝 Notes: ${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export async function createBooking(input: BookingInput): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid booking details",
    };
  }

  const data = parsed.data;
  const whatsappUrl = buildWhatsappUrl(data);

  let bookingId: string | null = null;
  try {
    const session = await auth().catch(() => null);
    const booking = await prisma.pickupBooking.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pincode: data.pincode || null,
        scrapTypes: data.scrapTypes,
        estimatedWeight: data.estimatedWeight || null,
        pickupDate: new Date(data.pickupDate),
        pickupTime: data.pickupTime,
        notes: data.notes || null,
        userId: session?.user?.id ?? null,
      },
    });
    bookingId = booking.id;
  } catch (error) {
    // If the database is unreachable we still hand the user the WhatsApp
    // hand-off so the order isn't lost — the order desk receives it there.
    console.error("Failed to persist booking:", error);
  }

  return { success: true, bookingId, whatsappUrl };
}
