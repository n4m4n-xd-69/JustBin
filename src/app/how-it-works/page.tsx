import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Globe,
  HandCoins,
  MapPin,
  MessageCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { BOOKING_STEPS } from "@/lib/data";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Book your scrap pickup in 6 easy steps — from booking online to instant payment at your doorstep. Takes only 30 seconds.",
};

const STEP_ICONS = [
  Globe,
  MapPin,
  Package,
  CalendarCheck,
  MessageCircle,
  HandCoins,
];

const GUARANTEES = [
  "Takes only 30 seconds to complete",
  "We'll confirm within 30 minutes",
  "Verified, background-checked collectors",
  "Paid instantly at market rates",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How to Book a Pickup"
        title={
          <>
            Book Your Order in{" "}
            <span className="text-gradient">6 Easy Steps</span>
          </>
        }
        description="A complete step-by-step guide to selling your scrap through JustBin — from booking online to getting paid at your doorstep."
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* Step timeline */}
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKING_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <StaggerItem key={step.step}>
                <Card className="group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                  <span className="absolute -top-3 -right-1 font-heading text-7xl font-bold text-muted-foreground/10 transition-colors duration-300 group-hover:text-brand-green/15">
                    {step.step}
                  </span>
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <h2 className="mt-4 font-semibold">
                    {step.step}. {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Guarantees strip */}
        <FadeIn className="mt-14">
          <Card className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 p-6">
            {GUARANTEES.map((g) => (
              <span
                key={g}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="size-4 text-brand-green" /> {g}
              </span>
            ))}
          </Card>
        </FadeIn>

        {/* What you need */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Before You Book"
            title="All you need is your scrap"
            description="No account required, no pickup fee, no minimum for most categories. Keep your scrap sorted and clean to get the best rates."
          />
          <FadeIn className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/book">
                <ClipboardList className="size-4" /> Start Booking Now{" "}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>

      <Faq />
      <Cta />
    </>
  );
}
