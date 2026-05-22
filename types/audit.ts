export type PrimaryUseCase = "coding" | "writing" | "data" | "research" | "mixed";

export type ToolKey =
  | "cursor"
  | "copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf_or_v0";

export type ConfidenceLevel = "high" | "medium" | "low";

export type ToolInput = {
  key: ToolKey;
  plan: string;
  monthlySpend: number;
  seats: number;
};

export type AuditInput = {
  teamSize: number;
  primaryUseCase: PrimaryUseCase;
  tools: ToolInput[];
};

export type Recommendation = {
  tool: string;
  currentPlan: string;
  action: string;
  reason: string;
  currentMonthly: number;
  projectedMonthly: number;
  monthlySavings: number;
  confidence: ConfidenceLevel;
  implementationEffort: "quick" | "moderate";
};
