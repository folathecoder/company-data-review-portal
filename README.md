# Company Data Review Portal

A React application where an analyst can inspect a company's (Berkshire Hathaway) profile, leadership, and office locations, make corrections inline, and export the cleaned data as JSON.

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Form Management:** react-hook-form + Zod validation
- **Animations:** Framer Motion
- **Notifications:** Sonner
- **UI Design:** Figma

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Design Decisions

### Architecture
I chose **Next.js (App Router)** and **React Hook Form** to balance speed of development with production-grade reliability.
- **Why no Global State (Redux/Zustand)?** The form state is local to this specific workflow. React Hook Form's context efficiently manages the deep component tree without the boilerplate of a global store.
- **Why Zod?** It serves as the single source of truth. Validation logic (e.g., "Public companies must have a ticker") lives in the schema, not the UI handlers, ensuring data integrity during both inline editing and JSON export.

### UX
Data entry can be tedious, so I focused on reducing friction:
- **Collapsible Lists:** Directors and Locations default to a collapsed "summary" view to keep the UI scannable.
- **Conditional Complexity:** Fields like "Ticker Symbol" only animate in when relevant (Funding Stage = Public), reducing cognitive load.
- **Safe Defaults:** `beforeunload` protection and explicit "Save" actions prevent accidental data loss.
- **Smart Validation:** Errors are shown `onBlur` (when you leave a field) rather than `onChange` (while you type), preventing frustrating "shouting" UI.
- **Export Requires Save:** JSON export only works on saved data. This prevents exporting half-edited state and keeps the exported file consistent with what the analyst last committed to.

### Trade-offs
- **Client-Side Persistence:** `localStorage` simulates a backend. In production, this would be a React Query mutation hitting a real API — the `useLocalStorage` hook is a drop-in placeholder for that pattern.
- **Single-Company Scope:** The app loads Berkshire Hathaway (`companies[0]`) directly. Multi-company support (a list page with dynamic `[companyId]` routes) was intentionally deferred to keep the scope on the editing experience itself as stated in the task requirement.
