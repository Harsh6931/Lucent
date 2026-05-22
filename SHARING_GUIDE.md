# Lucent Sharing Guide

## Commit/Upload to GitHub (Yes)
- All source code and UI files.
- All assignment-required markdown files at repo root.
- `.github/workflows/ci.yml`
- `package.json`, configs, and lockfile.
- `.env.example` (template only, no real secrets).

## Never Commit/Share Publicly (No)
- `.env` and any real secret-containing env files.
- API keys/tokens:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ANTHROPIC_API_KEY`
  - `OPENAI_API_KEY`
  - `RESEND_API_KEY`
  - `TURNSTILE_SECRET_KEY`
- Production DB credentials.
- Any PII exports or raw lead dumps.

## Assignment-Critical Root Files (Must Exist)
- `README.md`
- `ARCHITECTURE.md`
- `DEVLOG.md`
- `REFLECTION.md`
- `TESTS.md`
- `PRICING_DATA.md`
- `PROMPTS.md`
- `GTM.md`
- `ECONOMICS.md`
- `USER_INTERVIEWS.md`
- `LANDING_COPY.md`
- `METRICS.md`

## Pre-Push Safety Check
1. Ensure `.env*` (except `.env.example`) are ignored.
2. Search repo for accidental secrets before push.
3. Confirm required root files are present.

