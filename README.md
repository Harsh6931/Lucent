# Lucent

> **Audit your team's AI spend. Uncover hidden SaaS savings.**

Lucent is a free, no-login AI spend audit platform for startup founders, CTOs, and engineering managers. Enter your AI tool stack, run a 2-minute dynamic audit, and receive a shareable report with actionable savings recommendations.

<p>
  <a href="https://lucent-rose.vercel.app">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-lucent--rose.vercel.app-0d9488?style=for-the-badge&labelColor=0f172a" alt="Live Demo" />
  </a>
</p>

---

## ✨ Features

- **Instant AI Spend Audit** — Fill in your tool stack (Cursor, Copilot, Claude, ChatGPT, APIs) and get a deterministic savings analysis in seconds
- **No Account Required** — Zero friction: no sign-up, no passwords, no login walls
- **Shareable Reports** — Generate a unique public link (`/r/[id]`) with all PII automatically stripped
- **AI-Powered Summaries** — Gemini generates a human-readable narrative summary alongside the rule-based calculations
- **Lead Capture (Post-Value)** — Optional email collection only after the user has seen their full results
- **Responsive & Accessible** — Optimized for desktop and mobile with modern UI/UX

---

## 🛠 Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)  |
| Language       | TypeScript                          |
| Styling        | Tailwind CSS                        |
| Database       | Supabase (PostgreSQL + RLS)         |
| AI Provider    | Google Gemini API                   |
| Email          | Resend                              |
| Hosting        | Vercel                              |
| Validation     | Zod                                 |
| Analytics      | Vercel Analytics                    |

---

## 📁 Project Structure

```
lucent/
├── app/
│   ├── api/              # API routes (audit, lead, report, summary)
│   ├── audit/[id]/       # Dynamic audit results page
│   ├── book/             # Consultation booking page
│   ├── privacy/          # Privacy policy
│   ├── r/[publicId]/     # Public shareable report
│   ├── terms/            # Terms of service
│   ├── layout.tsx        # Root layout with metadata & fonts
│   └── page.tsx          # Landing page with FAQ & How It Works
├── components/
│   ├── audit/            # Audit-specific UI components
│   ├── layout/           # Header & Footer
│   └── ui/               # Reusable UI components (Logo, etc.)
├── lib/
│   ├── api/              # API client utilities
│   ├── audit/            # Audit engine & calculation logic
│   ├── constants/        # Routes, pricing data
│   ├── db/               # Supabase client & queries
│   ├── schemas/          # Zod validation schemas
│   └── utils/            # Shared helpers
├── supabase/             # Database migrations
└── types/                # TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key

### 1. Clone & Install

```bash
git clone https://github.com/Harsh6931/Lucent.git
cd Lucent
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

| Variable                         | Description                        |
| -------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_APP_URL`            | Your app URL (default: `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase project URL               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Supabase anonymous key             |
| `SUPABASE_SERVICE_ROLE_KEY`      | Supabase service role key          |
| `GEMINI_API_KEY`                 | Google Gemini API key              |
| `RESEND_API_KEY`                 | Resend email API key               |
| `RESEND_FROM_EMAIL`              | Sender email address               |

### 3. Run Database Migrations

Apply the Supabase schema migrations from the `supabase/` directory to your project.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Create production build            |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint checks                  |
| `npm run test`    | Run Vitest test suite              |

---

## 🌐 Deployment

1. Import this repository into [Vercel](https://vercel.com)
2. Add all environment variables from `.env.example` in the Vercel project settings
3. Deploy — Vercel auto-detects the Next.js framework
4. Verify the audit flow: `/` → `/audit/[id]` → `/r/[publicId]`

---

## 🏗 Architecture Decisions

| Decision | Rationale |
| --- | --- |
| **Single-repo Next.js** | Unified frontend + API layer for faster iteration and simpler deployment |
| **Rule-based audit engine** | Deterministic, testable, and finance-defensible — no LLM hallucination in cost math |
| **AI summaries via Gemini** | Human-readable narrative layer on top of deterministic numbers |
| **Lead capture after value** | Users see full results first, building trust before optional email collection |
| **PII-stripped public links** | Enables sharing while protecting sensitive business data |

---

## 📄 License

This project is private and proprietary.

---

<p align="center">
  Built with ☕ and purpose by <strong>Harshit</strong>
</p>
