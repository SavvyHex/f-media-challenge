import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { ValidatorListPage } from "./features/validators/ValidatorListPage";
import { MinerListPage } from "./features/miners/MinerListPage";

type View = "dashboard" | "validators" | "miners";

function App() {
  const [view, setView] = useState<View>("dashboard");

  const handleNavigate = (next: View) => {
    setView(next);
  };

  return (
    <AppShell currentView={view} onNavigate={handleNavigate}>
      {view === "dashboard" && <DashboardPage />}
      {view === "validators" && <ValidatorListPage />}
      {view === "miners" && <MinerListPage />}
    </AppShell>
  );
}

export default App;
