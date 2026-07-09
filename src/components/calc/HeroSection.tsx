"use client";

import { useState, useEffect } from "react";
import { getTotalUsage } from "@/lib/usage-counter";

export default function HeroSection() {
  const [totalCalcs, setTotalCalcs] = useState(0);

  useEffect(() => {
    setTotalCalcs(getTotalUsage());
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center py-16 sm:py-24 px-4">
        <div className="brand-badge mx-auto mb-6 w-fit">
          <span className="relative z-10">A PROJECT BY OSAMA</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Every Calculator
          <br />
          <span className="brand-osama-large">You&apos;ll Ever Need</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
          20+ calculators for finance, health, math, and everyday use.
          Instant results, no sign-up required, completely private.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            15 Free/Day
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Instant Results
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            No Sign-up
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            100% Private
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-12">
          <div>
            <p className="text-3xl font-extrabold text-emerald-600">22+</p>
            <p className="text-xs text-slate-400 mt-1">Calculators</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-teal-600">4</p>
            <p className="text-xs text-slate-400 mt-1">Categories</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-orange-500">
              {totalCalcs > 0 ? totalCalcs.toLocaleString() : "0s"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {totalCalcs > 0 ? "Total Calculations" : "Load Time"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}