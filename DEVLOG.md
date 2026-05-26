# DEVLOG

## Day 1 -- 2026-05-23
**Hours worked:** 8  
**What I did:** Reviewed assignment requirements and created the full root-file scaffolding expected for AI evaluation (`README.md`, `ARCHITECTURE.md`, `PRICING_DATA.md`, `PROMPTS.md`, GTM/economics/interview docs, etc.). Created `PRD.md` with implementation checklist and acceptance criteria. Built the initial frontend with Next.js + TypeScript using an immediate-audit homepage flow (hero, supported-tools strip, presets, full form, FAQ). Implemented core routes (`/`, `/audit/[id]`, `/r/[publicId]`, `/book`, `/privacy`, `/terms`). Added backend foundation: Supabase env contract, typed DB clients, migration SQL for `audits/leads/events`, audit engine, API routes for audit/report/lead, local draft persistence, and baseline audit-engine tests.  
**What I learned:** Defining deterministic audit policy before API implementation reduced confusion in recommendation logic. Keeping docs and implementation in sync early makes later submission hardening easier. Also confirmed that separating “backend foundation” and “API integration” into different commits keeps history cleaner for review.  
**Blockers / what I'm stuck on:** External service linking is pending (actual Supabase project setup in dashboard, API keys, Resend integration). AI summary endpoint and OG/Twitter dynamic metadata are still pending. Local environment had PowerShell script execution restrictions for `npm` alias, so I used `npm.cmd` explicitly.  
**Plan for tomorrow:** Complete manual platform linking (Supabase + env + migration verification), verify end-to-end DB writes from UI, then implement AI summary API with fallback and connect transactional email flow.

## Day 2 -- 2026-05-26
**Hours worked:** 2  
**What I did:** Completed manual platform linking with Supabase. Verified DB writes for both audits and lead capture submissions directly from the UI. Fixed Next.js 15 async route parameters console errors by implementing `React.use()` on the client pages and `await` on the API routes.  
**What I learned:** Next.js 15 dynamic route `params` are now Promises, requiring async handling. Unwrapping client-side with `use()` is highly performant. Keeping API routes light by using service-role keys to bypass RLS is safe as long as the routes are protected and validate input.  
**Blockers / what I'm stuck on:** None.  
**Plan for tomorrow:** Day 3 features (Confidence Assumption Notes, AI Personalized Summary route, and Resend transactional email integration).

## Day 3 -- 2026-05-26
**Hours worked:** 4  
**What I did:** Implemented confidence assumption notes on engine recommendation logic and updated the recommendation table UI to show them for medium/low confidence items. Created `POST /api/summary` API route with Anthropic/OpenAI support, 4.5s abort timeout, and robust fallback template. Updated the audit page to fetch and render the real AI summary. Integrated Resend in `POST /api/lead` to send transaction lead verification emails in a fail-safe manner. Cleaned up code duplication in route files and fixed potential numeric crash paths.  
**What I learned:** AbortController is highly reliable for managing AI API timeouts. Making transactional emails non-blocking (failing silently but logging) prevents SMTP or API outages from breaking critical lead capture functionality.  
**Blockers / what I'm stuck on:** None.  
**Plan for tomorrow:** Day 4 (Share Metadata + CI + Quality).

## Day 4 -- 2026-05-26
**Hours worked:** 2  
**What I did:** Refactored the public report route `/r/[publicId]` to a Next.js Server Component page that generates dynamic Open Graph and Twitter SEO metadata and queries report data directly from the Supabase database. Delegated rendering to a child client component `PublicReportClient.tsx`, optimizing page load speed and crawler indexing. Updated `.github/workflows/ci.yml` with proper Node setup, dependency installation, lint checks, test suites, and production build checks with mocked env variables.  
**What I learned:** Mixing Server and Client components in Next.js is highly effective: Server Components handle SEO/database operations, and Client Components handle dynamic interactive client logic. Mocking required env vars in CI build steps prevents Next.js compiler environment validation failures.  
**Blockers / what I'm stuck on:** None.  
**Plan for tomorrow:** Day 5 (Hardening final documents, pricing validation, history check, and live Vercel deployment).

## Day 5 -- YYYY-MM-DD
**Hours worked:** X  
**What I did:** ...  
**What I learned:** ...  
**Blockers / what I'm stuck on:** ...  
**Plan for tomorrow:** ...

## Day 6 -- YYYY-MM-DD
**Hours worked:** X  
**What I did:** ...  
**What I learned:** ...  
**Blockers / what I'm stuck on:** ...  
**Plan for tomorrow:** ...

## Day 7 -- YYYY-MM-DD
**Hours worked:** X  
**What I did:** ...  
**What I learned:** ...  
**Blockers / what I'm stuck on:** ...  
**Plan for tomorrow:** ...
