# Lucent Audit Logic Policy

## 1) Purpose
This policy defines how Lucent computes recommendations and savings so outputs are consistent, transparent, and finance-defensible.

## 2) Core Principles
1. Deterministic first: core savings math is rule-based, never LLM-generated.
2. Evidence-backed: all price assumptions map to `PRICING_DATA.md` source URLs.
3. Honest outputs: no fabricated savings when stack is already efficient.
4. Explainability: every recommendation must include a one-sentence reason.
5. Conservative assumptions: when inputs are incomplete, use lower-confidence recommendations and clearly label assumptions.

## 3) Required Inputs
- Tool name
- Current plan
- Monthly spend (user-provided)
- Seats
- Team size
- Primary use case (`coding`, `writing`, `data`, `research`, `mixed`)

## 4) Normalization Rules
1. Convert all prices to USD monthly equivalents.
2. Parse seat-based plans as: `expected_cost = plan_price_per_seat * seats`.
3. Parse fixed-team plans using documented constraints.
4. For API/direct usage tools, compare against user-provided monthly API spend.
5. If user-entered spend is missing or zero for a paid plan, mark entry as incomplete and skip strict savings claims.

## 5) Evaluation Sequence (Per Tool)
Run in this order and keep first valid highest-confidence recommendation:

1. **Plan-Fit Check**
   - Detect over-tiering (example: team/business plan used for very small seat count without matching need).
   - If lower plan satisfies likely usage fit, propose downgrade.

2. **Same-Vendor Cheaper Option**
   - Compare with cheaper plans from same vendor.
   - Recommend only when capability fit remains acceptable for stated use case.

3. **Cross-Vendor Alternative**
   - Compare with functionally similar tools for user use case.
   - Recommend switch only when estimated savings is meaningful and capability loss is not material.

4. **Credit Opportunity Check**
   - If user likely pays retail where credits can reduce effective spend, estimate incremental savings opportunity.

## 6) Savings Math
For each tool:
- `current_monthly = user_reported_monthly_spend`
- `recommended_monthly = modeled_recommended_cost`
- `monthly_savings = max(current_monthly - recommended_monthly, 0)`
- `annual_savings = monthly_savings * 12`

Totals:
- `total_monthly_savings = sum(monthly_savings per tool)`
- `total_annual_savings = total_monthly_savings * 12`

Rounding:
- Store numeric values with 2 decimals.
- Display as currency rounded to nearest cent.

## 7) Recommendation Bands
### High Savings
- Condition: `total_monthly_savings > 500`
- Output:
  - Priority actions list (top 1-3 changes).
  - High-intent CTA: Credex consultation.

### Medium Savings
- Condition: `100 <= total_monthly_savings <= 500`
- Output:
  - Practical action order (quick wins first).
  - Soft consultation CTA.

### Low/No Savings
- Condition: `total_monthly_savings < 100`
- Output:
  - Explicit honesty: spending appears efficient.
  - Optional “notify me on new optimizations/pricing changes”.

## 8) Confidence Scoring
Each per-tool recommendation gets a confidence label:
- **High**: complete inputs + direct same-vendor pricing comparison.
- **Medium**: complete inputs + cross-vendor mapping with mild assumptions.
- **Low**: incomplete inputs or unclear plan constraints.

Low-confidence recommendations must include an assumptions note.

## 9) Reason String Standard
Each recommendation reason must follow:
`Current setup -> Why mismatch/inefficiency -> Recommended action -> Estimated savings impact`

Example pattern:
`You are on [Plan A] for [N seats], but [Plan B] covers your likely usage at lower cost; switching can reduce spend by about [$X/month].`

## 10) Guardrails
1. Never output negative savings.
2. Never force cross-vendor switch if no clear cost advantage.
3. Never hide uncertainty; label assumptions explicitly.
4. Never include personal identifiers in public share payload.
5. Never claim credit-based savings without documented basis.

## 11) Failure Handling
1. If pricing entry missing for a plan/tool, mark recommendation as `insufficient pricing data`.
2. If input validation fails, block audit and return field-specific errors.
3. If summary AI call fails, keep audit results and show deterministic fallback summary.

## 12) Test Coverage Policy (Minimum)
At least these 5 audit-engine tests must exist:
1. Correct downgrade recommendation for over-tiered plan.
2. Correct same-vendor cheaper-plan recommendation.
3. Correct cross-vendor recommendation only when meaningful savings exists.
4. Honest low/no-savings output path.
5. Correct total monthly and annual savings aggregation.

