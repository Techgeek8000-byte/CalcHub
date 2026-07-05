"use client";

import { calcTools, categoryLabels, categoryGradients } from "@/lib/tool-definitions";
import { useCalcStore } from "@/lib/store";
import { useRef, useEffect } from "react";

export default function ToolGrid() {
  const { searchQuery, setActiveTool, currentView, resetTool } = useCalcStore();
  const gridRef = useRef<HTMLDivElement>(null);

  const query = searchQuery.toLowerCase().trim();

  const filtered = query
    ? calcTools.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          categoryLabels[t.category]?.toLowerCase().includes(query)
      )
    : calcTools;

  const grouped = query
    ? { Results: filtered }
    : Object.groupBy(filtered, (t) => t.category);

  useEffect(() => {
    if (query && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [query]);

  const handleToolClick = (id: string) => {
    if (currentView === "tool") resetTool();
    setTimeout(() => setActiveTool(id), 10);
  };

  return (
    <div ref={gridRef} className="space-y-10">
      {query && (
        <div className="text-center">
          <p className="text-sm text-slate-500">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {Object.entries(grouped).map(([category, tools]) => {
        if (!tools || tools.length === 0) return null;
        const catKey = category.toLowerCase().replace(/[& ]/g, "");
        const gradientClass = categoryGradients[catKey] || "gradient-finance";

        return (
          <section key={category}>
            <h2 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
              {!query && <span className="text-lg">{category === "Finance" ? "💰" : category === "Health & Fitness" ? "🏋️" : category === "Math & Science" ? "📐" : "🔧"}</span>}
              {category}
              <span className="text-sm font-normal text-slate-400 ml-1">({tools.length})</span>
            </h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 rounded-2xl ${gradientClass}`}>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="calc-card bg-white rounded-xl p-5 text-left group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors text-sm">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {tool.description}
                  </p>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">🔍</p>
          <h3 className="text-lg font-semibold text-slate-700">No calculators found</h3>
          <p className="text-sm text-slate-400 mt-1">
            Try searching for &quot;loan&quot;, &quot;BMI&quot;, &quot;age&quot;, or &quot;percentage&quot;
          </p>
        </div>
      )}
    </div>
  );
}