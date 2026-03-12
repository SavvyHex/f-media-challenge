import type { AppView } from "./AppShell";

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  isOpen?: boolean;
}

const items: { id: AppView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "validators", label: "Validators" },
  { id: "miners", label: "Miners" },
];

export function Sidebar({ currentView, onNavigate, isOpen = false }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-14 z-50 h-[calc(100vh-56px)] w-56 border-r border-white/5 bg-surface transition-transform md:static md:h-auto md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      {" "}
      <nav className="space-y-1 p-3">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center rounded-md border-l-2 px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "border-l-primary bg-primary/15 font-semibold text-primaryForeground hover:bg-primary/20"
                  : "border-l-transparent text-muted hover:bg-white/5 hover:text-primaryForeground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
