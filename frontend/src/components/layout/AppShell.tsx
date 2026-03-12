import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";

export type AppView = "dashboard" | "validators";

interface AppShellProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  children: ReactNode;
}

export function AppShell({ currentView, onNavigate, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-primaryForeground">
      <TopNav />
      <div className="flex">
        <Sidebar currentView={currentView} onNavigate={onNavigate} />
        <main className="flex-1 border-l border-border/30">
          {children}
        </main>
      </div>
    </div>
  );
}
