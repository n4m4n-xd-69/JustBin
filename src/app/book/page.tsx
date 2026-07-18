import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book a Pickup",
  description:
    "Schedule a free doorstep scrap pickup with JustBin — takes only 30 seconds.",
};

export default function BookPage() {
  return (
    <div className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="glow-green pointer-events-none absolute -top-40 right-0 size-150 opacity-50" />
      <div className="glow-emerald pointer-events-none absolute bottom-0 -left-40 size-125 opacity-40" />
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <BookingForm />
      </div>
    </div>
  );
}
