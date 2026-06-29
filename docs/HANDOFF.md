# HANDOFF — Journally

| | |
|---|---|
| **Date** | 2026-06-25 |
| **Phase** | 2 — Architecture (in progress) |
| **Repo state** | No commits yet. Only `docs/` and `.gitignore` exist. No code scaffolded. |

---

## 1. What we did today

- **Reviewed the PRD** (`docs/PRD.md`) end to end — requirements phase is effectively complete.
- **Resolved 3 of the §12 open questions** that were blocking the data model (the rest —
  reassurance copy, target-raise UI — are deferred; they don't touch the schema):

  | Open question | Decision |
  |---|---|
  | Success vs. Showed Up threshold | **60%** (forgiving — anchors the anti-perfectionism soul) |
  | Can binary habits be "Showed Up"? | **No** — binary is strictly Missed / Success |
  | Stagnation guard in v1? | **Backlog** — keep v1 focused on the core 4-state engine |

- **Locked the outcome model** (now the spec for the engine):

  | State | Binary | Quantitative | Streak | Triggers |
  |---|---|---|---|---|
  | Missed | not done | 0% | breaks | reflection prompt → journal |
  | Showed Up | n/a | 1–59% | protects | — |
  | Success | done | 60–99% | +1 | — |
  | Perfect | n/a | 100% | +1 | badge |

  Thresholds to live as **named constants**, not magic numbers.

- **Agreed the high-level architecture** (see §2).

---

## 2. Current architecture (decided)

- **Repo shape:** monorepo — `apps/api` (NestJS) + `apps/web` (Next.js) + shared `packages/`
  for Zod schemas → inferred TS types, shared once across both sides.
- **Data-flow spine:** `Next.js (RSC + client) → NestJS REST API → Prisma → Postgres`.
  Auth.js issues the session at the Next layer; the API validates it.
- **Stack (from charter):** Next.js / React / TS / Tailwind / shadcn; NestJS / Prisma / Postgres;
  Auth.js; Zod; Vitest + Playwright; Docker / GitHub Actions / Vercel / Railway.

> Nothing here is implemented yet — these are agreed decisions, not code.

---

## 3. Pending / open decisions

- **⭐ Store vs. derive the outcome state (BLOCKING the schema).** Open for the user to reason about.
  - (A) Store an `outcome` enum column, computed on write.
  - (B) Store only raw `value` + `target`, derive state on read.
  - Key constraint forcing the choice: **past days are fully editable** (PRD §8). Editing a past
    value must not let a stored outcome rot into a lie.
  - *Awaiting the user's instinct (A or B + why) before designing the schema.*
- **Process choices (asked, awaiting answer):**
  1. Capture decisions as lightweight **ADRs** in `docs/adr/`? (recommended)
  2. Milestone 0: user types the scaffolding (we give plan + hints) vs. we lay the skeleton and walk through it?

---

## 4. Known bugs

- None — no code exists yet.

---

## 5. Next steps

1. **Resolve store-vs-derive** for the outcome state (see §3).
2. **Milestone 0 — scaffold (small, scoped):**
   - Set up the monorepo (`apps/api`, `apps/web`, `packages/`).
   - Stand up **Postgres in Docker**.
   - Write the **first Prisma schema — `User` and `Habit` only** (not the full model yet).
3. Review Milestone 0 as a PR, then expand the schema toward the outcome/log tables.

---

## 6. Deferred (backlog, per PRD §10)

Auto-ramp/deload engine · identity system · time-budget · richer scheduling · reminders/push ·
social/accountability · Android + sync · AI pattern-detection · stagnation guard.
