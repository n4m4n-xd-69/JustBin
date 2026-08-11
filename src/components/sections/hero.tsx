"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Leaf,
  Lock,
  Recycle,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

const TRUST_ITEMS = [
  {
    icon: Truck,
    color: "text-brand-green bg-brand-green/10",
    title: "Doorstep Pickup",
    description: "We come to you. No need to travel anywhere.",
  },
  {
    icon: ShieldCheck,
    color: "text-brand-teal bg-brand-teal/10",
    title: "Transparent Pricing",
    description: "Get the best market prices with complete transparency.",
  },
  {
    icon: Users,
    color: "text-brand-emerald bg-brand-emerald/10",
    title: "Verified Collectors",
    description: "We work with trusted local kabadiwalas.",
  },
  {
    icon: Clock,
    color: "text-brand-lime bg-brand-lime/10",
    title: "Flexible Time",
    description: "Choose a pickup time that fits your daily schedule.",
  },
  {
    icon: Lock,
    color: "text-brand-green bg-brand-green/10",
    title: "Simple & Secure",
    description: "Easy booking and secure transactions.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      {/* Ambient glows + layered texture (dot grid + film grain) */}
      <div className="glow-green pointer-events-none absolute -top-32 right-0 size-150 opacity-70" />
      <div className="glow-emerald pointer-events-none absolute top-40 -left-40 size-125 opacity-60" />
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeIn direction="up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-4 py-1.5 text-xs font-medium text-brand-green">
                <Sprout className="size-3.5" /> New Startup — Join Early!
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Sell Scrap
                <br />
                Without
                <br />
                <span className="text-gradient">Leaving Home.</span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Book a pickup online and sell your scrap directly to verified
                local scrap collectors with transparent pricing.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/book">
                    Book Pickup <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/rates">View Scrap Rates</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span>
                  <strong className="font-heading text-xl font-bold text-foreground">
                    30 sec
                  </strong>{" "}
                  booking
                </span>
                <span className="hidden h-6 w-px bg-border sm:block" />
                <span>
                  <strong className="font-heading text-xl font-bold text-foreground">
                    Free
                  </strong>{" "}
                  doorstep pickup
                </span>
                <span className="hidden h-6 w-px bg-border sm:block" />
                <span>
                  <strong className="font-heading text-xl font-bold text-foreground">
                    Instant
                  </strong>{" "}
                  payment
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Visual */}
          <FadeIn direction="left" delay={0.2} className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="glow-green absolute inset-0 scale-125" />
              {/* Slow-rotating dashed orbit */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border-2 border-dashed border-brand-green/15"
              />
              {/* Pulsing ring */}
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 m-auto size-64 rounded-full border border-brand-green/40"
              />
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative flex size-72 items-center justify-center rounded-full border-2 border-brand-green/40 bg-card shadow-2xl shadow-brand-green/25 backdrop-blur p-1 overflow-hidden ring-4 ring-brand-green/10">
                  <Image
                    src="/logo.png"
                    alt="JustBin Mascot Logo"
                    width={320}
                    height={320}
                    priority
                    className="size-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-8 flex size-16 items-center justify-center rounded-2xl border border-brand-emerald/25 bg-card/80 shadow-sm shadow-brand-green/5 backdrop-blur"
              >
                <Recycle className="size-8 text-brand-emerald" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-4 flex size-16 items-center justify-center rounded-2xl border border-brand-green/25 bg-card/80 shadow-sm shadow-brand-green/5 backdrop-blur"
              >
                <Leaf className="size-8 text-brand-green" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 right-16 flex size-14 items-center justify-center rounded-2xl border border-brand-teal/25 bg-card/80 shadow-sm shadow-brand-green/5 backdrop-blur"
              >
                <Truck className="size-7 text-brand-teal" />
              </motion.div>
            </div>
          </FadeIn>
        </div>

        {/* Trust strip */}
        <Stagger className="mt-16">
          <Card className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
            {TRUST_ITEMS.map((item) => (
              <StaggerItem
                key={item.title}
                className="flex items-start gap-3 p-5 transition-colors hover:bg-muted/50"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${item.color}`}
                >
                  <item.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Card>
        </Stagger>
      </div>
    </section>
  );
}
