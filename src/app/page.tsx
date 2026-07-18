import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { HowItWorks } from "@/components/sections/how-it-works";
import { RatesPreview } from "@/components/sections/rates-preview";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { SectionDivider } from "@/components/section-divider";

// Rate previews come from the database; refresh at most once an hour.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Categories />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <RatesPreview />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Faq />
      <SectionDivider />
      <Cta />
    </>
  );
}
