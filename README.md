# Lucent

## Summary
Lucent is a free AI spend audit web app for startup founders and engineering managers.  
It captures team/tooling inputs, runs a deterministic audit engine, stores results in a real backend, and returns a shareable PII-safe report with actionable savings recommendations.

## Database Integration & Setup Screenshots
- **Supabase Project Credentials Setup**: [supabase_api_keys.png](file:///d:/COMPUTER%20SCIENCE/Lucent/public/screenshots/supabase_api_keys.png)
  ![Supabase Project Credentials Setup](/public/screenshots/supabase_api_keys.png)
- **Database Schema Migration Run**: [supabase_migration_success.png](file:///d:/COMPUTER%20SCIENCE/Lucent/public/screenshots/supabase_migration_success.png)
  ![Database Schema Migration Run](/public/screenshots/supabase_migration_success.png)
- **Supabase Dashboard RLS Check**: [supabase_rls_prompt.png](file:///d:/COMPUTER%20SCIENCE/Lucent/public/screenshots/supabase_rls_prompt.png)
  ![Supabase Dashboard RLS Check](/public/screenshots/supabase_rls_prompt.png)

## Quick Start
### Install
```bash
npm.cmd install
```

### Run locally
```bash
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000)

If port 3000 is busy:
```bash
npm.cmd run dev -- -p 3001
```

### Deploy
1. Create a Vercel project and import this GitHub repository.
2. Add environment variables from `.env.example` in Vercel Project Settings.
3. Deploy and verify `/`, `/audit/[id]`, and `/r/[publicId]` flows.

## Decisions (5 Trade-offs)
1. **Single-repo Next.js architecture over split frontend/backend repos:** faster execution and easier evaluator readability in a 7-day window.
2. **Rule-based audit logic over LLM-driven cost math:** deterministic outputs are testable, finance-defensible, and easier to debug.
3. **Lead capture after showing value:** aligns with assignment requirement and improves trust/conversion quality.
4. **Public share route with strict PII stripping:** supports virality while reducing accidental data exposure risk.
5. **Backend-first persistence with Supabase:** practical path to real storage and production-ready CRUD without overbuilding infrastructure.

## Deployed URL
[https://lucent-spend.vercel.app](https://lucent-spend.vercel.app) *(Note: Please update this with your actual live Vercel URL after deployment)*
