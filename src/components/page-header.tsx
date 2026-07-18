import { FadeIn } from "@/components/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
};

/** Hero header for interior pages — glows, eyebrow, gradient-accented title. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-16">
      <div className="glow-green pointer-events-none absolute -top-40 right-0 size-150 opacity-50" />
      <div className="glow-emerald pointer-events-none absolute -top-20 -left-40 size-125 opacity-40" />
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="accent-bar mx-auto mt-5" aria-hidden />
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
