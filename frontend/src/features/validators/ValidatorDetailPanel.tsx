import type { Validator } from "../../data/types";

interface ValidatorDetailPanelProps {
  validator: Validator | null;
}

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

export function ValidatorDetailPanel({ validator }: ValidatorDetailPanelProps) {
  if (!validator) {
    return (
      <aside className="hidden w-72 border-l border-border px-4 py-6 text-sm text-muted lg:block">
        Select a validator to see more details.
      </aside>
    );
  }

  return (
    <aside className="hidden w-72 border-l border-border px-4 py-6 text-sm lg:block">
      <header className="mb-4">
        <h2 className="text-sm font-semibold">{validator.name}</h2>
        <p className="text-xs text-muted">{validator.id}</p>
      </header>

      <section className="space-y-3">
        <div>
          <h3 className="text-xs font-medium text-muted">Status</h3>
          <p className="mt-1 text-xs">
            {(() => {
              const style = getStatusBadgeStyle(validator.status);
              return (
                <span className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[10px] uppercase tracking-wide font-semibold`}>
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  {validator.status}
                </span>
              );
            })()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md border border-border p-2">
            <div className="text-[10px] text-muted">Stake</div>
            <div className="mt-1 font-medium">{validator.stake}</div>
          </div>
          <div className="rounded-md border border-border p-2">
            <div className="text-[10px] text-muted">Score</div>
            <div className="mt-1 font-medium">{validator.score}</div>
          </div>
          <div className="rounded-md border border-border p-2">
            <div className="text-[10px] text-muted">Latency</div>
            <div className="mt-1 font-medium">{validator.latency}</div>
          </div>
          <div className="rounded-md border border-border p-2">
            <div className="text-[10px] text-muted">Region</div>
            <div className="mt-1 font-medium">{validator.region}</div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium text-muted">Notes</h3>
          <p className="mt-1 text-xs text-muted">
            This panel is intentionally minimal. Focus on layout, spacing,
            hierarchy, and responsive behavior.
          </p>
        </div>
      </section>
    </aside>
  );
}
