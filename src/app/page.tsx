"use client";

import { useCalcStore } from "@/lib/store";
import Header from "@/components/calc/Header";
import HeroSection from "@/components/calc/HeroSection";
import ToolGrid from "@/components/calc/ToolGrid";
import CalcWorkspace from "@/components/calc/CalcWorkspace";
import CrossPromo from "@/components/calc/CrossPromo";
import PricingSection from "@/components/calc/PricingSection";
import AdBanner from "@/components/calc/AdBanner";
import Footer from "@/components/calc/Footer";

export default function Home() {
  const { currentView } = useCalcStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {currentView === "home" ? (
          <>
            <HeroSection />
            <AdBanner slot="hero-bottom" />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <ToolGrid />
            </section>
            <AdBanner slot="mid-content" />
            <PricingSection />
            <CrossPromo />
            <AdBanner slot="pre-footer" />
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CalcWorkspace />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}