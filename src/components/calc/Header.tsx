"use client";

import { useState } from "react";
import { useCalcStore } from "@/lib/store";

const promoSites = [
  { name: 'ToolPDF', emoji: '📄', href: 'https://tool-pdf-six.vercel.app' },
  { name: 'ConvertFlow', emoji: '🔄', href: 'https://convert-flow-beta.vercel.app' },
  { name: 'SEOKit', emoji: '🔍', href: 'https://seo-kit-tau.vercel.app' },
  { name: 'PixelForge AI', emoji: '🎨', href: 'https://pixelforge-ai-chi.vercel.app' },
];

export default function Header() {
  const { searchQuery, setSearchQuery, currentView, resetTool } = useCalcStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView === "tool") {
      resetTool();
    }
  };

  const goToPricing = () => {
    resetTool();
    setTimeout(() => {
      document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <button
            onClick={resetTool}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-emerald-200">
              C
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-800">CalcHub</h1>
              <p className="text-[10px] font-semibold tracking-wider text-emerald-600 uppercase">
                A Project by Osama
              </p>
            </div>
          </button>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
              />
            </div>
          </form>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {promoSites.map(site => (
              <a
                key={site.name}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
              >
                <span>{site.emoji}</span> {site.name}
              </a>
            ))}
            <button
              onClick={goToPricing}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-200 transition-all hover:-translate-y-0.5"
            >
              ⭐ Go Premium
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators..."
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-400 transition-all"
              />
            </form>
            {promoSites.map(site => (
              <a
                key={site.name}
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl"
              >
                {site.emoji} {site.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                goToPricing();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-xl"
            >
              ⭐ Go Premium
            </button>
          </div>
        )}
      </div>
    </header>
  );
}