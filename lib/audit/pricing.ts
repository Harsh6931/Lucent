import { ToolKey } from "@/types/audit";

export const MONTHLY_PLAN_PRICE: Record<ToolKey, Record<string, number>> = {
  cursor: { Hobby: 0, Pro: 20, Business: 40, Enterprise: 60 },
  copilot: { Individual: 10, Business: 19, Enterprise: 39 },
  claude: { Free: 0, Pro: 20, Max: 100, Team: 30, Enterprise: 60, "API direct": 0 },
  chatgpt: { Plus: 20, Team: 30, Enterprise: 60, "API direct": 0 },
  anthropic_api: { "Usage-based": 0 },
  openai_api: { "Usage-based": 0 },
  gemini: { Pro: 20, Ultra: 50, API: 0 },
  windsurf_or_v0: { Free: 0, Pro: 15, Team: 30 }
};

export const ALTERNATIVE_BY_USE_CASE: Record<
  "coding" | "writing" | "data" | "research" | "mixed",
  { preferredTool: ToolKey; targetPlan: string; estimatedMonthly: number }
> = {
  coding: { preferredTool: "copilot", targetPlan: "Individual", estimatedMonthly: 10 },
  writing: { preferredTool: "chatgpt", targetPlan: "Plus", estimatedMonthly: 20 },
  data: { preferredTool: "chatgpt", targetPlan: "API direct", estimatedMonthly: 30 },
  research: { preferredTool: "claude", targetPlan: "Pro", estimatedMonthly: 20 },
  mixed: { preferredTool: "chatgpt", targetPlan: "Plus", estimatedMonthly: 20 }
};

