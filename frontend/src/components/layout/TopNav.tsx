export function TopNav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary" />
          <span className="text-sm font-semibold">Zeus Network</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle theme (stretch goal)"
          >
            Theme
          </button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <span className="text-xs text-muted">you@example.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
