import { useEffect, useState } from "react";
import { fetchMiners } from "../../api";
import type { Miner } from "../../data/types";
import { MinerDetailPanel } from "./MinerDetailPanel";

function getStatusBadgeStyle(status: "online" | "offline" | "degraded") {
  const styleMap = {
    online: {
      bg: "bg-emerald-500/40 dark:bg-emerald-500/20",
      text: "text-emerald-900 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    degraded: {
      bg: "bg-amber-500/40 dark:bg-amber-500/20",
      text: "text-amber-900 dark:text-amber-300",
      dot: "bg-amber-500",
    },
    offline: {
      bg: "bg-red-500/40 dark:bg-red-500/20",
      text: "text-red-900 dark:text-red-300",
      dot: "bg-red-500",
    },
  };
  return styleMap[status];
}

export function MinerListPage() {
  const [miners, setMiners] = useState<Miner[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "offline" | "degraded">("all");
  const [sortBy, setSortBy] = useState<"name" | "uptime">("name");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchMiners()
      .then((list) => {
        if (!cancelled) setMiners(list);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = miners.find((m) => m.id === selectedId) ?? null;

  // Filter miners by status
  let filtered = miners;
  if (statusFilter !== "all") {
    filtered = filtered.filter((m) => m.status === statusFilter);
  }

  // Sort miners
  if (sortBy === "uptime") {
    filtered = [...filtered].sort((a, b) => {
      const uptimeA = parseFloat(a.uptime);
      const uptimeB = parseFloat(b.uptime);
      return isNaN(uptimeB) ? -1 : isNaN(uptimeA) ? 1 : uptimeB - uptimeA;
    });
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-muted">Loading miners…</p>
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
    <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
      <section className="flex-1 overflow-x-auto">
        <header className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Miners</h1>
            <p className="text-sm text-muted">
              Click on a row to view more information.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="rounded-md border border-border bg-muted/30 px-2 py-1 text-xs font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Status: {statusFilter}
              </button>
              {showStatusMenu && (
                <div className="absolute right-0 top-full mt-1 w-32 rounded-md border border-border bg-surface shadow-md z-10">
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    All statuses
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("online");
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Online
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("degraded");
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Degraded
                  </button>
                  <button
                    onClick={() => {
                      setStatusFilter("offline");
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Offline
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="rounded-md border border-border bg-muted/30 px-2 py-1 text-xs font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Sort: {sortBy}
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 w-24 rounded-md border border-border bg-surface shadow-md z-10">
                  <button
                    onClick={() => {
                      setSortBy("name");
                      setShowSortMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Name
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("uptime");
                      setShowSortMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Uptime
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="rounded-md border  bg-surface/60 overflow-hidden">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/15 border-b ">
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Hashrate
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Last share
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const isSelected = m.id === selectedId;
                return (
                  <tr
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`group cursor-pointer border-t  transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${isSelected ? "bg-primary/10 dark:bg-primary/10" : ""}`}
                    aria-selected={isSelected}
                  >
                    <td className="px-3 py-3 text-xs font-medium">{m.name}</td>
                    <td className="px-3 py-3 text-xs">
                      {(() => {
                        const style = getStatusBadgeStyle(m.status);
                        return (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold`}
                          >
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />
                            {m.status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-3 py-3 text-xs">{m.hashrate}</td>
                    <td className="px-3 py-3 text-xs">{m.uptime}</td>
                    <td className="px-3 py-3 text-xs text-muted">
                      {m.lastShare}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <MinerDetailPanel miner={selected} />
    </div>
  );
}
