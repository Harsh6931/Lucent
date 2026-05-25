# METRICS

## 1. Single North Star Metric
- **Metric**: **Total Annualized SaaS Savings Identified (USD)**.
- **Why**: This represents the exact value delivered by Lucent to its users. If we identify meaningful cost savings for tech founders, they are highly incentivized to proceed down the funnel (lead capture, consultation booking, credit purchasing), share their scorecard with peer founders, and return to audit their stacks in future cycles.

## 2. Three Input Metrics
To drive the North Star Metric, we measure and optimize these three leading inputs:
1. **Monthly Active Audits Completed (Volume)**: The absolute number of unique sessions that complete and submit the audit form. Higher volume broadens the top of the funnel.
2. **Average Number of Tools Audited per Session (Depth)**: Startups using more tools have a higher chance of plan mismatches and double-licensing. Auditing 4+ tools (e.g. Cursor, Copilot, ChatGPT, and APIs) dramatically increases identified waste.
3. **High-Savings Handoff Rate (Quality)**: The percentage of completed audits that yield >$500/mo in savings and convert to lead submissions or booking clicks.

## 3. First Instrumentation Events
We will implement custom event tracking (telemetry) for these user touchpoints:
- `audit_started`: Fired when a visitor inputs the first tool or plan selection. (Tracks dropoff before form completion).
- `audit_completed`: Fired when the audit is computed and stored. Payload contains: `team_size`, `primary_use_case`, `total_monthly_spend`, `total_monthly_savings`, `number_of_tools`.
- `lead_captured`: Fired when the lead form is submitted. Payload: `role`, `company_name` (if provided).
- `consultation_booked`: Fired when the user clicks the "Book Consultation" button.
- `report_shared`: Fired when the user copies the public share URL to their clipboard.

## 4. Pivot-Trigger Threshold
- **Threshold**: **If after 150 completed audits, we receive fewer than 2 booked consultations (handoff conversion rate < 1.33%)**.
- **Pivot Action**: If we fail this conversion, it means founders do not trust a direct "Consultation" call or their spend is too small for standard advisory. We will pivot our CTA from booking a live call to:
  1. Offering a downloadable, custom PDF Spend Optimization Report.
  2. Providing direct, single-use coupon codes for Credex bulk credit purchases.
