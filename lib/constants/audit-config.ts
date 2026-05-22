import { AuditInput, ToolKey } from "@/types/audit";

export type ToolOption = {
  key: ToolKey;
  label: string;
  plans: string[];
};

export const TOOL_OPTIONS: ToolOption[] = [
  { key: "cursor", label: "Cursor", plans: ["Hobby", "Pro", "Business", "Enterprise"] },
  { key: "copilot", label: "GitHub Copilot", plans: ["Individual", "Business", "Enterprise"] },
  { key: "claude", label: "Claude", plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"] },
  { key: "chatgpt", label: "ChatGPT", plans: ["Plus", "Team", "Enterprise", "API direct"] },
  { key: "anthropic_api", label: "Anthropic API direct", plans: ["Usage-based"] },
  { key: "openai_api", label: "OpenAI API direct", plans: ["Usage-based"] },
  { key: "gemini", label: "Gemini", plans: ["Pro", "Ultra", "API"] },
  { key: "windsurf_or_v0", label: "Windsurf", plans: ["Free", "Pro", "Team"] }
];

export const PRIMARY_USE_CASES: AuditInput["primaryUseCase"][] = [
  "coding",
  "writing",
  "data",
  "research",
  "mixed"
];

export const QUICK_PRESETS: Array<{ id: string; label: string; description: string; payload: AuditInput }> = [
  {
    id: "solo",
    label: "Solo Founder",
    description: "Lean setup for 1 builder",
    payload: {
      teamSize: 1,
      primaryUseCase: "mixed",
      tools: [
        { key: "chatgpt", plan: "Plus", monthlySpend: 20, seats: 1 },
        { key: "cursor", plan: "Pro", monthlySpend: 20, seats: 1 }
      ]
    }
  },
  {
    id: "eng5",
    label: "5-seat Eng Team",
    description: "Coding-heavy startup team",
    payload: {
      teamSize: 5,
      primaryUseCase: "coding",
      tools: [
        { key: "copilot", plan: "Business", monthlySpend: 95, seats: 5 },
        { key: "claude", plan: "Team", monthlySpend: 150, seats: 5 },
        { key: "openai_api", plan: "Usage-based", monthlySpend: 120, seats: 5 }
      ]
    }
  },
  {
    id: "mixed20",
    label: "20-seat Mixed Team",
    description: "Cross-functional AI usage",
    payload: {
      teamSize: 20,
      primaryUseCase: "mixed",
      tools: [
        { key: "chatgpt", plan: "Team", monthlySpend: 600, seats: 20 },
        { key: "cursor", plan: "Business", monthlySpend: 800, seats: 20 },
        { key: "gemini", plan: "API", monthlySpend: 300, seats: 20 }
      ]
    }
  }
];
