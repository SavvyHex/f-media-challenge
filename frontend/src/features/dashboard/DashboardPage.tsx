import { useEffect, useState } from "react";
import { fetchDashboardStats, fetchRecentEvents } from "../../api";
import type { DashboardStat, RecentEvent } from "../../data/types";
import { ValidatorsIcon, SessionsIcon, HealthIcon } from "../../icons";
import type { SVGAttributes } from "react";

type IconComponent = (props: SVGAttributes<SVGSVGElement>) => JSX.Element;

function getStatCardStyle(statId: string) {
  const styleMap: Record<string, { Icon: IconComponent; borderColor: string }> = {
    "total-validators": {
      Icon: ValidatorsIcon,
      borderColor: "border-l-blue-500",
    },
    "active-sessions": {
      Icon: SessionsIcon,
      borderColor: "border-l-green-500",
    },
    "network-health": {
      Icon: HealthIcon,
      borderColor: "border-l-emerald-500",
    },
  };
  return styleMap[statId] || { Icon: ValidatorsIcon, borderColor: "border-l-slate-500" };
}

function getSeverityStyle(severity: "info" | "warning" | "error") {
  const styleMap = {
    error: {
      borderColor: "border-l-red-500",
      bgTint: "bg-red-500/5",
      badgeBg: "bg-red-600",
      badgeText: "text-white",
    },
    warning: {
      borderColor: "border-l-amber-500",
      bgTint: "bg-amber-500/5",
      badgeBg: "bg-amber-500",
      badgeText: "text-white",
    },
    info: {
      borderColor: "border-l-blue-500",
      bgTint: "bg-blue-500/5",
      badgeBg: "bg-blue-600",
      badgeText: "text-white",
    },
  };
  return styleMap[severity];
}

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
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Network overview</h1>
          <div className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Live</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-muted">
          Data from backend API. Focus on layout and styling.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const { Icon, borderColor } = getStatCardStyle(stat.id);
            return (
              <article
                key={stat.id}
                className={`rounded-md border-l-4 border-r border-t border-b border-border ${borderColor} p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-muted uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="mt-3 text-4xl font-bold">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs text-muted">
                      {stat.trendLabel} <span className="font-medium">{stat.trendValue}</span>
                    </div>
                  </div>
                  <Icon className="ml-3 h-12 w-12 flex-shrink-0 opacity-30" />
                </div>
              </article>
            );
          })}
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
          {events.map((event) => {
            const severity = getSeverityStyle(event.severity);
            return (
              <li
                key={event.id}
                className={`flex items-center justify-between rounded-md border-l-2 border-r border-t border-b border-border ${severity.borderColor} ${severity.bgTint} px-3 py-2`}
              >
                <div>
                  <div className="text-xs font-medium">{event.title}</div>
                  <div className="text-[11px] text-muted">{event.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full ${severity.badgeBg} ${severity.badgeText} px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide`}>
                    {event.severity}
                  </span>
                  <span className="text-[11px] text-muted">{event.timeAgo}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
