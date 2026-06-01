import { HeroSection } from "@/components/home/HeroSection"
import { MarqueeStrip } from "@/components/ui/MarqueeStrip"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"
import { StatsSection } from "@/components/home/StatsSection"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { ProcessSection } from "@/components/home/ProcessSection"
import { NewsletterSection } from "@/components/home/NewsletterSection"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MarqueeStrip text="SOFAS · BEDS · OFFICE CHAIRS · WARDROBES · DINING SETS · PREMIUM QUALITY · DURGAPUR · WEST BENGAL · " />
      <FeaturedCategories />
      <StatsSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <ProcessSection />
      <NewsletterSection />
    </div>
  )
}
