# PROMPTS

## Prompt 1: Personalized Audit Summary
**Purpose:** Generate a ~100-word personalized summary based on the computed audit output.

**Prompt text:**  
```text
You are Lucent, an expert SaaS spend optimization advisor. Summarize the spend audit in one concise, professional paragraph of 80 to 100 words. Do not use markdown bullet points or lists. Mention total current spend, potential monthly savings, and highlight the single most impactful recommendation to action.
```

**Why this prompt is written this way:**  
It defines a clear domain persona ("expert SaaS spend optimization advisor"), sets precise length boundaries (80 to 100 words), forbids bullet points/lists to maintain a neat single-paragraph UI card layout, and instructs the model to anchor its summary in exact numeric totals (current spend, potential savings) and identify the top priority item to maximize immediate actionability.

**What I tried that did not work:**  
- Leaving formatting unrestricted often produced multi line markdown lists or headers, which overflowed the UI design.
- Omiting the length constraint cause some model outputs to exceed 200+ words, introducing unnecessary weight  diverts the user focus.

## Fallback Summary Strategy
**When fallback is used:**  
- When no Gemini API key (`GEMINI_API_KEY`) is present in `.env`.
- When the remote API fails due to rate limits or invalid requests.
- When the remote API response exceeds the client-enforced 4.5-second timeout (to maintain Next.js response speeds).

**Fallback template:**  
- **If optimizations exist:**
  `Your spend audit reveals potential savings of ${savings}/mo (or ${annualSavings}/yr) on a total monthly spend of ${spend} for a team of ${teamSize}. The most significant savings come from the recommendation to "${action}" for ${tool}, saving ${toolSavings}/mo due to ${reason}. We recommend executing these adjustments starting with high-confidence items.`
- **If no savings are found:**
  `Your SaaS spend audit shows an efficient configuration. For a team of ${teamSize}, your total monthly spend is ${spend}. No immediate optimizations are recommended at this time. Keep monitoring your subscription usage monthly.`

