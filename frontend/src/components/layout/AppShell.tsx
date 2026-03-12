import { ReactNode, useState } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

export type AppView = "dashboard" | "validators" | "miners";

interface AppShellProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  children: ReactNode;
}

export function AppShell({ currentView, onNavigate, children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-primaryForeground flex flex-col">
      <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 top-14 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
        />
        <main className="flex-1 border-l border-border/30">
          {children}
        </main>
      </div>
    </div>
  );
}
