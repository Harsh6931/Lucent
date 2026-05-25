# TESTS

## Automated Tests

> Minimum assignment requirement: 5 tests covering the audit engine specifically. We have implemented 6 comprehensive unit tests.

### 1. Plan-Fit Downgrade Recommendations
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Recommends cheaper same-vendor options when user plans are over-tiered for their actual seat count (e.g. Cursor Business plan downgrade to Pro).
- **Run command:** `npm.cmd run test`

### 2. Honest Savings Behavior
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Verifies that the engine behaves honestly and does not fabricate fake savings or force switch actions when the user's stack is already optimal (e.g. Copilot Individual at $10/seat).
- **Run command:** `npm.cmd run test`

### 3. Savings Totals Aggregation
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Verifies monthly savings from individual tools are aggregated correctly and that annual savings are exactly `total_monthly_savings * 12`.
- **Run command:** `npm.cmd run test`

### 4. Non-Negative Savings Guardrail
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Ensures that no tool calculation ever yields negative monthly savings under any input condition.
- **Run command:** `npm.cmd run test`

### 5. Confidence Level Assignment
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Confirms that each tool recommendation is assigned a valid confidence label (`high`, `medium`, or `low`).
- **Run command:** `npm.cmd run test`

### 6. Confidence Assumption Notes
- **Filename:** [engine.test.ts](file:///d:/COMPUTER%20SCIENCE/Lucent/lib/audit/engine.test.ts)
- **Covers:** Confirms that descriptive assumption notes are generated and attached when a recommendation is labeled with low or medium confidence (e.g., zero spend reported or usage-based api pricing).
- **Run command:** `npm.cmd run test`
