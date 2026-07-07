'use client';

import { useEffect } from 'react';
import { useCalcStore } from '@/lib/store';
import Header from '@/components/calc/Header';
import HeroSection from '@/components/calc/HeroSection';
import ToolGrid from '@/components/calc/ToolGrid';
import CalcWorkspace from '@/components/calc/CalcWorkspace';
import CrossPromo from '@/components/calc/CrossPromo';
import PricingSection from '@/components/calc/PricingSection';
import AdBanner from '@/components/calc/AdBanner';
import Footer from '@/components/calc/Footer';

interface CalcMeta {
  title: string;
  description: string;
  keywords: string[];
}

export default function CalcPageClient({ calcSlug, calcMeta }: { calcSlug: string; calcMeta?: CalcMeta }) {
  const { currentView, setActiveTool, resetTool, activeTool } = useCalcStore();

  useEffect(() => {
    if (calcMeta) {
      setActiveTool(calcSlug);
    }
  }, [calcSlug, calcMeta, setActiveTool]);

  if (!calcMeta) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-700">Calculator not found</h1>
            <p className="text-slate-500 mt-2">This calculator does not exist or may have moved.</p>
            <button
              onClick={() => { resetTool(); }}
              className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
            >
              Browse All Calculators
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <CrossPromo exclude="CalcHub" />
            <AdBanner slot="pre-footer" />
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CalcWorkspace />
          </div>
        )}
      </main>
      <CrossPromo exclude="CalcHub" />
      <Footer />
    </div>
  );
}
