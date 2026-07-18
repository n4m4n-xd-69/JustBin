import Link from "next/link";
import { cn } from "@/lib/utils";

/** Brand mark: gradient recycling-bin icon (matches /icon.svg). */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-9", className)}
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="var(--brand-lime)" />
          <stop offset="1" stopColor="var(--brand-teal)" />
        </linearGradient>
      </defs>
      <rect
        width="64"
        height="64"
        rx="16"
        className="fill-brand-green/10"
      />
      <path
        d="M20 24h24l-2.6 26a4 4 0 0 1-4 3.6H26.6a4 4 0 0 1-4-3.6L20 24z"
        fill="none"
        stroke="url(#logo-g)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16 24h32M26 24v-4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4"
        fill="none"
        stroke="url(#logo-g)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M28 33v12M36 33v12"
        stroke="var(--brand-green)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 font-heading text-2xl font-bold tracking-tight text-foreground",
        className
      )}
      aria-label="JustBin — home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
      <span>
        Just
        <span className="text-gradient">Bin</span>
      </span>
    </Link>
  );
}
