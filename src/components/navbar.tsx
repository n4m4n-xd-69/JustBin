"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogOut, Menu, Shield, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Scrap Rates", href: "/rates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  user?: { name?: string | null; email?: string | null; role?: string | null } | null;
  onSignOut?: () => Promise<void>;
};

export function Navbar({ user, onSignOut }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/85 backdrop-blur-lg">
      {/* Brand hairline along the bottom of the strip */}
      <div className="divider-gradient absolute inset-x-0 bottom-0" aria-hidden />
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active &&
                    "text-foreground underline decoration-brand-green decoration-2 underline-offset-8"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              {user.role === "ADMIN" && (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin">
                    <Shield className="size-4 text-brand-green" />
                    Admin
                  </Link>
                </Button>
              )}
              <form action={onSignOut}>
                <Button variant="ghost" size="sm" type="submit">
                  <User className="size-4 text-brand-green" />
                  {user.name?.split(" ")[0] ?? "Account"}
                  <LogOut className="size-3.5 text-muted-foreground" />
                </Button>
              </form>
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/book">
              Book Pickup <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-4">
                {user ? (
                  <>
                    {user.role === "ADMIN" && (
                      <Button variant="outline" asChild>
                        <Link href="/admin" onClick={() => setOpen(false)}>
                          <Shield className="size-4" /> Admin Panel
                        </Link>
                      </Button>
                    )}
                    <form action={onSignOut}>
                      <Button variant="outline" className="w-full" type="submit">
                        <LogOut className="size-4" /> Sign out (
                        {user.name?.split(" ")[0] ?? "Account"})
                      </Button>
                    </form>
                  </>
                ) : (
                  <Button variant="outline" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                )}
                <Button asChild>
                  <Link href="/book" onClick={() => setOpen(false)}>
                    Book Pickup <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
