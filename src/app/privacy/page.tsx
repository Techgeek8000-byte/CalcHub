import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CalcHub',
  description: 'CalcHub privacy policy. Learn how we handle your data and protect your privacy when using our free online calculators.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-600 transition-colors mb-8"
        >
          &larr; Back to CalcHub
        </a>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: July 2025</p>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">1. Introduction</h2>
            <p>
              CalcHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard information when you
              visit our website (the &quot;Service&quot;). CalcHub provides free online calculators
              for finance, health, math, and everyday use. CalcHub is a project by Osama.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              <strong>All calculations happen entirely in your web browser.</strong> We do not
              collect, store, or have access to any numbers, dates, or personal data you enter
              into our calculators. Your calculation inputs and results never leave your device.
            </p>
            <p className="mb-3">We may collect the following non-personal information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
              <li>Anonymous usage analytics (page views, which calculators are used most)</li>
              <li>Device type, browser type, and screen resolution</li>
              <li>General geographic region (country/city level only)</li>
              <li>Cookies for session management, daily usage tracking, and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">3. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>To improve our calculators and user experience</li>
              <li>To understand which calculators are most popular</li>
              <li>To enforce free-tier daily calculation limits (15 per day for free users)</li>
              <li>To remember your premium status if you upgrade</li>
              <li>To serve relevant advertisements through Google AdSense</li>
              <li>To maintain and secure the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">4. Cookies</h2>
            <p>
              We use cookies for essential functionality such as remembering your premium status,
              tracking daily usage count (to enforce the 15 free calculations per day limit), and
              for analytics. We do not use cookies to track your calculation inputs or results.
              You can disable cookies in your browser settings, though the daily usage limit
              and premium status features may not work properly without them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">5. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>
                <strong>Google AdSense:</strong> May use cookies to serve personalized ads. See{' '}
                <a href="https://policies.google.com/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Google Analytics:</strong> Collects anonymous usage data to help us understand
                how visitors use CalcHub. See{' '}
                <a href="https://policies.google.com/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong>LemonSqueezy:</strong> Processes payments securely for Premium subscriptions.
                We never see your full payment card details. See{' '}
                <a href="https://www.lemonsqueezy.com/privacy" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  LemonSqueezy&apos;s Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">6. Data Security</h2>
            <p>
              All calculations happen client-side in your browser using JavaScript. Your input
              values and results never leave your device and are never transmitted to any server.
              We use HTTPS encryption for all connections to our website. Premium payment
              processing is handled securely by LemonSqueezy with industry-standard encryption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">7. Free vs. Premium</h2>
            <p>
              Free users can perform up to 15 calculations per day. Premium users get unlimited
              calculations, detailed breakdowns (such as monthly loan amortization schedules and
              year-by-year compound interest tables), and an ad-free experience. Your calculation
              data is never stored on our servers regardless of your plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">8. GDPR Rights</h2>
            <p>
              Under GDPR, you have the right to access, correct, or delete any personal data
              we hold. Since we do not collect personal calculation data and do not require
              account creation, there is minimal personal data to manage. To exercise these
              rights, contact us at the email below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-3">10. Contact</h2>
            <p>
              For any privacy-related questions, contact us at:{' '}
              <a href="mailto:support@calchub.com" className="text-emerald-600 hover:underline">
                support@calchub.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CalcHub. <span className="brand-osama">A Project by Osama</span>. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}