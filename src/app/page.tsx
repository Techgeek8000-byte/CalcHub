"use client";

import { useState, useEffect } from "react";
import { useCalcStore } from "@/lib/store";
import { calcTools } from "@/lib/tool-definitions";
import { getRecentTools } from "@/lib/usage-counter";
import Header from "@/components/calc/Header";
import HeroSection from "@/components/calc/HeroSection";
import ToolGrid from "@/components/calc/ToolGrid";
import CalcWorkspace from "@/components/calc/CalcWorkspace";
import CrossPromo from "@/components/calc/CrossPromo";
import PricingSection from "@/components/calc/PricingSection";
import AdBanner from "@/components/calc/AdBanner";
import Footer from "@/components/calc/Footer";

export default function Home() {
  const { currentView, setActiveTool } = useCalcStore();
  const [recentTools, setRecentTools] = useState<{ toolId: string; count: number }[]>([]);

  useEffect(() => {
    const recent = getRecentTools(4);
    setRecentTools(recent);

    // Listen for storage changes (cross-tab)
    const handleStorage = () => setRecentTools(getRecentTools(4));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Refresh recent tools when returning to home
  useEffect(() => {
    if (currentView === "home") {
      setRecentTools(getRecentTools(4));
    }
  }, [currentView]);

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

            {/* Recently Used Section */}
            {recentTools.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <span className="text-lg">🕐</span>
                  Recently Used
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recentTools.map(({ toolId, count }) => {
                    const tool = calcTools.find((t) => t.id === toolId);
                    if (!tool) return null;
                    return (
                      <button
                        key={toolId}
                        onClick={() => setActiveTool(toolId)}
                        className="calc-card bg-white rounded-xl p-5 text-left group cursor-pointer border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm`}
                          >
                            {tool.icon}
                          </div>
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {count}× used
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {tool.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

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