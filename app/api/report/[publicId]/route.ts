import { fail, ok } from "@/lib/api/response";
import { getAuditByPublicId } from "@/lib/db/repositories";

export async function GET(_: Request, { params }: { params: { publicId: string } }) {
  try {
    const row = await getAuditByPublicId(params.publicId);
    return ok({
      publicId: row.public_id,
      totalMonthlySpend: row.total_monthly_spend,
      totalMonthlySavings: row.total_monthly_savings,
      totalAnnualSavings: row.total_annual_savings,
      auditPayload: row.audit_payload_json
    });
  } catch {
    return fail("NOT_FOUND", "Public report not found.", 404);
  }
}

