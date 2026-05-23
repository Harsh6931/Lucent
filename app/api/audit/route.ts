import { runAudit } from "@/lib/audit/engine";
import { fail, ok } from "@/lib/api/response";
import { createAuditRecord } from "@/lib/db/repositories";
import { auditInputSchema } from "@/lib/schemas/audit";
import { generatePublicId } from "@/lib/utils/id";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = auditInputSchema.safeParse(body);
    if (!parsed.success) {
      return fail("VALIDATION_ERROR", "Invalid audit input payload.", 400);
    }

    const input = parsed.data;
    const output = runAudit(input);
    const publicId = generatePublicId();
    const created = await createAuditRecord({
      publicId,
      teamSize: input.teamSize,
      primaryUseCase: input.primaryUseCase,
      totalMonthlySpend: output.totalMonthlySpend,
      totalMonthlySavings: output.totalMonthlySavings,
      totalAnnualSavings: output.totalAnnualSavings,
      auditPayloadJson: { input, output }
    });

    return ok({
      id: created.id,
      publicId: created.public_id,
      totalMonthlySpend: output.totalMonthlySpend,
      totalMonthlySavings: output.totalMonthlySavings,
      totalAnnualSavings: output.totalAnnualSavings,
      recommendations: output.recommendations
    });
  } catch {
    return fail("INTERNAL_ERROR", "Could not process audit request.", 500);
  }
}

