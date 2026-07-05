export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                C
              </div>
              <span className="font-bold text-slate-800">CalcHub</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Free online calculators for finance, health, math, and everyday use.
              Built with ❤️ by Osama.
            </p>
            <p className="brand-osama text-xs font-bold mt-2">A Project by Osama</p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>💰 Finance Calculators</li>
              <li>🏋️ Health & Fitness</li>
              <li>📐 Math & Science</li>
              <li>🔧 Everyday Tools</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="/privacy" className="hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-emerald-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Other Projects */}
          <div>
            <h4 className="font-semibold text-slate-700 text-sm mb-3">More Tools</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a
                  href="https://tool-pdf-six.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 transition-colors"
                >
                  📄 ToolPDF — PDF Tools
                </a>
              </li>
              <li>
                <a href="mailto:contact@calchub.com" className="hover:text-emerald-600 transition-colors">
                  ✉️ Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CalcHub. All rights reserved.
          </p>
          <p className="brand-osama text-xs font-semibold">
            A Project by Osama
          </p>
        </div>
      </div>
    </footer>
  );
}