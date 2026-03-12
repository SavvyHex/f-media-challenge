import { useEffect, useState } from "react";
import { fetchDashboardStats, fetchRecentEvents } from "../../api";
import type { DashboardStat, RecentEvent } from "../../data/types";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [events, setEvents] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([fetchDashboardStats(), fetchRecentEvents()])
      .then(([s, e]) => {
        if (!cancelled) {
          setStats(s);
          setEvents(e);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-muted">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <section>
        <h1 className="text-lg font-semibold">Network overview</h1>
        <p className="text-sm text-muted">
          Data from backend API. Focus on layout and styling.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article
              key={stat.id}
              className="rounded-md border border-border p-4"
            >
              <div className="text-xs text-muted">{stat.label}</div>
              <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
              <div className="mt-1 text-xs text-muted">
                {stat.trendLabel} {stat.trendValue}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent validator activity</h2>
          <button type="button" className="text-xs text-primary">
            View all
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between rounded-md border border-border px-3 py-2"
            >
              <div>
                <div className="text-xs font-medium">{event.title}</div>
                <div className="text-[11px] text-muted">{event.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide">
                  {event.severity}
                </span>
                <span className="text-[11px] text-muted">{event.timeAgo}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
