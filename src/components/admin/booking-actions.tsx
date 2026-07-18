"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/app/actions/admin";

type BookingActionsProps = {
  bookingId: string;
  currentStatus: string;
};

export function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleStatusUpdate(newStatus: string) {
    setUpdating(true);
    try {
      await updateBookingStatus(bookingId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  }

  if (updating) {
    return (
      <div className="flex items-center gap-1">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {currentStatus === "PENDING" && (
        <>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleStatusUpdate("CONFIRMED")}
            title="Confirm"
            className="size-8 p-0"
          >
            <Check className="size-4 text-blue-600 dark:text-blue-500" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleStatusUpdate("CANCELLED")}
            title="Cancel"
            className="size-8 p-0"
          >
            <X className="size-4 text-red-600 dark:text-red-500" />
          </Button>
        </>
      )}
      {currentStatus === "CONFIRMED" && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => handleStatusUpdate("COLLECTED")}
          title="Mark as Collected"
          className="size-8 p-0"
        >
          <Package className="size-4 text-green-600 dark:text-green-500" />
        </Button>
      )}
      {(currentStatus === "COLLECTED" || currentStatus === "CANCELLED") && (
        <span className="text-xs text-muted-foreground">-</span>
      )}
    </div>
  );
}
