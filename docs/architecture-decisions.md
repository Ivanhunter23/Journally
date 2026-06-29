# Architecture Decision Records (ADRs)

Each entry records a significant architecture decision: the choice, the context, and *why* — so
future-us (and anyone reviewing) understands the reasoning without re-litigating it.

---

## ADR-001 — Next.js full-stack (no separate NestJS backend) for v1

**Status:** Accepted · 2026-06-25

**Context:** The original charter listed both Next.js and NestJS. For a single-user app, a separate
backend is over-engineering by product logic; the justification would be purely learning.

**Decision:** Build v1 as a single **Next.js full-stack app** (App Router). Next.js owns UI, API,
data access, and auth. Defer NestJS.

**Why:** Keeps learning focused on one framework (Next.js is already a large surface). Fewer moving
parts, one deploy, and Auth.js lives where it's designed to (inside Next.js) — which removes the
cross-service session problem. NestJS can be added later as a deliberate learning exercise.

**Consequences:** No network boundary between front and back. Repo structure is a single app.
A future Android app (backlog) will require adding an HTTP API at that time.

---

## ADR-002 — App Router (React Server Components), not Pages Router

**Status:** Accepted · 2026-06-25

**Context:** Next.js offers two routing systems. Pages Router is the legacy model (all components
run client-side); App Router (default since 2023) is built on React Server Components.

**Decision:** Use the **App Router**. Components are **Server Components by default**; mark a
component `"use client"` only when it needs browser interactivity (state, clicks, typing).

**Why:** It's the current industry default for new Next.js apps and the modern paradigm worth
learning. Server Components ship less JS and fetch data where they render.

**Consequences:** The core discipline is keeping client "islands" small. Data-read patterns differ
from the legacy world (fetch directly in Server Components, no client-side data fetching for reads).

---

## ADR-003 — Server Actions for writes; Server Components for reads (no REST API in v1)

**Status:** Accepted · 2026-06-25

**Context:** Within the App Router, mutations can be done via Server Actions (Next-native) or via
Route Handlers (a REST API the client calls with `fetch`).

**Decision:** **Reads** happen directly in Server Components. **Writes** use **Server Actions**.
No REST API layer in v1.

**Why:** Idiomatic App Router approach; minimal boilerplate; end-to-end type safety. Building a REST
API now would be premature (YAGNI) — the only future consumer is the backlog Android app.

**Consequences:** Server Actions are not a public HTTP API. When the Android app graduates from the
backlog, add Route Handlers then (without discarding the Server Actions).

---

## ADR-004 — Auth via Auth.js with GitHub OAuth + database sessions (credentials deferred)

**Status:** Accepted · 2026-06-25

**Context:** Auth.js supports OAuth providers, credentials (self-managed passwords), and magic
links. Credentials mean owning password hashing and the associated security surface.

**Decision:** v1 uses **GitHub OAuth** via Auth.js, with the **Prisma adapter** and a
**database session** strategy. Self-managed **credentials** auth is deferred to a later learning
exercise.

**Why:** No passwords stored = the biggest auth risk removed. Secure-by-default, minimal code, and
ideal for a single developer user. Still teaches the Auth.js session + adapter model. Database
sessions are visible and revocable. GitHub fits a developer-portfolio audience; Google can be added
later trivially.

**Consequences:** Requires registering a GitHub OAuth app. The Prisma adapter dictates several
tables (User, Account, Session, VerificationToken) that the data model must include.

---

## ADR-005 — `HabitLog` stores `value`; `status` is computed, not stored

**Status:** Accepted · 2026-06-25

**Context:** Each daily record has an outcome status (MISSED / SHOWED_UP / SUCCESS / PERFECT).
Status is a function of how much was done (`value`) vs the habit's `targetValue` and the (tunable)
thresholds.

**Decision:** Store only `value` on `HabitLog`. **Compute `status` on read** from
`value` / `targetValue` / thresholds — do not persist it. Model **binary habits as
`targetValue = 1`, `value ∈ {0,1}`**, so status falls out uniformly (0% → MISSED, 100% → SUCCESS).

**Why:** Single source of truth (`value`) — status can never disagree with reality. Supports the
two PRD realities elegantly: pure-C editable history (edit `value`, status follows automatically)
and tunable thresholds (change one constant, all history re-classifies — no migration). Recompute
cost is negligible for a single-user app.

**Consequences:** Cannot filter `WHERE status = …` directly in SQL; status filtering uses the
value/target math. Acceptable at this scale.


