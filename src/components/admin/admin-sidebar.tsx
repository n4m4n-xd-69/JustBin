"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/users", label: "Users", icon: Users },
];

type AdminSidebarProps = {
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
};

export function AdminSidebar({ userEmail, onSignOut }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-18 items-center border-b border-border px-6">
          <Logo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand-green/15 text-brand-green shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className="size-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + actions */}
        <div className="border-t border-border p-4">
          <div className="mb-3 rounded-lg bg-brand-green/10 px-3 py-2">
            <p className="text-xs font-semibold text-brand-green">
              ADMIN PANEL
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">
              {userEmail}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href="/">
                <Home className="size-4" /> Site
              </Link>
            </Button>
            <form action={onSignOut} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                type="submit"
                className="w-full"
              >
                <LogOut className="size-4" /> Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
