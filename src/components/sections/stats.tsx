import { Card } from "@/components/ui/card";
import { ScaleIn, Stagger, StaggerItem } from "@/components/motion";

const STATS = [
  { value: "30 Sec", label: "Booking Time" },
  { value: "100%", label: "Digital Experience" },
  { value: "100+", label: "Cities by 2027" },
  { value: "₹500Cr", label: "Revenue Goal" },
];

export function StatsBand() {
  return (
    <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STATS.map((stat, i) => (
        <StaggerItem key={stat.label}>
          <Card className="p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-sm hover:shadow-brand-green/5">
            <ScaleIn delay={i * 0.08}>
              <p className="font-heading text-3xl font-bold text-gradient">
                {stat.value}
              </p>
            </ScaleIn>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
