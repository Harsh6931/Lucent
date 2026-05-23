# Lucent PRD (Product Requirements Document)

## 1) Product Summary
Lucent is a free AI spend audit web app for startup founders and engineering managers.  
Users input their AI tools, plans, spend, and usage context, then receive an instant, defensible savings audit with recommended actions.

## 2) What Lucent Does
- Identifies overspend in AI tooling stacks.
- Recommends better-fit plans and alternatives.
- Quantifies monthly and annual savings.
- Generates a personalized summary.
- Captures leads only after value is shown.
- Produces a shareable public result URL (PII stripped).

## 3) Why It Matters
- Users get immediate cost clarity and practical actions.
- Teams avoid silent tooling budget creep.
- Credex gets qualified, high-intent leads from verified savings opportunities.

## 4) Tech Stack (Selected)
- [x] **App framework:** Next.js 15 (App Router) + TypeScript
- [ ] **UI:** Tailwind CSS + shadcn/ui
- [ ] **Forms/validation:** React Hook Form + Zod
- [ ] **Database/backend:** Supabase (Postgres)
- [ ] **Email:** Resend
- [ ] **AI summary:** Anthropic API (fallback to templated summary)
- [ ] **Abuse protection:** Cloudflare Turnstile (or honeypot + rate limit fallback)
- [ ] **Testing:** Vitest + Testing Library
- [ ] **Quality:** ESLint + Prettier
- [ ] **Deployment:** Vercel

## 5) Functional Requirements (MVP)
### R1. Spend Input Form
- [x] Support tools/plans from assignment:
  - Cursor (Hobby/Pro/Business/Enterprise)
  - GitHub Copilot (Individual/Business/Enterprise)
  - Claude (Free/Pro/Max/Team/Enterprise/API direct)
  - ChatGPT (Plus/Team/Enterprise/API direct)
  - Anthropic API direct
  - OpenAI API direct
  - Gemini (Pro/Ultra/API)
  - Windsurf or v0
- [x] Per tool: plan, monthly spend, seats.
- [x] Global: team size, primary use case.
- [ ] Persist form state across reloads.

### R2. Audit Engine
- [ ] Deterministic, rule-based engine (no AI for core math).
- [ ] Evaluate plan fit, same-vendor downgrade, alternative switch, and credit opportunity.
- [ ] Output per-tool recommendation with reason and savings.
- [ ] Output total monthly and annual savings.
- [ ] Honest handling for low/no-savings results.

### R3. Audit Results Page
- [x] Hero values: total monthly + annual savings.
- [x] Per-tool breakdown (current -> action -> savings -> reason).
- [ ] Conditional CTA:
  - [x] Savings > $500/mo: strong Credex consultation CTA.
  - [x] Savings < $100/mo or optimal: honest "you’re spending well" + notify CTA.

### R4. Personalized AI Summary
- [ ] Generate ~100-word summary from audit output.
- [ ] Graceful failure handling with fallback template.

### R5. Lead Capture + Storage
- [x] Capture email (+ optional company/role/team size).
- [ ] Store in real backend DB.
- [ ] Send transactional confirmation email.
- [ ] Add abuse protection (Turnstile/honeypot/rate limit).

### R6. Shareable Result URL
- [ ] Unique public URL per audit.
- [x] Public view excludes PII.
- [ ] Open Graph + Twitter card metadata.

### R7. Guaranteed UX Enhancements (Committed)
- [x] **Quick Start Presets** on homepage form:
  - [x] Solo founder preset
  - [x] 5-seat engineering team preset
  - [x] 20-seat mixed team preset
- [x] **Priority Action Queue** on results page:
  - [x] Top recommendations sorted by highest monthly savings first
  - [x] Tie-breaker by implementation ease (quick wins first)
- [x] **Savings Confidence Meter** per recommendation:
  - [x] High / Medium / Low confidence label
  - [ ] Assumption note shown for Medium/Low confidence items

## 6) Step-by-Step Implementation Checklist (Execution Order)
### Phase A: Setup and Foundations
- [x] Initialize Next.js + TypeScript + Tailwind + shadcn/ui project.
- [ ] Configure linting/formatting (ESLint + Prettier).
- [ ] Define TypeScript domain models and Zod schemas.
- [x] Add environment variable contract and `.env.example`.

### Phase B: Pricing and Audit Core
- [x] Create centralized pricing source file(s) mapped to official vendor pages.
- [ ] Write `PRICING_DATA.md` with URLs and verification dates.
- [ ] Implement audit calculation engine as pure functions.
- [ ] Implement recommendation reason templates.
- [ ] Write minimum 5 automated audit-engine tests.
- [ ] Document tests in `TESTS.md`.

