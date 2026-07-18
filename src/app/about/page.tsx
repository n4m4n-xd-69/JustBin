import type { Metadata } from "next";
import {
  CloudRain,
  Droplets,
  Flame,
  Goal,
  Leaf,
  Recycle,
  Rocket,
  Sparkles,
  Target,
  TreePine,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { About as EcosystemSection } from "@/components/sections/about";
import { Cta } from "@/components/sections/cta";
import {
  ENVIRONMENTAL_IMPACTS,
  IMPACT_AREAS,
  MISSION_POINTS,
  PROBLEM_STATS,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "JustBin is building India's smartest digital recycling network — transforming waste into opportunity and empowering local scrap collectors.",
};

const IMPACT_ICONS = [Flame, Droplets, CloudRain];
const MISSION_ICONS = [Target, Goal, Rocket];
const AREA_ICONS = [Recycle, TreePine, Leaf, Users];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Environmental Mission"
        title={
          <>
            Building India&apos;s Smartest{" "}
            <span className="text-gradient">Digital Recycling Network</span>
          </>
        }
        description="India faces a massive recycling challenge. JustBin is here to transform how we manage waste — making recycling accessible, transparent, and rewarding for everyone."
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* The problem */}
        <SectionHeading
          eyebrow="The Growing Crisis"
          title="India's Waste Problem"
          description="Every day, millions of tons of recyclable waste end up in landfills, polluting our environment and wasting valuable resources."
        />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {PROBLEM_STATS.map((stat) => (
            <StaggerItem key={stat.title}>
              <Card className="h-full p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                <p className="font-heading text-4xl font-bold text-gradient">
                  {stat.value}
                </p>
                <h3 className="mt-3 font-semibold">{stat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stat.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Environmental & health impact */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Why It Matters"
            title="Environmental & Health Impact"
            description="Poor waste management affects every aspect of our lives."
          />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {ENVIRONMENTAL_IMPACTS.map((impact, i) => {
              const Icon = IMPACT_ICONS[i];
              return (
                <StaggerItem key={impact.title}>
                  <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/40">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{impact.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {impact.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* The solution / mission */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="The Solution"
            title={
              <>
                JustBin: <span className="text-gradient">Digital</span> Waste
                Management
              </>
            }
            description="JustBin solves this problem digitally with instant online bookings — connecting households with verified collectors in 30 seconds."
          />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {MISSION_POINTS.map((point, i) => {
              const Icon = MISSION_ICONS[i];
              return (
                <StaggerItem key={point.title}>
                  <Card className="h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-emerald/40 hover:shadow-sm hover:shadow-brand-emerald/5">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-emerald/10 text-brand-emerald">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 font-semibold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Impact areas */}
        <div className="mt-20">
          <SectionHeading
            eyebrow="Building a Greener Tomorrow"
            title="Our Impact"
            description="Every pickup contributes to reducing landfill waste and creating a sustainable recycling ecosystem in India."
          />
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT_AREAS.map((area, i) => {
              const Icon = AREA_ICONS[i];
              return (
                <StaggerItem key={area.title}>
                  <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{area.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {area.description}
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <FadeIn className="mt-20">
          <Card className="relative overflow-hidden p-8 text-center sm:p-12">
            <div className="glow-green pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2" />
            <div className="bg-noise pointer-events-none absolute inset-0" />
            <Sparkles className="relative mx-auto size-8 text-brand-green" />
            <p className="relative mx-auto mt-4 max-w-3xl text-lg leading-relaxed sm:text-xl">
              &ldquo;We are building India&apos;s smartest digital recycling
              network. JustBin aims to transform waste into opportunity and
              become India&apos;s next{" "}
              <span className="text-gradient font-semibold">
                green-tech unicorn
              </span>
              .&rdquo;
            </p>
            <p className="relative mt-4 text-sm text-muted-foreground">
              — Team JustBin
            </p>
          </Card>
        </FadeIn>
      </div>

      <EcosystemSection />
      <Cta />
    </>
  );
}
