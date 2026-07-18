import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/data";

const STEP_ICONS = [ClipboardList, CalendarCheck, Truck, Users];
const STEP_COLORS = [
  "text-brand-green border-brand-green/40 bg-brand-green/10",
  "text-brand-emerald border-brand-emerald/40 bg-brand-emerald/10",
  "text-brand-teal border-brand-teal/40 bg-brand-teal/10",
  "text-brand-green border-brand-green/40 bg-brand-green/10",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/60 px-6 py-12 sm:px-10">
          <SectionHeading
            eyebrow="Simple by Design"
            title="How It Works"
            description="Sell your scrap in four simple steps — it takes only 30 seconds to book."
          />

          <Stagger className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connector line (desktop) */}
            <div
              aria-hidden
              className="absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-border lg:block"
            />
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <StaggerItem key={step.step} className="relative text-center">
                  <div
                    className={`mx-auto flex size-16 items-center justify-center rounded-full border-2 ${STEP_COLORS[i]} transition-transform duration-300 hover:scale-110`}
                  >
                    <Icon className="size-7" />
                  </div>
                  <p className="mt-4 font-semibold">
                    {step.step}. {step.title}
                  </p>
                  <p className="mx-auto mt-2 max-w-3xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/how-it-works">
                See the Detailed Guide <ArrowRight className="size-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
