"use client";

import { useState } from "react";

interface SocialShareProps {
  url: string;
  title: string;
}

const shares = [
  {
    name: "Twitter / X",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    color: "hover:bg-black hover:text-white",
  },
  {
    name: "Reddit",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.338 12.284a1.794 1.794 0 0 1 .043 3.588c-.648 0-1.213-.345-1.525-.86-1.52.994-3.572 1.2-5.27 1.274l.942-4.186 2.989.678a1.35 1.35 0 0 1 1.15-.706c.812 0 1.472.66 1.472 1.472a1.472 1.472 0 0 1-1.472 1.472 1.28 1.28 0 0 1-.667-.183c-1.22.666-2.69.82-3.948.715l-.722 3.211c1.418.034 2.96-.106 4.1-.819.29.498.836.836 1.46.836a1.794 1.794 0 1 1 .7-3.45zm2.69.808a.99.99 0 0 0-.99-.99.99.99 0 0 0-.99.99.99.99 0 0 0 .99.99.99.99 0 0 0 .99-.99zm-8.906.99a.99.99 0 0 0 .99-.99.99.99 0 0 0-.99-.99.99.99 0 0 0-.99.99.99.99 0 0 0 .99.99z"/>
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: "hover:bg-orange-500 hover:text-white",
  },
  {
    name: "Facebook",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    href: (url: string, title: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: "hover:bg-blue-700 hover:text-white",
  },
];

export default function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-500">Share this calculator</p>
      <div className="flex flex-wrap items-center gap-2">
        {shares.map((s) => (
          <a
            key={s.name}
            href={s.href(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${s.name}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-medium transition-all ${s.color} hover:shadow-sm`}
          >
            {s.icon}
            <span className="hidden sm:inline">{s.name}</span>
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          title="Copy Link"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all text-xs font-medium ${
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 hover:shadow-sm"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {copied ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </>
            )}
          </svg>
          <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}
