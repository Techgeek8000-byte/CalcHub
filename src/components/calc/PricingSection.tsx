"use client";

import { LEMON_SQUEEZY } from '@/lib/lemonsqueezy';

const StarIcon = () => <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>;
const ClockIcon = () => <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg>;
const ZapIcon = () => <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const InfinityIcon = () => <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 12.636A5 5 0 0021.95 6.95a5 5 0 00-5.686-5.686 5 5 0 00-1.588 1.042L12 5l-2.676-2.694a5 5 0 00-1.588-1.042A5 5 0 002.05 6.95a5 5 0 005.686 5.686 5 5 0 001.588-1.042L12 9l2.676 2.694a5 5 0 001.588 1.042" /></svg>;
const CrownIcon = () => <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l2.5-5L12 8l6.5-3L21 10M3 10v8a1 1 0 001 1h16a1 1 0 001-1v-8M3 10l4 7h10l4-7" /></svg>;
const CheckIcon = () => <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

const plans = [
  { name: 'Free', price: '$0', period: '', description: 'Get started with calculators', badge: null, features: ['15 calculations/day', 'All 20+ calculators', 'Basic results', 'Community support'], cta: 'Current Plan', highlighted: false, icon: <StarIcon /> },
  { name: 'Weekly', price: '$1', period: '/week', description: 'Try Pro for a week', badge: null, features: ['Unlimited calculations', 'Detailed breakdowns', 'No ads', 'Cancel anytime'], cta: 'Get Weekly', highlighted: false, icon: <ClockIcon /> },
  { name: 'Monthly', price: '$2', period: '/mo', originalPrice: '$4', description: 'Most popular for regular users', badge: 'SAVE 50%', features: ['Unlimited calculations', 'Detailed breakdowns', 'No ads', 'Priority support', 'Early access to new tools'], cta: 'Get Monthly', highlighted: true, icon: <ZapIcon /> },
  { name: 'Yearly', price: '$12', period: '/year', originalPrice: '$24', description: 'Best value for regular users', badge: 'SAVE 50%', features: ['Unlimited calculations', 'Detailed breakdowns', 'No ads', 'Priority support', 'Early access to new tools', 'All future calculators'], cta: 'Get Yearly', highlighted: false, icon: <InfinityIcon /> },
  { name: 'Lifetime', price: '$25', period: 'one-time', originalPrice: '$48', description: 'Pay once, calculate forever', badge: 'BEST VALUE', features: ['Everything in Yearly', 'Lifetime access', 'No recurring payments', 'All future calculators', 'Priority support forever'], cta: 'Get Lifetime', highlighted: false, icon: <CrownIcon /> },
];

export default function PricingSection() {
  return (
    <section id="pricing-section" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Simple, <span className="text-emerald-600">Transparent</span> Pricing</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white rounded-2xl p-5 flex flex-col border-2 ${plan.highlighted ? 'border-emerald-300 shadow-lg shadow-emerald-100' : 'border-slate-200'} ${plan.name === 'Lifetime' ? 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-lg shadow-amber-100' : ''}`}>
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white rounded-full shadow-lg ${plan.badge === 'BEST VALUE' ? 'bg-amber-500 shadow-amber-500/25' : 'bg-emerald-500 shadow-emerald-500/25'}`}>{plan.badge}</div>
              )}
              <div className="flex items-center gap-2 mb-3">{plan.icon}<h3 className="text-sm font-semibold text-slate-700">{plan.name}</h3></div>
              <div className="mb-1">{plan.originalPrice && <span className="text-xs text-slate-400 line-through mr-1">{plan.originalPrice}</span>}<span className="text-2xl font-extrabold text-slate-900">{plan.price}</span>{plan.period && <span className="text-xs text-slate-500 ml-1">{plan.period}</span>}</div>
              <p className="text-[11px] text-slate-500 mb-4">{plan.description}</p>
              <ul className="space-y-2 mb-6 flex-1">{plan.features.map((f) => (<li key={f} className="flex items-start gap-2 text-xs text-slate-600"><CheckIcon />{f}</li>))}</ul>
              {plan.name === 'Free' ? (
                <div className="w-full py-2 text-xs text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200">Current Plan</div>
              ) : (
                <button onClick={() => { const k = plan.name.includes('Weekly') ? 'weekly' : plan.name.includes('Yearly') ? 'yearly' : plan.name.includes('Lifetime') ? 'lifetime' : 'monthly'; window.open(LEMON_SQUEEZY[k], '_blank'); }} className={`w-full py-2 text-xs font-semibold text-white rounded-xl transition-opacity hover:opacity-90 ${plan.highlighted ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : plan.name === 'Lifetime' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-700 hover:bg-slate-800'}`}>{plan.cta}</button>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">Secure checkout via LemonSqueezy</p>
      </div>
    </section>
  );
}
