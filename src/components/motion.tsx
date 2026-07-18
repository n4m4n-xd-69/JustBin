"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * If IntersectionObserver never fires (very old browsers, some crawlers,
 * headless renderers), reveal everything after a short grace period so
 * content can never be stuck invisible.
 */
function useRevealFallback() {
  const [forceVisible, setForceVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setForceVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);
  return forceVisible;
}

const directions = {
  up: { y: 32, x: 0 },
  down: { y: -32, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
} as const;

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  direction?: keyof typeof directions;
  delay?: number;
  once?: boolean;
};

/** Fades content in (with an optional slide) when it scrolls into view. */
export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const forceVisible = useRevealFallback();
  const offset = reduceMotion ? directions.none : directions[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      animate={forceVisible ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.65, 0.35, 1] },
  },
};

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const forceVisible = useRevealFallback();
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      animate={forceVisible ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Springy pop-in for stat values and badges. */
export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const forceVisible = useRevealFallback();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={forceVisible ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 220, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChild} className={cn(className)}>
      {children}
    </motion.div>
  );
}
