import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { getRatePreview } from "@/lib/rates";

export async function RatesPreview() {
  const preview = await getRatePreview();

  return (
    <section id="rates" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card/60 px-6 py-12 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Live Market Rates"
              title="Scrap Rates (Per Kg)"
              description="Transparent, market-linked pricing across every category."
            />
            <FadeIn>
              <Button variant="outline" asChild>
                <Link href="/rates">
                  View Full Rate List <ArrowRight className="size-4" />
                </Link>
              </Button>
            </FadeIn>
          </div>

          <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {preview.map((item) => (
              <StaggerItem key={item.name}>
                <Card className="group h-full bg-background p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                  <span className="inline-block text-3xl transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  <p className="mt-2 text-sm font-medium">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-brand-green">
                    {item.price}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
