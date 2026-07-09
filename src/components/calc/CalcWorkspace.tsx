"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useCalcStore } from "@/lib/store";
import { calcTools } from "@/lib/tool-definitions";
import { incrementUsage as incrementGlobalUsage } from "@/lib/usage-counter";
import { calculate, getCalcFields, UNIT_OPTIONS } from "@/lib/calculators";
import SocialShare from "@/components/calc/SocialShare";
import type { CalcField } from "@/lib/calculators";

export default function CalcWorkspace() {
  const { activeTool, resetTool, addToHistory, incrementUsage, dailyUsageCount, isPremium } = useCalcStore();
  const [values, setValues] = useState<Record<string, string | number>>({});
  const [results, setResults] = useState<Record<string, unknown> | string | null>(null);
  const [computed, setComputed] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const tool = calcTools.find((t) => t.id === activeTool);

  // Dynamic fields for unit-converter
  const resolvedFields: CalcField[] = useMemo(() => {
    if (!activeTool) return [];
    const baseFields = getCalcFields(activeTool);

    if (activeTool === "unit-converter") {
      const category = String(values.category ?? "length");
      const unitOpts = UNIT_OPTIONS[category] || UNIT_OPTIONS.length;
      return baseFields.map((f) => {
        if (f.id === "fromUnit" || f.id === "toUnit") {
          return { ...f, options: unitOpts };
        }
        return f;
      });
    }

    if (activeTool === "timezone") {
      // Generate time options (every 30 min)
      const timeOptions: { label: string; value: string }[] = [];
      for (let h = 0; h < 24; h++) {
        timeOptions.push({ label: `${String(h).padStart(2, "0")}:00`, value: `${String(h).padStart(2, "0")}:00` });
        timeOptions.push({ label: `${String(h).padStart(2, "0")}:30`, value: `${String(h).padStart(2, "0")}:30` });
      }
      return baseFields.map((f) => {
        if (f.id === "time") {
          return { ...f, type: "select" as const, options: timeOptions };
        }
        return f;
      });
    }

    return baseFields;
  }, [activeTool, values.category]);

  const handleCalc = () => {
    if (!activeTool) return;

    // Free limit: 15 calculations per day
    if (!isPremium && dailyUsageCount >= 15) {
      setShowLimitModal(true);
      return;
    }

    setIsProcessing(true);
    const res = calculate(activeTool, values);

    // Simulate brief processing for skeleton visibility
    setTimeout(() => {
      setIsProcessing(false);
      setResults(res);
      setComputed(true);
      incrementUsage();
      addToHistory(activeTool, { inputs: values, result: res });
      incrementGlobalUsage(activeTool);

      if (typeof res === "string") {
        toast.error(res, { duration: 4000 });
      } else {
        toast.success("Calculation complete!", {
          description: `Results for ${tool?.name || activeTool}`,
          duration: 3000,
          action: {
            label: "Copy",
            onClick: () => {
              const text = Object.entries(res)
                .filter(([, v]) => typeof v === "string" || typeof v === "number")
                .map(([k, v]) => `${formatLabel(k)}: ${formatValue(v)}`)
                .join("\n");
              navigator.clipboard.writeText(text).then(() => {
                toast.success("Copied to clipboard!", { duration: 2000 });
              }).catch(() => {});
            },
          },
        });
      }
    }, 300);
  };

  const handleChange = (id: string, val: string) => {
    setValues((prev) => {
      const next = { ...prev, [id]: val };
      // When unit-converter category changes, reset units
      if (id === "category") {
        const opts = UNIT_OPTIONS[val] || UNIT_OPTIONS.length;
        if (opts.length >= 2) {
          next.fromUnit = opts[0].value;
          next.toUnit = opts[1].value;
        }
      }
      return next;
    });
    setComputed(false);
  };

  if (!tool) return null;

  const isResultError = typeof results === "string";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button + Title */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={resetTool}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-xl shadow-sm`}
          >
            {tool.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{tool.name}</h2>
            <p className="text-xs text-slate-400">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Free usage counter */}
      {!isPremium && (
        <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>{dailyUsageCount}/15 free calculations today</span>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden max-w-[120px]">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (dailyUsageCount / 15) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-6">
        {/* Input Form */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          {resolvedFields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  value={(values[field.id] as string) || (field.options?.[0]?.value ?? "")}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "date" ? (
                <input
                  type="date"
                  value={(values[field.id] as string) || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              ) : (
                <input
                  type="number"
                  value={values[field.id] !== undefined ? String(values[field.id]) : ""}
                  onChange={(e) => handleChange(field.id, e.target.value === "" ? "" : e.target.value)}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              )}
            </div>
          ))}

          <button
            onClick={handleCalc}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-r ${tool.gradient} hover:shadow-emerald-200`}
          >
            Calculate
          </button>
        </div>

        {/* Results Panel */}
        <div className="md:col-span-2 space-y-4">
          {isProcessing ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 animate-pulse">
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-8 w-36 bg-slate-200 rounded" />
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-slate-100 rounded" />
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-14 bg-slate-100 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="pt-3">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>
          ) : computed && results ? (
            isResultError ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <p className="text-red-600 text-sm font-medium">⚠️ {results}</p>
              </div>
            ) : (
              <div className="result-display">
                <h3 className="text-sm font-medium text-emerald-100 mb-3">Result</h3>
                <ResultDisplay data={results as Record<string, unknown>} toolId={activeTool || ""} />
              </div>
            )
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-4xl mb-3">🧮</p>
              <p className="text-sm text-slate-400">
                Enter values and click <strong>Calculate</strong> to see results
              </p>
            </div>
          )}

          {/* Related Calculators */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Related Tools</h3>
            <div className="space-y-2">
              {calcTools
                .filter((t) => t.category === tool.category && t.id !== tool.id)
                .slice(0, 3)
                .map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setValues({});
                      setResults(null);
                      setComputed(false);
                      setIsProcessing(false);
                      useCalcStore.getState().setActiveTool(t.id);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="text-sm text-slate-600">{t.name}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Social Share */}
          {computed && results && !isResultError && (
            <SocialShare
              url={typeof window !== "undefined" ? window.location.href : ""}
              title={`${tool.name} — CalcHub`}
            />
          )}
        </div>
      </div>

      {/* Daily Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <p className="text-4xl mb-3">⚡</p>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Daily Limit Reached</h3>
              <p className="text-sm text-slate-500 mb-6">
                You&apos;ve used all 15 free calculations for today. Upgrade to Premium for unlimited calculations, detailed breakdowns, and an ad-free experience.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowLimitModal(false);
                    const pricingSection = document.getElementById("pricing-section");
                    pricingSection?.scrollIntoView({ behavior: "smooth" });
                    resetTool();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  ⭐ Go Premium — Unlimited Access
                </button>
                <button
                  onClick={() => setShowLimitModal(false)}
                  className="w-full py-3 text-slate-500 text-sm hover:text-slate-700 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResultDisplay({ data, toolId }: { data: Record<string, unknown>; toolId: string }) {
  if (!data) return null;

  const isPremium = useCalcStore((s) => s.isPremium);

  const skipKeys = new Set(["monthlyBreakdown", "yearByYear"]);
  const premiumKeys = new Set(["monthlyBreakdown", "yearByYear"]);

  // For free users, hide detailed breakdowns
  const filteredEntries = Object.entries(data).filter(([key]) => {
    if (premiumKeys.has(key) && !isPremium) return false;
    if (skipKeys.has(key)) return false;
    return true;
  });

  const breakdown = isPremium ? (data.monthlyBreakdown || data.yearByYear) : null;

  return (
    <div className="space-y-3">
      {filteredEntries.map(([key, value]) => {
        const label = formatLabel(key);
        const displayVal = formatValue(value);
        const isMain = ["emi", "totalAmount", "totalTax", "tipAmount", "savings", "bmi", "tdee", "bodyFat", "dueDate", "result", "password", "convertedAmount", "gpa", "weightedAverage", "perPerson", "totalCost", "monthlyPayment"].includes(key);

        return (
          <div key={key} className={isMain ? "mb-2" : ""}>
            <p className="text-emerald-100 text-xs font-medium">{label}</p>
            <p
              className={`font-bold ${isMain ? "text-3xl" : "text-lg"} text-white`}
            >
              {displayVal}
            </p>
          </div>
        );
      })}

      {/* Premium upsell for breakdowns */}
      {!isPremium && (data.monthlyBreakdown || data.yearByYear) && (
        <div className="mt-4 pt-4 border-t border-white/20 text-center">
          <p className="text-xs text-emerald-100 mb-2">📋 Full breakdown available</p>
          <p className="text-[11px] text-emerald-200">
            Upgrade to Premium to see the detailed {data.monthlyBreakdown ? "monthly" : "year-by-year"} breakdown
          </p>
        </div>
      )}

      {Array.isArray(breakdown) && breakdown.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs font-medium text-emerald-100 mb-2">
            {data.monthlyBreakdown ? "Monthly Breakdown" : "Year-by-Year"}
          </p>
          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
            {breakdown.slice(0, 12).map((entry, i) => (
              <div key={i} className="flex justify-between text-xs bg-white/10 rounded-lg px-3 py-2">
                {Object.entries(entry as Record<string, unknown>).map(([k, v]) => (
                  <span key={k}>
                    <span className="text-emerald-200">{formatLabel(k)}:</span>{" "}
                    <span className="font-medium">{formatValue(v)}</span>
                  </span>
                ))}
              </div>
            ))}
            {breakdown.length > 12 && (
              <p className="text-xs text-emerald-200 text-center pt-1">
                +{breakdown.length - 12} more entries...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/_/g, " ")
    .trim();
}

function formatValue(val: unknown): string {
  if (typeof val === "number") {
    if (Math.abs(val) >= 1000000) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (Number.isInteger(val)) return val.toLocaleString("en-US");
    return val.toFixed(2);
  }
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map((v) => formatValue(v)).join(", ");
  if (typeof val === "object" && val !== null) return JSON.stringify(val);
  return String(val);
}