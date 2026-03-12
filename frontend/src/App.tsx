import { useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { ValidatorListPage } from "./features/validators/ValidatorListPage";

type View = "dashboard" | "validators";

function App() {
  const [view, setView] = useState<View>("dashboard");

  const handleNavigate = (next: View) => {
    setView(next);
  };

  return (
    <AppShell currentView={view} onNavigate={handleNavigate}>
      {view === "dashboard" ? <DashboardPage /> : <ValidatorListPage />}
    </AppShell>
  );
}

export default App;
