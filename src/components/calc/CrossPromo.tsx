"use client";

export default function CrossPromo() {
  return (
    <section className="cross-promo py-16 px-4">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">
            Also by Osama
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            More Free Tools You&apos;ll Love
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Explore our other project — a complete PDF toolkit that runs entirely in your browser.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {/* ToolPDF Card */}
          <a
            href="https://tool-pdf-six.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:col-span-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg shrink-0">
                📄
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  ToolPDF
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Merge, split, compress, convert, rotate, watermark, and protect PDFs —
                  all processed privately in your browser. No uploads, no servers.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Merge", "Split", "Compress", "Convert", "Watermark"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 hidden sm:flex items-center gap-1 text-sm text-emerald-400 font-medium group-hover:gap-2 transition-all">
                Visit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          More tools coming soon — AI Image Tools, File Converters, and SEO/Creator Tools
        </p>
      </div>
    </section>
  );
}