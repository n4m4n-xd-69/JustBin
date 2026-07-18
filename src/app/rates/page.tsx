import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, IndianRupee, Info, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { getRates } from "@/lib/rates";

export const metadata: Metadata = {
  title: "Scrap Rates",
  description:
    "Live market rates for paper, plastic, metal, electronics and glass scrap. Transparent pricing — get the best value for your scrap with JustBin.",
};

export const revalidate = 3600;

const NOTES = [
  "Final rates depend on quality, quantity, and condition of materials.",
  "Prices are subject to change based on market conditions.",
  "Clean and sorted scrap fetches better prices.",
  "Minimum pickup quantity may apply for certain categories.",
  "Contact us for bulk quantities and commercial rates.",
];

export default async function RatesPage() {
  const categories = await getRates();

  return (
    <>
      <PageHeader
        eyebrow="Live Market Rates"
        title={
          <>
            Scrap Price List <span className="text-gradient">(Per Kg)</span>
          </>
        }
        description="Current market rates for recyclable materials, updated with market conditions. Transparent pricing — no haggling, no surprises."
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.slug}>
              <FadeIn>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-2xl">
                    {category.icon}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
              <Stagger className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {category.items.map((item) => (
                  <StaggerItem key={item.name}>
                    <Card className="group flex h-full items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                      <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-sm font-bold text-brand-green">
                          <TrendingUp className="size-3.5" />
                          {item.price}
                        </p>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>

        <FadeIn className="mt-14">
          <Card className="p-6 sm:p-8">
            <h3 className="flex items-center gap-2 font-semibold">
              <Info className="size-5 text-brand-green" /> Important Notes
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
              {NOTES.map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" />
                  {note}
                </li>
              ))}
            </ul>
          </Card>
        </FadeIn>

        <FadeIn className="mt-10 text-center">
          <Button size="lg" asChild>
            <Link href="/book">
              <IndianRupee className="size-4" /> Sell at These Rates{" "}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </>
  );
}
