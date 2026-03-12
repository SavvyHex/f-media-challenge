import { useEffect, useState } from "react";
import { fetchValidators } from "../../api";
import type { Validator } from "../../data/types";
import { ValidatorDetailPanel } from "./ValidatorDetailPanel";

function getStatusBadgeStyle(status: "online" | "offline" | "degraded") {
  const styleMap = {
    online: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-300",
      dot: "bg-emerald-500",
    },
    degraded: {
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      dot: "bg-amber-500",
    },
    offline: {
      bg: "bg-red-500/20",
      text: "text-red-300",
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

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchValidators()
      .then((list) => {
        if (!cancelled) setValidators(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const selected = validators.find((v) => v.id === selectedId) ?? null;

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
            <button
              type="button"
              className="rounded-md border border-border bg-muted/30 px-2 py-1 text-xs font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Status filter
            </button>
            <button
              type="button"
              className="rounded-md border border-border bg-muted/30 px-2 py-1 text-xs font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Sort
            </button>
          </div>
        </header>

        <div className="rounded-md border border-border/30 bg-surface/60 overflow-hidden">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/15 border-b border-border/30">
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Name</th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Stake</th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Score</th>
                <th className="px-3 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Last heartbeat</th>
              </tr>
            </thead>
            <tbody>
              {validators.map((v) => {
                const isSelected = v.id === selectedId;
                return (
                  <tr
                    key={v.id}
                    onClick={() => setSelectedId(v.id)}
                    className="group cursor-pointer border-t border-border/20 transition-colors hover:bg-muted/10"
                    aria-selected={isSelected}
                  >
                    <td className="px-3 py-3 text-xs font-medium">{v.name}</td>
                    <td className="px-3 py-3 text-xs">
                      {(() => {
                        const style = getStatusBadgeStyle(v.status);
                        return (
                          <span className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold`}>
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
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
