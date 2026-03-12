import { useEffect, useState } from "react";
import { fetchValidators } from "../../api";
import type { Validator } from "../../data/types";
import { ValidatorDetailPanel } from "./ValidatorDetailPanel";

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

export function ValidatorListPage() {
  const [validators, setValidators] = useState<Validator[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "online" | "offline" | "degraded">("all");
  const [sortBy, setSortBy] = useState<"name" | "score">("name");
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchValidators()
      .then((list) => {
        if (!cancelled) setValidators(list);
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

  const selected = validators.find((v) => v.id === selectedId) ?? null;

  // Filter validators by status
  let filtered = validators;
  if (statusFilter !== "all") {
    filtered = filtered.filter((v) => v.status === statusFilter);
  }

  // Sort validators
  if (sortBy === "score") {
    filtered = [...filtered].sort((a, b) => {
      const scoreA = parseFloat(a.score);
      const scoreB = parseFloat(b.score);
      return isNaN(scoreB) ? -1 : isNaN(scoreA) ? 1 : scoreB - scoreA;
    });
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="text-sm text-muted">Loading validators…</p>
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
            <h1 className="text-lg font-semibold">Validators</h1>
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
                      setSortBy("score");
                      setShowSortMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-muted/20 transition-colors"
                  >
                    Score
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
                  Stake
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Score
                </th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">
                  Last heartbeat
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const isSelected = v.id === selectedId;
                return (
                  <tr
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className={`group cursor-pointer border-t  transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${isSelected ? "bg-primary/10 dark:bg-primary/10" : ""}`}
                    aria-selected={isSelected}
                  >
                    <td className="px-3 py-3 text-xs font-medium">{v.name}</td>
                    <td className="px-3 py-3 text-xs">
                      {(() => {
                        const style = getStatusBadgeStyle(v.status);
                        return (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold`}
                          >
                            <span
                              className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                            />
                            {v.status}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-3 py-3 text-xs">{v.stake}</td>
                    <td className="px-3 py-3 text-xs">{v.score}</td>
                    <td className="px-3 py-3 text-xs text-muted">
                      {v.lastHeartbeat}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <ValidatorDetailPanel validator={selected} />
    </div>
  );
}
