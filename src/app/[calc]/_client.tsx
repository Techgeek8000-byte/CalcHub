'use client';

import { useEffect } from 'react';
import { useCalcStore } from '@/lib/store';
import Header from '@/components/calc/Header';
import CalcWorkspace from '@/components/calc/CalcWorkspace';
import CrossPromo from '@/components/calc/CrossPromo';
import Footer from '@/components/calc/Footer';

interface CalcMeta { title: string; description: string; keywords: string[]; intro?: string; faqs?: { question: string; answer: string }[]; }

export default function CalcPageClient({ calcSlug, calcMeta }: { calcSlug: string; calcMeta?: CalcMeta }) {
  const { setActiveTool, resetTool } = useCalcStore();

  useEffect(() => { if (calcMeta) { setActiveTool(calcSlug); } }, [calcSlug, calcMeta, setActiveTool]);

  if (!calcMeta) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center"><h1 className="text-2xl font-bold text-slate-700">Calculator not found</h1><p className="text-slate-500 mt-2">This calculator does not exist or may have moved.</p><button onClick={() => { resetTool(); }} className="mt-4 px-6 py-2 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors">Browse All Calculators</button></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {calcMeta.intro && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-2">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h1 className="text-xl font-bold text-slate-800 mb-2">{calcMeta.title ? (calcMeta.title.split(' — ')[0] || calcMeta.title) : ''}</h1>
              <p className="text-sm text-slate-600 leading-relaxed">{calcMeta.intro}</p>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><CalcWorkspace /></div>
        {calcMeta.faqs && calcMeta.faqs.length > 0 && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity: calcMeta.faqs.map(f => ({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))})}} />
            <section className="mt-8 mb-4 max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {calcMeta.faqs.map((faq, i) => (
                  <details key={i} className="bg-white p-4 rounded-xl border border-slate-200 group">
                    <summary className="text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 transition-colors list-none [&::-webkit-details-marker]:hidden">{faq.question}</summary>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <CrossPromo exclude="CalcHub" />
      <Footer />
    </div>
  );
}
