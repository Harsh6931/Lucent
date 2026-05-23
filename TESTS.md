# TESTS

## Automated Tests

> Minimum assignment requirement: 5 tests covering the audit engine specifically.

1. **Filename:** `lib/audit/engine.test.ts`  
   **Covers:** Recommends cheaper same-vendor option for over-tiered plan usage.  
   **Run command:** `npm.cmd run test`

2. **Filename:** `lib/audit/engine.test.ts`  
   **Covers:** Honest low/no-savings behavior (never fabricates negative/forced savings).  
   **Run command:** `npm.cmd run test`

3. **Filename:** `lib/audit/engine.test.ts`  
   **Covers:** Correct aggregation of monthly and annual savings totals.  
   **Run command:** `npm.cmd run test`

4. **Filename:** `lib/audit/engine.test.ts`  
   **Covers:** Guardrail check that savings never become negative.  
   **Run command:** `npm.cmd run test`

5. **Filename:** `lib/audit/engine.test.ts`  
   **Covers:** Recommendation confidence labels are assigned and valid.  
   **Run command:** `npm.cmd run test`
