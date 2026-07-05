"use client";

export default function PricingSection() {
  return (
    <section id="pricing-section" className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Free vs. Premium
        </h2>
        <p className="text-slate-500 mb-10 max-w-lg mx-auto">
          Start free with 15 calculations per day. Upgrade for unlimited access, detailed breakdowns, and no ads.
        </p>

        {/* Free tier */}
        <div className="mb-8 bg-white border-2 border-slate-200 rounded-2xl p-6 text-left max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-bold text-slate-800">Free</p>
            <span className="text-2xl font-extrabold text-slate-900">$0</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> All 20+ calculators
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> 15 calculations per day
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span> Basic summary results
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-300">✗</span> <span className="text-slate-400">Detailed breakdowns</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-300">✗</span> <span className="text-slate-400">Ad-free experience</span>
            </li>
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Monthly */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-left hover:border-emerald-300 transition-colors">
            <p className="text-sm font-semibold text-slate-500">Monthly</p>
            <div className="mt-3">
              <span className="text-4xl font-extrabold text-slate-900">$3</span>
              <span className="text-slate-400 text-sm">/month</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Unlimited calculations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Detailed breakdowns
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> No advertisements
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span> Cancel anytime
              </li>
            </ul>
            <button
              onClick={() => alert("Premium checkout will be available soon via LemonSqueezy once your store is approved!")}
              className="mt-6 w-full py-3 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Choose Monthly
            </button>
          </div>

          {/* Lifetime */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-left text-white relative overflow-hidden shadow-xl shadow-emerald-200">
            <div className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              BEST VALUE
            </div>
            <p className="text-sm font-semibold text-emerald-100">Lifetime</p>
            <div className="mt-3">
              <span className="text-4xl font-extrabold">$49</span>
              <span className="text-emerald-100 text-sm"> one-time</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-emerald-50">
              <li className="flex items-center gap-2">
                <span>✓</span> Everything in Monthly
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Pay once, use forever
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> All future calculators
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Saves $36+ vs monthly
              </li>
            </ul>
            <button
              onClick={() => alert("Premium checkout will be available soon via LemonSqueezy once your store is approved!")}
              className="mt-6 w-full py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Choose Lifetime
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-6">
          💳 Payments handled securely by LemonSqueezy
        </p>
      </div>
    </section>
  );
}