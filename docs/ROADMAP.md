# Roadmap — Journally v1

A living plan of the build, phase by phase. Tracks **planned vs. actual** so the project tells an
honest engineering story. Scope is **v1 only** (the three pillars in [PRD.md](./PRD.md)); the
"Ascension" backlog is deliberately excluded.

**Status legend:** ✅ done · 🚧 in progress · ⬜ not started

| # | Phase | What it delivers | Est. hours | Status |
|---|---|---|---|---|
| 0 | Requirements & Architecture | PRD, ADRs, Git/GitHub, Next.js scaffold | ~8 | ✅ |
| 1 | **Database** | Docker Postgres, Prisma, `schema.prisma`, first migration, seed | 6–10 | 🚧 |
| 2 | Authentication | Auth.js + GitHub OAuth, DB sessions, route protection | 8–14 | ⬜ |
| 3 | Habits CRUD | Create/list/edit/archive habits — Server Actions, Zod, shadcn forms | 12–20 | ⬜ |
| 4 | Daily logging | Log outcomes, 4-state computed status, editable history | 10–16 | ⬜ |
| 5 | Gratification | Streak counter, calendar heatmap, badges | 10–16 | ⬜ |
| 6 | Journal pillar | Guided prompts + optional free-write + re-readable history | 8–12 | ⬜ |
| 7 | Planner pillar | Ordered to-do list, auto-loads tomorrow's habits | 8–12 | ⬜ |
| 8 | Testing | Vitest unit tests + Playwright e2e | 10–16 | ⬜ |
| 9 | Polish | Responsive, error handling, accessibility | 6–10 | ⬜ |
| 10 | Deployment | Docker, GitHub Actions CI, Vercel + Railway, secrets | 8–12 | ⬜ |

**Total remaining estimate:** ≈ 85–140 focused, mentored hours.

> Estimates are an optimistic-realistic floor; they expand, never shrink. Auth and the heatmap have
> the deepest rabbit holes. The early phases are the steepest because every concept is new — pace
> picks up once the patterns (Server Component read → Server Action write → Zod validate) repeat.

## Decision log

Architecture decisions live in [architecture-decisions.md](./architecture-decisions.md) (ADR format).
