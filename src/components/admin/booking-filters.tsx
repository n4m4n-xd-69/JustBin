"use client";

import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STATUSES = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COLLECTED", label: "Collected" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "ALL";
  const currentSearch = searchParams.get("search") || "";
  const searchTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/bookings?${params.toString()}`);
  }

  function handleSearchChange(value: string) {
    // Clear previous timer
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    // Set new timer
    searchTimerRef.current = setTimeout(() => {
      updateFilters("search", value);
    }, 500);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="flex gap-1 rounded-lg border border-border bg-muted/50 p-1">
        {STATUSES.map((status) => (
          <Button
            key={status.value}
            size="sm"
            variant={currentStatus === status.value ? "gradient" : "ghost"}
            onClick={() => updateFilters("status", status.value)}
            className="h-8"
          >
            {status.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, city..."
          defaultValue={currentSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
}
