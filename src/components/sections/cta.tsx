import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";

export function Cta() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-md shadow-brand-green/5 sm:p-16">
            <div className="glow-green pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2" />
            <div className="bg-noise pointer-events-none absolute inset-0" />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Make an <span className="text-gradient">Impact?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Start your recycling journey today. Quick booking, transparent
              pricing, and doorstep service — all in 30 seconds. Every pickup
              helps build a cleaner, greener India.
            </p>
            <div className="relative mt-8">
              <Button size="lg" asChild>
                <Link href="/book">
                  Book Your First Pickup <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