### Phase C: Product UX (Form -> Result)
- [x] Build spend input form UI for all required tools/plans.
- [ ] Add client-side persistence (local storage).
- [x] Implement audit submit flow and result rendering.
- [x] Build hero savings section + per-tool breakdown UI.
- [x] Implement conditional CTA blocks by savings band.
- [x] Add Quick Start Presets to auto-fill realistic baseline stacks.

### Phase D: AI Summary + Lead Flow
- [ ] Implement summary API route with Anthropic call.
- [ ] Add timeout/retry policy and deterministic fallback.
- [ ] Document prompts/fallback strategy in `PROMPTS.md`.
- [x] Build lead capture form (post-results only).
- [ ] Persist leads and audits in Supabase.
- [ ] Integrate transactional email via Resend.

### Phase D2: Database + Backend Implementation (Next Priority)
- [x] Prepare Supabase env var contract (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- [x] Add SQL migration for `audits`, `leads`, and optional `events` tables.
- [x] Add backend data access layer (`lib/db/*`) with typed insert/select helpers.
- [ ] Implement `POST /api/audit` (persist audit and return `{id, public_id}`).
- [ ] Implement `GET /api/audit/:id` (private audit fetch for result page).
- [ ] Implement `POST /api/lead` (persist lead linked to `audit_id`).
- [ ] Implement `GET /api/report/:publicId` (PII-free public payload).
- [ ] Add server-side validation (Zod) for all API request bodies.
- [ ] Add error model + response codes (400 validation, 404 not found, 429 rate-limited, 500 unexpected).
- [ ] Add basic abuse protection on APIs (honeypot or IP rate limit).

### Phase E: Public Report and Growth Loop
- [ ] Generate unique `public_id` per audit.
- [x] Create public report route (`/r/[publicId]`) with PII stripping.
- [ ] Implement Open Graph + Twitter metadata for share URLs.

### Phase F: Reliability, Quality, and Launch
- [ ] Add abuse protection (Turnstile or honeypot + per-IP limit).
- [ ] Configure GitHub Actions workflow at `.github/workflows/ci.yml`.
- [ ] Ensure CI runs lint + tests on push to `main`.
- [ ] Perform mobile/accessibility/performance polish.
- [ ] Run Lighthouse and fix major issues to target thresholds.
- [ ] Deploy to Vercel.
- [ ] Perform end-to-end production validation.

### Phase G: Assignment Deliverables
- [ ] Finalize `README.md` (summary, quick start, decisions, deployed URL, media links).
- [ ] Finalize `ARCHITECTURE.md` (diagram, data flow, scale plan).
- [ ] Maintain `DEVLOG.md` daily for 7 days using exact format.
- [ ] Finalize `REFLECTION.md` (all 5 required answers).
- [ ] Finalize entrepreneurial docs: `GTM.md`, `ECONOMICS.md`, `USER_INTERVIEWS.md`, `LANDING_COPY.md`, `METRICS.md`.
- [ ] Validate git history across 5+ distinct days in 7-day window.

### Phase H: Guaranteed Enhancements Delivery
- [x] Add Priority Action Queue section on `/audit/[id]`.
- [x] Add confidence labels (High/Medium/Low) on each recommendation row/card.
- [ ] Ensure confidence logic aligns with `AUDIT_LOGIC_POLICY.md`.

## 7) Expected Output by Savings Band
- [x] **High savings (> $500/mo):** strong optimization report + consultation CTA.
- [x] **Medium savings ($100-$500/mo):** prioritized action plan + soft consultation CTA.
- [x] **Low savings (< $100/mo):** honest "already efficient" message + notify CTA.
- [ ] **Near-optimal stack:** mostly keep recommendations with periodic re-audit suggestion.
- [ ] **AI API failure case:** fallback summary visible; core audit unaffected.

## 8) Acceptance Criteria (Definition of Done)
- [ ] All six assignment MVP features work on deployed URL.
- [ ] Form state persists across reloads.
- [ ] Audit logic is explainable and numerically consistent.
- [ ] Personalized summary works with graceful fallback.
- [ ] Leads are stored and confirmation emails send successfully.
- [x] Share page is public, clean, and PII-free.
- [ ] At least 5 audit-engine tests pass.
- [ ] CI is green on latest `main` commit.
- [x] Quick Start Presets work and correctly prefill the form.
- [x] Priority Action Queue appears with correctly sorted top actions.
- [ ] Confidence labels are visible and consistent with recommendation assumptions.
- [ ] Audit and lead records are created in Supabase for successful flows.
- [ ] Public report API never exposes email/company/role fields.
- [ ] API routes are validated, typed, and return stable error responses.

## 9) Additional Features (Optional, End of Project)
- [ ] 30-day re-audit reminder email opt-in.
- [ ] Report diff view (current audit vs previous audit).
- [ ] PDF export for stakeholder sharing.
- [ ] Benchmark mode (spend per developer vs peer range).
