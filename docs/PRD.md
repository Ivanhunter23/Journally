# Product Requirements Document — Journally

| | |
|---|---|
| **Product** | Journally — a habit tracker with tethered journaling & next-day planning |
| **Author** | Ivan |
| **Date** | 2026-06-25 |
| **Status** | Draft — pending review, pre-architecture |
| **Version** | 0.1 (v1 / MVP scope) |

---

## 1. Summary

Journally is a **habit tracker** for people who have repeatedly *abandoned* habit apps. Its
defining belief is that **failure is the normal case**, not the exception — so instead of
punishing a missed day with a red mark and silence, it catches you with reflection and gets you
back on your feet. A **journal** (tethered to the habits, not a blank diary) and a **next-day
planner** sit on top of that spine, so the whole product forms a single daily loop.

It is being built **desktop-web-first** as a multi-user application, primarily as a vehicle for
the author to learn production full-stack engineering, and secondarily as a tool the author
actually uses every day.

---

## 2. Problem Statement

Existing habit apps fail their users in three ways:

1. **Paywalls & bloat** — simple habit tracking is buried behind subscriptions and feature sprawl.
2. **They celebrate streaks but abandon you on failure** — a missed day is a red mark, treated as
   shame, never as *information*. There is no path back.
3. **They demand perfection** — implicitly optimising for 100%-every-day, which is the fast road
   to burnout and quitting.

The result: the user starts strong, slips once, feels the app has turned against them, and quits —
again. **The unmet need is a habit system that treats failure as expected and recoverable.**

---

## 3. Target User

**Primary (and currently only) user:** the author — someone on a deliberate self-improvement year
("my ascension into the best version of myself") who wants to build good habits, keep the ones that
work, and drop the bad ones. They have bounced off multiple habit apps because the apps were
paywalled, bloated, over-complex, or punishing.

**Usage rhythm:** not one daily session — *bursts*. Tick habits as they happen (e.g. morning habits
ticked at lunch), then a larger **evening ritual**: review the day → journal → plan tomorrow.

---

## 4. Goals & Success Metrics

Success is **behavioural and honest**, not vanity metrics.

| Lens | Goal | Signal at month 3 |
|---|---|---|
| **Project (learning)** | Learn production full-stack engineering | Can confidently walk a recruiter through the auth flow, data model, and deployment — because it's understood, not just generated |
| **Product (life)** | Actually use it daily | **Still opening it in month 3** — i.e. it survived past the "week-2 graveyard" where every previous app died. *Retention-of-self is the North Star.* ⭐ |

---

## 5. Product Philosophy (the soul)

These are the load-bearing principles. Every feature must serve them; anything that violates them
is wrong even if it "works."

- **The only true failure is not showing up.** Showing up — even at 10% — is honoured.
- **Kind, but accountable.** Failure is met with reassurance *and* reflection, never shame alone.
- **For people who fail and try again** until it sticks.
- **No perfectionism.** A sustainable ~60–99% beats "100% until you crack."
- **Journaling in service of the habits**, not a blank page for random thoughts.
- **Meaningful gratification, never cheap dopamine.** Progress and identity, not points-farming,
  guilt-trip notifications, or manufactured urgency.

---

## 6. Scope — The Three Pillars

The habit tracker is the **spine**; journaling and planning earn their place by supporting it. The
three pillars form one loop:

> ☀️ **Through the day:** tick habits as you complete them →
> 🌙 **Evening:** review the day → journal (guided) → plan tomorrow (habits auto-loaded + extras) →
> wake to a ready-made map.

### Pillar 1 — Habit Tracker (the core)

**Habit types (v1):**
- **Binary** — done / not done (shower, shave, skincare, hair, walk the dog).
- **Quantitative, fixed target** — a number you set yourself (drink 4L water, study 1h). *You*
  raise the target manually when ready; there is **no automatic ramp in v1**.

**Scheduling (v1): Daily only.** Every habit is evaluated every day.

**Outcome model — four states** (the differentiator). For quantitative habits, the state is derived
from % of target reached; binary habits resolve to Missed or Success. *Thresholds are tunable.*

| State | Range | Meaning | Effect on streak | Effect on target (v1) |
|---|---|---|---|---|
| **Missed** | 0% | The *only* true failure | Breaks | — (manual) |
| **Showed Up** | ~1–59% | You tried; honoured | **Protects** the streak | Hold |
| **Success** | ~60–99% | A genuine win | +1 | Hold (manual raise) |
| **Perfect** | 100% | Celebrated, *not* expected | +1 | Hold; earns a special badge |

