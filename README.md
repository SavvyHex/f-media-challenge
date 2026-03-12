# Zeus React + Tailwind Styling Assessment

This take‑home is focused on **styling and layout** in a small React + Tailwind app inspired by the Zeus dashboard. The app has a **frontend** (Vite + React) and a **backend** (Express) that serves data; your goal is to create a clear, consistent, and responsive UI.

---

## 1. Setup

- **Requirements**: Node 18+ and npm.

- **Backend** (serves dashboard stats, events, and validators):

  ```bash
  cd assessment/backend
  npm install
  npm start
  ```

  Backend runs at `http://localhost:3001`.

- **Frontend** (in a separate terminal):

  ```bash
  cd assessment/frontend
  npm install
  npm run dev
  ```

  Then open the URL printed in the terminal (usually `http://localhost:5173`). The frontend proxies `/api` to the backend.

---

## 2. Scope and constraints

- **Tech stack**: React, TypeScript, Tailwind CSS (frontend); Express (backend, already implemented).
- **Scope**:
  - Work only inside the `assessment` project (`frontend/` and, if you extend it, `backend/`).
  - You may refactor JSX, Tailwind classes, and Tailwind config as needed.
  - You may create small reusable components (e.g. `Button`, `Tag`, `Card`) if it helps with consistency.
  - Add a new **miners** list view on the left side of the application (e.g. as an additional navigation item) with features similar to the validators view (table/list layout, status badges, and a simple detail experience), reusing as much of your styling system as possible.
- **Do not**:
  - Introduce external UI libraries (MUI, Chakra, shadcn/ui, etc.) in the frontend.

Focus on visual polish, consistency, and responsive layout.

---

## 3. What’s already implemented

### Backend (`assessment/backend`)

- **Express server** (`server.js`) – serves JSON at:
  - `GET /api/dashboard/stats` – dashboard stat cards
  - `GET /api/dashboard/events` – recent activity events
  - `GET /api/validators` – list of validators
  - `GET /api/validators/:id` – single validator
  - `GET /api/miners` – list of miners
  - `GET /api/miners/:id` – single miner
- **Data** (`data.js`) – in-memory mock data; see `backend/README.md` for API details.

### Frontend (`assessment/frontend`)

- Vite + React + TypeScript; Tailwind CSS.
- `src/main.tsx` – React entry; `src/App.tsx` – switches between **Dashboard** and **Validators**.
- **Layout**: `AppShell`, `TopNav`, `Sidebar`.
- **Features**: `DashboardPage` (fetches stats + events from API), `ValidatorListPage` (fetches validators), `ValidatorDetailPanel` (selected validator).
- **API client** (`src/api.ts`) – `fetchDashboardStats`, `fetchRecentEvents`, `fetchValidators`.
- **Types** (`src/data/types.ts`) – shared TypeScript types.

The current styling is intentionally minimal. Your task is to turn this into a cohesive, production‑quality UI.

---

## 4. Your tasks

- **App shell & navigation**
  - Polish the overall layout (top nav, left sidebar, main content) so it feels like a cohesive product.
  - Make the sidebar behave well on small screens and show clear active/hover/focus states.

- **Dashboard**
  - Turn the overview stats into clean, readable cards.
  - Make the recent activity list easy to scan, with clear severity chips for different event types.

- **Validators**
  - Style the validators table to look like a professional admin table and keep it usable on smaller screens.
  - Visually differentiate validator status (`online`, `offline`, `degraded`) and make the detail panel feel like a focused inspector.

- **Miners** – See [Add the Miners tab](#41-add-the-miners-tab) below for step-by-step instructions.

- **Stretch (optional)**
  - If you have time, add a light/dark mode toggle (e.g. using the “Theme” control in the top nav) with Tailwind’s `dark` variants.

These tasks cover the core styling areas we care about while leaving room for your own design decisions.

---

### 4.1 Add the Miners tab

The backend already exposes **miners** data at `GET /api/miners` and `GET /api/miners/:id`. Each miner has: `id`, `name`, `status` (`"online"` | `"offline"` | `"degraded"`), `hashrate`, `uptime`, `lastShare`, `region`. Your task is to add a **Miners** tab on the frontend that mirrors the Validators experience.

**Steps:**

1. **Sidebar & routing**
   - In `frontend/src/components/layout/Sidebar.tsx`, add a third nav item: **Miners** (and extend the `AppView` type in `AppShell.tsx` to include `"miners"`).
   - In `frontend/src/App.tsx`, add a branch so that when the current view is `"miners"`, you render a new Miners page component (e.g. `MinersPage` or `MinerListPage`).

2. **Types & API**
   - In `frontend/src/data/types.ts`, define a `Miner` interface with the fields returned by the API (`id`, `name`, `status`, `hashrate`, `uptime`, `lastShare`, `region`).
   - In `frontend/src/api.ts`, add `fetchMiners(): Promise<Miner[]>` and, if useful, `fetchMiner(id: string): Promise<Miner | null>`, calling `GET /api/miners` and `GET /api/miners/:id` respectively.

3. **Miners list page**
   - Create a new page component (e.g. `frontend/src/features/miners/MinerListPage.tsx`) that:
     - Fetches miners on mount using `fetchMiners()`.
     - Renders a table (or list) with columns such as Name, Status, Hashrate, Uptime, Last share, Region, and a “View” (or similar) action.
     - Tracks the selected miner id in state and passes the selected miner to a detail panel.
   - Reuse the same layout pattern as `ValidatorListPage` (main table + right-hand detail panel) so the UI feels consistent.

4. **Miner detail panel**
   - Create `frontend/src/features/miners/MinerDetailPanel.tsx` that accepts a `Miner | null` prop. When `null`, show a short message (e.g. “Select a miner to see more details”). When a miner is selected, show its fields in a clear layout (e.g. cards or labeled rows), reusing the same visual language as `ValidatorDetailPanel` (status badge, metric blocks, spacing).

5. **Styling**
   - Style the miners table and detail panel so they match the validators view: same status badge treatment for `online` / `offline` / `degraded`, same table styling (borders, density, responsive behavior), and same panel hierarchy. The goal is to demonstrate that you can extend the existing design system without inventing a new one.

**Deliverable:** A working Miners tab in the sidebar that loads data from the backend, shows a list of miners with status and key metrics, and reveals a right-hand detail panel when a miner is selected. Styling should be consistent with the Validators tab.

---

## 5. Tailwind and design system hints

- Tailwind is configured in `frontend/tailwind.config.cjs` with a Zeus‑inspired palette.
- Use Tailwind utility classes in JSX; optionally extract small primitives or use `@apply` where it helps.
- Keep class strings readable and grouped.

---

## 6. Evaluation criteria

- **Visual hierarchy & layout** – Clear separation of nav, content, and secondary info; consistent spacing and typography.
- **Tailwind usage** – Thoughtful utilities; sensible extraction of repeated patterns.
- **Responsiveness** – Works on mobile, tablet, and desktop; tables/panels stay usable.
- **States & interactions** – Clear hover/active/focus states; smooth selection and detail panel behavior.
- **Code structure** – Sensible organization under `layout`, `features`, `data`, `api`.

---

## 7. What to submit

- Ensure the app runs: start the **backend** then the **frontend** (see Setup).
- Include a short `NOTES.md` (e.g. in `assessment/` or `frontend/`) with design goals, trade‑offs, and any known issues.
- Submit the `assessment` folder (excluding `node_modules` in both `frontend` and `backend`).

The goal is a **cohesive, thoughtful, and responsive UI** that demonstrates your styling skills with React and Tailwind.
