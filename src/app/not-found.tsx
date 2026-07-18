import Link from "next/link";
import { ArrowLeft, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 pt-20">
      <div className="glow-green pointer-events-none absolute top-1/4 left-1/2 size-125 -translate-x-1/2" />
      <div className="relative text-center">
        <Recycle className="mx-auto size-14 text-brand-green" strokeWidth={1.5} />
        <p className="mt-6 font-heading text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">This page got recycled</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="size-4" /> Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/book">Book a Pickup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