**Failure handling:**
- **Missed** → triggers a **reflection prompt** ("Why did you fall short? What's the plan so it
  doesn't repeat?"). This prompt feeds the evening journal (Pillar 2).
- After a **broken streak** → a **reassuring message** ("everyone has bad days; the ones who come
  back are who win").
- **Stagnation guard** (lightweight; tunable, may slip to backlog): if a habit sits at *Showed Up*
  for ~4–6+ days straight, the app gently nudges — "you're showing up, but you've stopped moving."

**Gratification (winning side):**
- **Streak counter** (honor-system — see §8 on editable history).
- **Calendar heatmap** (GitHub-contributions style).
- **Badges / milestones**, including a Perfect-day badge.

### Pillar 2 — Journal (tethered to habits)

- **One daily entry.** The app **asks guided questions** about the day (seeded by that day's habit
  results), with an **optional free-write** box underneath.
- The "why did you fall short?" reflection from Pillar 1 flows in as one of the seeds — it is *not*
  a separate feature.
- **Must store and let you re-read past entries** — introspection only pays off if you can look
  back and spot patterns.

### Pillar 3 — Daily Planning

- An **ordered to-do list** for tomorrow — a mental map of the day. **No clock, no time-blocking**
  (explicitly avoiding the calendar swamp).
- The list **auto-includes tomorrow's daily habits**; the user **adds ad-hoc tasks** on top
  ("call mom").

---

## 7. Platform & Accounts

- **Platform (v1): Desktop-web-first.** Rationale: the charter is learning-first, and web
  fundamentals are the foundation everything (including a future Android app) builds on.
  - *Cheap insurance:* keep the layout responsive enough not to break on a phone browser, since the
    author will realistically use it on mobile before an Android app exists. Not a mobile-*first*
    build.
- **Accounts (v1): Genuine multi-user.** Real signup/login with per-user data isolation. Justified
  by (a) portfolio value, (b) auth being an explicit learning goal, (c) it being costly to retrofit
  and cheap to bake in, and (d) enabling the future social feature.

---

## 8. Key Decisions Log (with rationale & tradeoffs)

| Decision | Choice | Rationale / Tradeoff |
|---|---|---|
| Spine | Habit tracker | Journaling & planning only make sense in service of habits |
| Journaling style | Guided prompts + optional free-write | Tethered to habits; not a blank diary |
| Planning style | Ordered list, no time-blocks | Avoids building a calendar app |
| Scheduling | Daily only | Covers ~90% of real habits; one clean engine |
| Auto-ramp / deload | **Backlog** | Beautiful but heavy; the *philosophy* (4 states, reflection) survives without the *machinery* |
| Identity system | **Backlog** | Second elaborate subsystem; defer to ship a real core |
| **Editing past days** | **Full free edit, unmarked (pure C)** | Trust-the-user, no nanny. **Tradeoff (accepted):** streak becomes an **honor-system** number, trusted not enforced. *Flagged as revisitable.* |
| Platform | Desktop-web-first | Learning-first charter |
| Accounts | Multi-user auth | Portfolio + learning + enables social |
| Success metric | Learning + daily use (retention-of-self) | Honest, behavioural, non-vanity |

---

## 9. Non-Goals (the fence)

v1 — and arguably the product — consciously refuses to be:

- ❌ **A blank-page diary** — journaling is tethered and guided.
- ❌ **A perfectionism tracker** — never demands 100% daily.
- ❌ **A calendar / time-blocker** — planning is an ordered list, no clock.
- ❌ **A productivity suite (Notion-like)** — three tight pillars, not everything.
- ❌ **A cheap-dopamine, gamified farming app** — gamification must be *meaningful* (progress,
  identity), never manipulative (no fake urgency, guilt-trip streak-anxiety, or points-for-points).

---

## 10. Backlog — the "Ascension" roadmap

Explicitly *out of v1*, to be slotted on top of the core later:

- **Auto-ramp / deload engine** — targets escalate after success (+5–10 min/day); deload to ~50%
  after a multi-day miss, depth scaling with days missed; ramp back up quickly.
- **Emergent identity system** — soft-declared direction + behaviour-observed identities (Engineer,
  Polymath, Athlete…), with a habit **category taxonomy** to power it.
- **Time-budget** — allocate ~10 productive hours/day across habits (e.g. 5h study / 3h project /
  2h gym).
- **Richer scheduling** — specific weekdays, frequency/quota ("3×/week"), multiple-times-per-day.
- **Reminders / push notifications** (likely needs PWA).
- **Social / accountability partners** — connect with people who share habits; watch each other's
  streaks for mutual motivation.
- **Android app + cross-device sync.**
- **AI pattern-detection** — the app surfaces patterns from journal entries & habit history.

---

## 11. Constraints & Assumptions

- **Tech stack (v1):** **Next.js full-stack** (App Router) / React / TypeScript / Tailwind /
  shadcn; Prisma / PostgreSQL; Auth.js (authentication); Zod (validation); Vitest + Playwright
  (testing); Docker / GitHub Actions / Vercel / Railway (deployment).
  - *Architecture decision (ADR-001): a separate **NestJS** backend (in the original charter) is
    **deferred**. Next.js owns UI, API, data, and auth in one app — simpler, and keeps learning
    focused on one framework. NestJS can be introduced later as a deliberate learning exercise.*
- **Single real user initially**, but built multi-user from day one.
- **Learning is the primary objective** — favour clarity and understanding over speed.

---

## 12. Open Questions (for the architecture phase)

1. Exact threshold values: *Showed Up* vs *Success* boundary (60% / 70% / 80%?), stagnation
   trigger (4 / 5 / 6 days?).
2. Is the **stagnation guard** in v1 or backlog?
3. Do binary habits ever show a *Showed Up* state, or are they strictly Missed/Success?
4. How exactly does a user set & raise a quantitative habit's target (UI & rules)?
5. Content & trigger rules for reassurance messages.
6. Should the pure-C editable-history decision carry any *optional* honesty signal later, or stay
   fully unmarked?
