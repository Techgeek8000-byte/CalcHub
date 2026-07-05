import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CalcHub - Every Calculator You'll Ever Need",
  description:
    "Free online calculators for finance, health, math, and everyday use. Loan EMI, BMI, age, percentage, GPA, and 20+ more tools. Fast, accurate, and private.",
  keywords: [
    "calculator",
    "loan calculator",
    "BMI calculator",
    "age calculator",
    "percentage calculator",
    "GPA calculator",
    "EMI calculator",
    "calorie calculator",
    "online calculator",
    "free calculator",
  ],
  authors: [{ name: "CalcHub" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧮</text></svg>",
  },
  openGraph: {
    title: "CalcHub - Every Calculator You'll Ever Need",
    description:
      "Free online calculators for finance, health, math, and everyday use. 20+ tools, instant results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7878398091851771"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CMV34ZVLE7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CMV34ZVLE7');
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}