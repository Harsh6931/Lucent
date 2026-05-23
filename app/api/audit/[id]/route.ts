import { fail, ok } from "@/lib/api/response";
import { getAuditById } from "@/lib/db/repositories";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const row = await getAuditById(params.id);
    return ok({
      id: row.id,
      publicId: row.public_id,
      teamSize: row.team_size,
      primaryUseCase: row.primary_use_case,
      totalMonthlySpend: row.total_monthly_spend,
      totalMonthlySavings: row.total_monthly_savings,
      totalAnnualSavings: row.total_annual_savings,
      auditPayload: row.audit_payload_json
    });
  } catch {
    return fail("NOT_FOUND", "Audit not found.", 404);
  }
}

