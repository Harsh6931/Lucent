import { fail, ok } from "@/lib/api/response";
import { createLeadRecord, getAuditById } from "@/lib/db/repositories";
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

    // Try sending email via Resend
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const audit = await getAuditById(parsed.data.auditId);
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Lucent Audits <onboarding@resend.dev>";
        
        const htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1e293b;">
            <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin-bottom: 16px;">Your SaaS Spend Audit is Saved!</h1>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">Hi there,</p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">Thanks for using <strong>Lucent</strong>. We have saved your SaaS Spend Audit report. Here is a quick summary of your optimization potential:</p>
            
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 16px; margin-bottom: 24px;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 8px; font-size: 15px;"><strong>Total Monthly Spend:</strong> $${Number(audit.total_monthly_spend).toFixed(2)}/mo</li>
                <li style="margin-bottom: 8px; font-size: 15px;"><strong>Potential Monthly Savings:</strong> <span style="color: #16a34a; font-weight: 600;">$${Number(audit.total_monthly_savings).toFixed(2)}/mo</span></li>
                <li style="margin-bottom: 8px; font-size: 15px;"><strong>Potential Annual Savings:</strong> <span style="color: #16a34a; font-weight: 600;">$${Number(audit.total_annual_savings).toFixed(2)}/yr</span></li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">You can view and share your full interactive report at any time using the link below:</p>
            <p style="margin-bottom: 24px;">
              <a href="${appUrl}/r/${audit.public_id}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 15px;">View Shared Report</a>
            </p>
            <p style="font-size: 14px; color: #64748b; margin-top: 32px; border-t: 1px solid #e2e8f0; padding-top: 16px;">Best regards,<br>The Lucent Team</p>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [parsed.data.email],
            subject: "Your Lucent SaaS Spend Audit is Saved!",
            html: htmlContent
          })
        });
      } catch (emailErr) {
        // Fail-safe: do not fail the lead collection if email delivery fails
        console.error("Resend transactional email delivery failed:", emailErr);
      }
    }

    return ok({ id: lead.id }, 201);
  } catch (err) {
    console.error("Could not capture lead:", err);
    return fail("INTERNAL_ERROR", "Could not capture lead.", 500);
  }
}

