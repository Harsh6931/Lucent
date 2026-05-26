import { getSupabaseServerClient } from "@/lib/db/supabase-server";
import { JsonValue } from "@/lib/db/types";

// ─── Audit ────────────────────────────────────────────────────────────────────

export async function createAuditRecord(payload: {
  publicId: string;
  teamSize: number;
  primaryUseCase: string;
  totalMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  auditPayloadJson: JsonValue;
}) {
  const db = getSupabaseServerClient();
  const { data, error } = await db
    .from("audits")
    .insert({
      public_id: payload.publicId,
      team_size: payload.teamSize,
      primary_use_case: payload.primaryUseCase,
      total_monthly_spend: payload.totalMonthlySpend,
      total_monthly_savings: payload.totalMonthlySavings,
      total_annual_savings: payload.totalAnnualSavings,
      audit_payload_json: payload.auditPayloadJson,
    })
    // Select only the columns needed by callers instead of wildcard
    .select("id, public_id")
    .single();

  if (error) throw error;
  return data;
}

export async function getAuditById(id: string) {
  const db = getSupabaseServerClient();
  const { data, error } = await db
    .from("audits")
    .select(
      "id, public_id, team_size, primary_use_case, total_monthly_spend, total_monthly_savings, total_annual_savings, audit_payload_json"
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function getAuditByPublicId(publicId: string) {
  const db = getSupabaseServerClient();
  const { data, error } = await db
    .from("audits")
    .select(
      "public_id, team_size, total_monthly_spend, total_monthly_savings, total_annual_savings, audit_payload_json"
    )
    .eq("public_id", publicId)
    .single();
  if (error) throw error;
  return data;
}

// ─── Lead ─────────────────────────────────────────────────────────────────────

export async function createLeadRecord(payload: {
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
}) {
  const db = getSupabaseServerClient();
  const { data, error } = await db
    .from("leads")
    .insert({
      audit_id: payload.auditId,
      email: payload.email,
      company_name: payload.companyName ?? null,
      role: payload.role ?? null,
      team_size: payload.teamSize ?? null,
    })
    // Only return the id — callers don't need the full row
    .select("id")
    .single();

  if (error) throw error;
  return data;
}
