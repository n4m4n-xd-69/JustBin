import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand mark: JustBin character logo */
function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="JustBin logo"
      width={40}
      height={40}
      priority
      className={cn("size-9 object-contain rounded-full bg-white p-0.5 shadow-sm ring-1 ring-brand-green/30", className)}
    />
  );
}

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
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
      {showText && (
        <span>
          Just
          <span className="text-gradient">Bin</span>
        </span>
      )}
    </Link>
  );
}
