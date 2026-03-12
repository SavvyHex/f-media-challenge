import type { DashboardStat, RecentEvent, Validator } from "./data/types";

const API_BASE = "/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  return get<DashboardStat[]>("/dashboard/stats");
}

export async function fetchRecentEvents(): Promise<RecentEvent[]> {
  return get<RecentEvent[]>("/dashboard/events");
}

export async function fetchValidators(): Promise<Validator[]> {
  return get<Validator[]>("/validators");
}

export async function fetchValidator(id: string): Promise<Validator | null> {
  try {
    return await get<Validator>(`/validators/${id}`);
  } catch {
    return null;
  }
}
