import { Toaster } from "sonner";
import { AdditionalFeatures } from "@/components/AdditionalFeatures";
import { CompaniesSection } from "@/components/CompaniesSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FAQSection } from "@/components/FAQSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ManagmentSection } from "@/components/ManagmentSection";
import { PricingSection } from "@/components/PricingSection";
import { StatsSection } from "@/components/StatsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TimeWasteSection } from "@/components/TimeWasteSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <AdditionalFeatures />
        <TestimonialsSection />
        <CompaniesSection />
        <StatsSection />
        <ManagmentSection />
        <TimeWasteSection />
        <ComparisonSection />
        <PricingSection />
        <FAQSection />
      </main>

      <Footer />
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
