import type { Metadata } from "next";
import { AtSign, Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/motion";
import { Contact as ContactFormSection } from "@/components/sections/contact";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, WHATSAPP_NUMBER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with JustBin — WhatsApp, phone, email or Instagram. We'd love to hear your questions and suggestions.",
};

const CHANNELS = [
  {
    icon: MessageCircle,
    color: "text-brand-green bg-brand-green/10",
    title: "WhatsApp",
    value: "Chat with us instantly",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
  },
  {
    icon: Phone,
    color: "text-brand-teal bg-brand-teal/10",
    title: "Phone",
    value: "+91 80815 94764",
    href: "tel:+918081594764",
    external: false,
  },
  {
    icon: Mail,
    color: "text-brand-emerald bg-brand-emerald/10",
    title: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: AtSign,
    color: "text-brand-emerald bg-brand-emerald/10",
    title: "Instagram",
    value: INSTAGRAM_HANDLE,
    href: "https://instagram.com/justbin.info",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            We&apos;d Love to <span className="text-gradient">Hear From You</span>
          </>
        }
        description="Questions, suggestions, bulk pickups or partnership ideas — reach us on any channel, or drop us a message below."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel) => (
            <StaggerItem key={channel.title}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="block h-full"
              >
                <Card className="h-full p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                  <span
                    className={`mx-auto flex size-12 items-center justify-center rounded-full ${channel.color}`}
                  >
                    <channel.icon className="size-6" />
                  </span>
                  <h2 className="mt-4 font-semibold">{channel.title}</h2>
                  <p className="mt-1 text-sm break-all text-muted-foreground">
                    {channel.value}
                  </p>
                </Card>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4 text-brand-green" />
          We typically respond within 30 minutes during working hours.
        </p>
      </div>

      <ContactFormSection />
    </>
  );
}
