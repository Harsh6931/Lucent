import { fail, ok } from "@/lib/api/response";
import { createLeadRecord } from "@/lib/db/repositories";
import { leadInputSchema } from "@/lib/schemas/audit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadInputSchema.safeParse(body);
    if (!parsed.success) return fail("VALIDATION_ERROR", "Invalid lead payload.", 400);
    if (parsed.data.honeypot && parsed.data.honeypot.trim().length > 0) {
      return fail("ABUSE_DETECTED", "Request rejected.", 429);
    }

    const lead = await createLeadRecord({
      auditId: parsed.data.auditId,
      email: parsed.data.email,
      companyName: parsed.data.companyName,
      role: parsed.data.role,
      teamSize: parsed.data.teamSize
    });
    return ok({ id: lead.id }, 201);
  } catch {
    return fail("INTERNAL_ERROR", "Could not capture lead.", 500);
  }
}

