import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Stagger, StaggerItem } from "@/components/motion";
import { SELL_CATEGORIES } from "@/lib/data";

export function Categories() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Accepted Materials"
          title="What can you sell?"
          description="From old newspapers to broken electronics — if it's recyclable, we'll pick it up."
        />

        <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {SELL_CATEGORIES.map((category) => (
            <StaggerItem key={category.name}>
              <Card className="group h-full p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110 inline-block">
                  {category.icon}
                </span>
                <p className="mt-3 text-sm font-semibold">{category.name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
