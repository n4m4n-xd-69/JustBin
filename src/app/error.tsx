"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 pt-20">
      <div className="text-center">
        <AlertTriangle className="mx-auto size-12 text-brand-lime" />
        <h1 className="mt-6 text-2xl font-bold">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          An unexpected error occurred. Please try again — if it keeps
          happening, reach us on WhatsApp.
        </p>
        <Button className="mt-8" onClick={reset}>
          <RotateCcw className="size-4" /> Try Again
        </Button>
      </div>
    </div>
  );
}
