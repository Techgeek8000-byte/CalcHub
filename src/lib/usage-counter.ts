// ============================================================
// usage-counter.ts — localStorage-based tool usage tracker
// ============================================================

const STORAGE_KEY = "calchub_usage";

interface UsageData {
  [toolId: string]: number;
}

function getStorage(): UsageData {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStorage(data: UsageData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full or unavailable
  }
}

/**
 * Increment the usage count for a specific tool.
 */
export function incrementUsage(toolId: string): void {
  const data = getStorage();
  data[toolId] = (data[toolId] || 0) + 1;
  setStorage(data);
}

/**
 * Get usage counts for all tools, sorted by most used.
 */
export function getUsageCounts(): { toolId: string; count: number }[] {
  const data = getStorage();
  return Object.entries(data)
    .map(([toolId, count]) => ({ toolId, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get total number of calculations across all tools.
 */
export function getTotalUsage(): number {
  const data = getStorage();
  return Object.values(data).reduce((sum, c) => sum + c, 0);
}

/**
 * Get recently used tools, newest first (based on count being the last-used proxy).
 * Returns up to `limit` tool IDs.
 */
export function getRecentTools(limit: number = 4): { toolId: string; count: number }[] {
  return getUsageCounts().slice(0, limit);
}
