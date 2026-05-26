import { Metadata } from "next";
import { getAuditByPublicId } from "@/lib/db/repositories";
import PublicReportClient from "./PublicReportClient";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type Props = {
  params: Promise<{ publicId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { publicId } = await params;
  try {
    const row = await getAuditByPublicId(publicId);
    const monthlySavings = Number(row.total_monthly_savings).toFixed(2);
    const annualSavings = Number(row.total_annual_savings).toFixed(2);
    const title = `Lucent SaaS Audit Snapshot - Save $${annualSavings}/yr`;
    const description = `This public audit shows potential savings of $${monthlySavings}/mo ($${annualSavings}/yr) for a team of ${row.team_size} using Lucent.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (err) {
    return {
      title: "Lucent SaaS Audit Snapshot",
      description: "View this share-safe SaaS audit report.",
    };
  }
}

export default async function PublicReportPage({ params }: Props) {
  const { publicId } = await params;
  let data = null;
  let error = false;
  try {
    const row = await getAuditByPublicId(publicId);
    data = {
      publicId: row.public_id,
      totalMonthlySavings: Number(row.total_monthly_savings),
      totalAnnualSavings: Number(row.total_annual_savings),
    };
  } catch (err) {
    error = true;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <PublicReportClient publicId={publicId} initialData={data} error={error} />
      </main>
      <SiteFooter />
    </div>
  );
}
