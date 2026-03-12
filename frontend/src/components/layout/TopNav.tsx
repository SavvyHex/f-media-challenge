import { useState, useEffect } from "react";

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primaryForeground"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is already enabled
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center rounded-full border border-border bg-muted/30 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-flex h-7 w-7 transform items-center justify-center rounded-full bg-background shadow-sm ring-2 ring-border transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

export function TopNav({ onMenuClick }: { onMenuClick?: () => void } = {}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary" />
          <span className="text-sm font-semibold">Zeus Network</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-1 hover:bg-muted/20 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <span className="text-xs text-muted">you@example.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
