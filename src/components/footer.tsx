import Link from "next/link";
import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  CONTACT_EMAIL,
  INSTAGRAM_HANDLE,
  WHATSAPP_NUMBER,
} from "@/lib/data";

const QUICK_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Scrap Rates", href: "/rates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Book Pickup", href: "/book" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-card/50">
      <div className="divider-gradient absolute inset-x-0 top-0" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A new-age recycling startup building the future of smart waste
            management in India. Turn your scrap into value and help build a
            cleaner India.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand-green"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Get in Touch
          </h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-green"
              >
                <MessageCircle className="size-4 text-brand-green" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href="tel:+918081594764"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-green"
              >
                <Phone className="size-4 text-brand-green" />
                +91 80815 94764
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-green"
              >
                <Mail className="size-4 text-brand-green" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/justbin.info"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-emerald"
              >
                <AtSign className="size-4 text-brand-emerald" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 JustBin. All rights reserved.
      </div>
    </footer>
  );
}
