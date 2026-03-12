import type { AppView } from "./AppShell";

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const items: { id: AppView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "validators", label: "Validators" }
];

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-56 border-r border-border md:block">
      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm"
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-muted">stub</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
