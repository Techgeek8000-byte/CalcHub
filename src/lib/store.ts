import { create } from "zustand";

interface CalcState {
  activeTool: string | null;
  currentView: "home" | "tool";
  searchQuery: string;
  isPremium: boolean;
  dailyUsageCount: number;
  calculationHistory: Record<string, unknown[]>;
  setActiveTool: (toolId: string | null) => void;
  setView: (view: "home" | "tool") => void;
  setSearchQuery: (query: string) => void;
  incrementUsage: () => void;
  resetTool: () => void;
  addToHistory: (toolId: string, entry: unknown) => void;
}

export const useCalcStore = create<CalcState>((set) => ({
  activeTool: null,
  currentView: "home",
  searchQuery: "",
  isPremium: false,
  dailyUsageCount: 0,
  calculationHistory: {},
  setActiveTool: (toolId) => set({ activeTool: toolId, currentView: toolId ? "tool" : "home" }),
  setView: (view) => set({ currentView: view, activeTool: view === "home" ? null : undefined }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  incrementUsage: () => set((s) => ({ dailyUsageCount: s.dailyUsageCount + 1 })),
  resetTool: () => set({ activeTool: null, currentView: "home" }),
  addToHistory: (toolId, entry) =>
    set((s) => ({
      calculationHistory: {
        ...s.calculationHistory,
        [toolId]: [entry, ...(s.calculationHistory[toolId] || [])].slice(0, 10),
      },
    })),
}));