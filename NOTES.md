# Design Notes

## Overview
This is a dashboard for the Zeus network that displays validator and miner statistics in a clean, modern interface. The design uses a dual-theme system (dark/light) built entirely with Tailwind CSS and custom CSS variables—no UI libraries.

## Design System

### Colors
The app uses CSS custom properties for theming. This approach lets us swap entire color schemes instantly without touching component code.

**Dark Theme (default)**
- Background: `#050816` (deep navy, almost black)
- Surface: `#0B1020` (slightly lighter navy for elevated content)
- Primary: `#2563eb` (bright blue)
- Accent: `#22c55e` (emerald green for success states)
- Border: `#1f2933` (dark gray)
- Muted: `#6b7280` (medium gray for secondary text)

**Light Theme**
When users toggle to light mode, these swap:
- Background: `#F5F2EB` (warm off-white, not stark white)
- Surface: `#EDEAE0` (slightly warmer for cards/panels)
- Primary: `#1D4ED8` (darker blue for readability)
- Accent: `#15803D` (darker green)
- Border: `#D4CFC4` (warm gray, not cold)
- Muted: `#8B8680` (warm gray for text)

The light theme uses warm neutrals instead of pure grays to feel less clinical. This was a deliberate choice to match the off-white background.

### Status Colors
Status badges use semantic Tailwind colors directly (not CSS variables) because they need clear visual distinction:
- Online: `emerald-500` (bright green)
- Degraded: `amber-500` (orange/yellow)
- Offline: `red-500` (red)

In light mode, these have higher opacity backgrounds and darker text to maintain contrast on the lighter surface. The badges use `opacity-40` for background in light mode vs `opacity-20` in dark mode.

## Theme Switching

### How It Works
1. **FOUC Prevention**: `index.html` contains a synchronous script in the `<head>` that reads `localStorage.getItem("theme")` and applies the `light` class *before* React loads. This prevents a flash of the wrong theme on page load.

2. **Component State**: The `ThemeToggle` component in `TopNav.tsx` manages the theme state and saves preference to localStorage on every toggle.

3. **CSS Implementation**: Dark mode is `:root` defaults. Light mode is `:root.light` class. When the app adds/removes the `light` class on the document element, Tailwind's variables update automatically.

If a user has never set a theme, they get dark by default. Their preference persists across browser sessions.

## Component Patterns

### Tables
Both Validators and Miners pages use the same table structure. Tables have:
- Subtle borders with `border-border/10` (10% opacity) to keep them minimal
- Hover effects that change the row background
- Status badge with colored dot in the first column
- Sortable columns with dropdown for choosing sort field
- Clickable rows that show details in the side panel

The table filtering and sorting both happen in React state before rendering. Filter dropdowns use simple boolean state (`showStatusMenu`) to toggle visibility.

### Detail Panels
The right sidebar shows detailed metrics for a selected row. It's a fixed-position panel that:
- Displays 4 metrics in a 2-column grid (metric name + value cards)
- Uses small, uppercase labels with larger values
- Has the same status badge as the table row
- Is responsive—hidden on mobile to save space

Clicking a new row instantly updates the panel. The data fetches on mount and when the selected ID changes.

### Dropdown Menus
Filter and sort dropdowns are custom (no external menu library). They:
- Use `absolute` positioning below the button
- Have white/dark backgrounds with subtle borders
- Use boolean state to toggle open/closed
- Close when clicking outside (handled by onClick on the trigger button)
- Items are just divs with padding, not a bloated components

The "All" option in filters resets the array, so unfiltered tables show everything.

### Sidebar Navigation
The sidebar is always visible on desktop but collapses on mobile. On mobile it:
- Slides in from the left with a fixed position
- Has a semi-transparent backdrop overlay (z-index 40)
- The sidebar itself has z-index 50
- Closes when clicking an item or the backdrop

Active nav items have a left border and subtle background tint to show current page.

## Layout & Spacing

### Breakpoints
- Mobile-first: Small screens are the baseline
- `md:` breakpoint for tablets/desktop (usually around 768px depending on Tailwind defaults)
- Main content is flex with sidebar taking ~240px on desktop, full width on mobile

### Padding & Gaps
- Containers use `px-4` horizontally with `mx-auto` to cap width
- Cards use `p-4` or `p-6` depending on emphasis
- Gaps between elements are `gap-2` (small), `gap-4` (medium), or `gap-6` (large)
- Dashboard stats cards stack vertically on mobile, horizontally on larger screens

## Typography
- Headlines use `font-semibold` or `font-bold`
- Body text is default Tailwind sans (uses system fonts)
- Secondary text uses the `text-muted` class for contrast
- Metric values in detail panels use larger font sizes to emphasize numbers

## Notes on Decisions

**Why CSS variables instead of Tailwind dark: mode?**
Tailwind's `dark:` prefix works well for single toggles, but CSS variables make it cleaner to swap entire color schemes without sprinkling conditional classes throughout components. One class on the root element handles everything.

**Why custom dropdowns instead of a UI library?**
Keeping the bundle tiny. Custom dropdowns are simple enough and give us total control over styling and behavior. No magic, just plain React state.

**Why no loading skeletons?**
The mock data loads instantly in development, so they weren't needed. In production with real API calls, we'd add them.

**Mobile sidebar approach**
Using `fixed` positioning with z-index layering instead of transform slide-in keeps the DOM simpler. The overlay is just a div with `absolute` positioning and backdrop-blur.

**Status filter shows "All" first**
UX convention—users expect filters to start in an unfiltered state. "All" makes this explicit.

## Known Limitations
- Dropdowns don't have keyboard navigation (Escape to close, arrow keys to navigate)
- No loading or error states in the UI (assumes API always succeeds)
- Detail panels could use more metrics to fill the sidebar
- Activity feed timestamps are hardcoded ("4 min ago") instead of relative

## Future Improvements
- Add tooltips to dashboard trend arrows
- Implement search/filtering by name within tables
- Add export data as CSV button
- Detailed charts for metrics over time
- Real pagination if dataset grows large
