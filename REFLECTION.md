# REFLECTION

## 1) The hardest bug I hit this week, and how I debugged it
The most challenging issue occurred during the transition to Next.js 15, specifically regarding the handling of dynamic route parameters (`params`) in both API routes and client-facing pages. In Next.js 15, `params` and `searchParams` are now asynchronous Promises instead of plain objects. Accessing properties like `params.id` synchronously led to compilation errors, runtime warnings, and static page generation crashes during the Next.js production build process.

To resolve this, I thoroughly inspected the Next.js 15 migration guide and updated our architecture to handle route parameters asynchronously. 
- In client page components (such as `/audit/[id]`), I imported the `React.use()` hook to unwrap the dynamic route parameter promise directly in the render phase.
- In server-side API routes, I converted handlers to async functions and resolved the parameters via `const { id } = await params` before executing any database repository queries.
- For the report share route (`/r/[publicId]`), I refactored the entire file from a client component into a Next.js Server Component to allow async parameter unwrapping and server-side metadata generation. 

This approach eliminated all compilation and hydration warnings, ensuring a clean static generation build with zero errors.

## 2) A decision I reversed mid-week, and why
The decision i reversed first was a change of UI plan in middle to something simple and plain in order to highlight the core of the build more prominently to the visitor.
Mid-week, I also reversed the implementation strategy for the public report share page (`/r/[publicId]`). Originally, the route was coded as a client-side component (`"use client"`) that triggered a secondary `fetch()` request to `/api/report/[publicId]` within a React `useEffect` hook to display the saved SaaS spend figures.

While this worked for standard user interaction, I realized it introduced a major product flaw: it was impossible to inject dynamic social preview metadata (Open Graph and Twitter Card tags). In Next.js, client-side pages cannot export `generateMetadata` functions because metadata must be computed on the server before HTML is sent. Social media crawlers (like Slack, Twitter, and LinkedIn scrapers) do not execute JavaScript; they would only read our generic homepage tags, showing no savings figures to external viewers.

I reversed this decision and refactored `/r/[publicId]/page.tsx` into a Server Component. It now queries the database directly using `getAuditByPublicId` on the server and exports a dynamic `generateMetadata` function that embeds calculated savings directly into the HTML headers. The rendering UI logic was separated into a clean, lightweight child component `PublicReportClient.tsx`. This change not only fixed the SEO and social previews but also eliminated the client-side loading spinner, providing an instantaneous page load for users.

## 3) What I would build in week 2 if I had it
If given a second week, I would focus on three major upgrades:
1. **Automated Integrations via SSO and Extensions**: Instead of relying purely on manual spend inputs, I would build a Chrome Extension that reads session active licenses, or integrations with Google Workspace / Okta SSO. This would automatically discover active SaaS subscriptions, seats, and monthly spend, removing user input friction.
2. **On-the-Fly Social Card Generation**: I would implement dynamic Open Graph image generation using `@vercel/og` (Satori). This would dynamically build a personalized visual graphic card showing a customized waste graph (e.g. *"Lucent Audits: Startup saved $4,200/yr"*) to post directly on LinkedIn/Twitter when sharing links.
3. **Continuous spend monitoring and alert jobs**: Create weekly/monthly background check cron tasks that review team size changes in the database and email the founder (using Resend) if new cost optimizations or vendor pricing updates arise.

## 4) How I used AI tools
I utilized the Antigravity AI pair programming assistant to accelerate development across the stack:
- **Scaffolding and Types**: AI generated the Next.js boilerplate, Zod input validation schemas, and database interface repositories.
- **Refactoring & Optimization**: AI helped consolidate duplicated AI routes in `app/api/summary/route.ts` by extracting a reusable `callAI()` utility. It also implemented the `AbortController` timeout logic, ensuring high-latency AI calls do not block Vercel serverless execution.
- **Unit Testing**: AI drafted the initial test suite in `lib/audit/engine.test.ts`, allowing me to focus on adding custom assertions for the newly introduced confidence assumption notes.
- **Research**: I used the built-in search tool to pull live pricing data for tools like Cursor and Copilot to confirm rates and construct official links, ensuring our audit recommendations match reality.

## 5) Self-rating (1-10) with one-sentence reason each
- **Discipline (9/10)**: Currently on a travel trip still followed the 5 day execution plan step-by-step, committed code incrementally, and ran quality builds after every change.
- **Code quality (7/10)**: Use LLM model and AI agent to write code but at the end try to optimize the code as much as possible also try to refer section of code for future reference.
- **Design sense (8/10)**: Opted for Simple UI to have User focus on main MVP but can apply modern, clean glassmorphic components using a consistent Slate/Blue palette, with  minor additions like interactive graphs would enrich it further.
- **Problem-solving (9/10)**: Handled dynamic API timeouts cleanly with abort triggers and resolved Next.js compilation issues quickly.
- **Entrepreneurial thinking (9/10)**: Structured the funnel to capture leads only *after* showing real financial value, optimizing customer trust and conversion.
