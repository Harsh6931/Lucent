import { z } from "zod";

const toolKeySchema = z.enum([
  "cursor",
  "copilot",
  "claude",
  "chatgpt",
  "anthropic_api",
  "openai_api",
  "gemini",
  "windsurf_or_v0"
]);

export const toolInputSchema = z.object({
  key: toolKeySchema,
  plan: z.string().min(1),
  monthlySpend: z.number().min(0),
  seats: z.number().int().min(1)
});

export const auditInputSchema = z.object({
  teamSize: z.number().int().min(1),
  primaryUseCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
  tools: z.array(toolInputSchema).min(1)
});

export const leadInputSchema = z.object({
  auditId: z.string().uuid(),
  email: z.string().email(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().int().min(1).optional(),
  honeypot: z.string().optional()
});

export type AuditInputSchema = z.infer<typeof auditInputSchema>;

