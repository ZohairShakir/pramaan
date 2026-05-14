import { HeroV2 as Hero } from "@/components/Landing/HeroV2";
import { BentoFeaturesV2 as BentoFeatures } from "@/components/Landing/BentoFeaturesV2";
import { TestimonialsV2 as Testimonials } from "@/components/Landing/TestimonialsV2";
import { PricingV2 as Pricing } from "@/components/Landing/PricingV2";
import { FooterV2 as Footer } from "@/components/Landing/FooterV2";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-lime selection:text-black relative">
      <div className="relative z-10">
        <Hero />
        <BentoFeatures />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    </main>
  );
}