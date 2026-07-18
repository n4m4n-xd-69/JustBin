import {
  HandCoins,
  Hourglass,
  LineChart,
  Play,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { StatsBand } from "@/components/sections/stats";

const KABADIWALA_BENEFITS = [
  {
    icon: HandCoins,
    color: "text-brand-emerald bg-brand-emerald/10",
    title: "More Orders",
    description: "Get more pickup requests.",
  },
  {
    icon: Hourglass,
    color: "text-brand-teal bg-brand-teal/10",
    title: "Save Time",
    description: "Less roaming, more earning.",
  },
  {
    icon: LineChart,
    color: "text-brand-teal bg-brand-teal/10",
    title: "Grow Business",
    description: "Increase income and stability.",
  },
  {
    icon: ShieldCheck,
    color: "text-brand-green bg-brand-green/10",
    title: "Trusted Platform",
    description: "Verified leads from real customers.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Kabadiwala banner */}
        <FadeIn>
          <Card className="relative overflow-hidden bg-gradient-to-r from-card via-card to-brand-emerald/10 p-8 sm:p-12">
            <div className="glow-emerald pointer-events-none absolute -right-20 -top-20 size-80" />
            <div className="bg-noise pointer-events-none absolute inset-0" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr]">
              <div className="hidden size-20 items-center justify-center rounded-full bg-gradient-brand lg:flex">
                <Play className="size-8 fill-white text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Empowering Kabadiwalas.
                  <br />
                  <span className="text-gradient">
                    Building a Better Ecosystem.
                  </span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  JustBin brings more customers to local kabadiwalas so they
                  spend less time searching and more time earning. We are
                  building India&apos;s smartest digital recycling network —
                  transforming waste into opportunity and aiming to become
                  India&apos;s next green-tech unicorn.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        {/* Collector benefits */}
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KABADIWALA_BENEFITS.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <Card className="flex h-full items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-sm hover:shadow-brand-emerald/5">
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full ${benefit.color}`}
                >
                  <benefit.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{benefit.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Vision stats */}
        <StatsBand />
      </div>
    </section>
  );
}
