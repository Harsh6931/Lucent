import { getSupabaseServerClient } from "@/lib/db/supabase-server";
import { JsonValue } from "@/lib/db/types";

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
      audit_payload_json: payload.auditPayloadJson
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function getAuditById(id: string) {
  const db = getSupabaseServerClient();
  const { data, error } = await db.from("audits").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

export async function getAuditByPublicId(publicId: string) {
  const db = getSupabaseServerClient();
  const { data, error } = await db.from("audits").select("*").eq("public_id", publicId).single();
  if (error) throw error;
  return data;
}

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
      team_size: payload.teamSize ?? null
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

