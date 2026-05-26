import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy | Lucent",
  description: "Learn how Lucent collects, uses, and safeguards your AI spend and tool metadata. Legally compliant with GDPR, CCPA, and CPRA standards.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <SiteHeader />
      
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-slate-500">
            Last Updated: May 26, 2026 &bull; Effective Date: May 26, 2026
          </p>
        </div>

        {/* Desktop Split Layout */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Quick Navigation Panel */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                On This Page
              </h4>
              <nav className="flex flex-col space-y-2 text-sm text-slate-500">
                <a href="#intro" className="hover:text-slate-950 hover:underline transition">1. Scope & Consent</a>
                <a href="#collect" className="hover:text-slate-950 hover:underline transition">2. Information We Collect</a>
                <a href="#use" className="hover:text-slate-950 hover:underline transition">3. How We Use Information</a>
                <a href="#share" className="hover:text-slate-950 hover:underline transition">4. Sharing & Transfer</a>
                <a href="#retention" className="hover:text-slate-950 hover:underline transition">5. Retention & Security</a>
                <a href="#rights" className="hover:text-slate-950 hover:underline transition">6. Your Privacy Rights</a>
                <a href="#cookies" className="hover:text-slate-950 hover:underline transition">7. Cookies & Tracking</a>
                <a href="#children" className="hover:text-slate-950 hover:underline transition">8. Children&apos;s Privacy</a>
                <a href="#changes" className="hover:text-slate-950 hover:underline transition">9. Amendments</a>
                <a href="#contact" className="hover:text-slate-950 hover:underline transition">10. Contact Us</a>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-10 text-slate-700 leading-relaxed">
            
            {/* Section 1 */}
            <section id="intro" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">1. Scope, Preamble, and Consent</h2>
              <p>
                Lucent (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) provides an automated SaaS optimization and AI spend audit engine designed to assess licensing structures and team seat expenditures. This Privacy Policy governs our data practices across the Lucent platform, including our online audit calculator, API interactions, public savings reporting modules, and consultation interfaces.
              </p>
              <p>
                By accessing our website, initiating a spend audit, generating reports, or submitting email queries, you explicitly acknowledge and agree to the collection, processing, transfer, storage, and disclosure of your information as detailed in this policy. If you do not agree to these terms, please immediately terminate your use of our services.
              </p>
            </section>

            {/* Section 2 */}
            <section id="collect" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">2. Categories of Information We Collect</h2>
              <p>
                To provide precise deterministic calculations and coordinate opt-in SaaS savings strategies, we collect data across multiple vectors:
              </p>
              <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                <div>
                  <h3 className="font-semibold text-slate-950">A. Information Provided Voluntarily by You</h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                    <li><strong>Team & Tool Parameters:</strong> Tool selections (e.g., Cursor, GitHub Copilot, Claude, OpenAI API), seat volume, license tiers, monthly expenditures, and billing parameters.</li>
                    <li><strong>Contact Metadata:</strong> Corporate email address, organization name, stakeholder role, and message content submitted when request-saving reports, subscribing to optimization guidelines, or booking consultation sessions.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-950">B. Information Collected Automatically</h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                    <li><strong>Device & Network Identifiers:</strong> IP addresses, browser specifications, operating system telemetry, referring/exit pages, and standard server log variables.</li>
                    <li><strong>Interaction Behavior:</strong> Clickstream sequences, scroll depth, form field navigation, conversion tracking, response time measurements, and specific calculations compiled during dynamic audit sequences.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="use" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">3. How We Use and Process Your Information</h2>
              <p>
                Our processing workflows rely on standard legal bases: execution of our services, compliance with legal obligations, and fulfillment of legitimate business interests. Your information is used for:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Audit Execution & Delivery:</strong> Simulating vendor subscription scenarios, analyzing tool overlaps, generating local and cloud-saved savings recommendations, and producing personalized dashboard reports.</li>
                <li><strong>Public Share Links:</strong> Formatting read-only URL endpoints (`/r/[publicId]`). In alignment with our data minimization principles, these links reference compiled recommendations and aggregated estimates. They explicitly suppress raw emails, corporate names, and individual identifiers.</li>
                <li><strong>Consultation Routing:</strong> Coordinating optimization and bulk credit inquiries with authorized third-party consultancies (e.g., Credex).</li>
                <li><strong>Operational Analytics & Machine Learning (Aggregated Use Case):</strong> Compiling anonymized billing inputs into aggregate datasets to refine optimization models, audit algorithms, and publish global industry benchmarks. This processed data is entirely de-identified and cannot be retroactively linked back to any individual or business.</li>
                <li><strong>Security & Systems Safeguards:</strong> Debugging service bottlenecks, identifying malicious rate-limiting bypass attempts, preventing bot actions, and preserving platform integrity.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="share" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">4. Sharing, Transfer, and Disclosure of Information</h2>
              <p>
                We do not sell, rent, or trade your personally identifiable information (PII) to third-party brokers for direct marketing purposes. However, to execute standard operations and offer extended business savings, we disclose data under the following circumstances:
              </p>
              <div className="bg-slate-100 border-l-4 border-slate-500 p-4 rounded text-sm text-slate-800 space-y-2">
                <p className="font-bold uppercase tracking-wider text-xs text-slate-600">Standard & Practice Disclosures (&ldquo;Hidden Clauses&rdquo;)</p>
                <p><strong>Corporate Restructuring & Ownership Transfers:</strong> If we undergo a merger, acquisition, asset purchase, restructuring, joint venture, bankruptcy, or similar corporate transaction, your personal and analytical data may be transferred, reassigned, or sold as part of our business assets to the succeeding entity without prior explicit consent.</p>
                <p><strong>Strategic Consultation Hand-offs:</strong> When requesting direct help for contract negotiations, cloud credit allocations, or optimization packages, your contact information and audit recommendations are transmitted to our primary credit optimization partner (e.g., Credex) for service fulfillment.</p>
                <p><strong>Cloud Infrastructure Subprocessors:</strong> We host audit data, database registries, and logs using trusted infrastructure vendors (such as Supabase and Vercel). These platforms process your data subject to strict confidentiality commitments.</p>
              </div>
              <p className="mt-3">
                Additionally, we may share information if required by law, subpoena, regulatory inspection, or if we believe in good faith that such action is necessary to protect rights, defend property, prevent fraud, or protect user safety.
              </p>
            </section>

            {/* Section 5 */}
            <section id="retention" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">5. Data Retention, Localization, and Security</h2>
              <p>
                Your audit data is stored in secure database structures mapped to randomized UUID references. Because Lucent does not require standard account creation, audits remain independent unless explicitly associated with a submitted email address.
              </p>
              <p>
                We retain personal and corporate information (such as emails collected during report delivery requests) for as long as necessary to perform optimizations, provide customer assistance, and satisfy legal audits or dispute resolutions. When personal records are no longer required, they are permanently deleted or fully anonymized.
              </p>
              <p className="text-amber-800 bg-amber-50 border border-amber-200 rounded p-4 text-sm">
                <strong>Important Security Warning:</strong> We implement administrative, physical, and digital protection layers to prevent data alteration, loss, or unauthorized entry. However, no data transmission over the internet or cloud storage array can be guaranteed as 100% secure. You share all personal data at your own risk.
              </p>
            </section>

            {/* Section 6 */}
            <section id="rights" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">6. Regional Rights (GDPR & CCPA/CPRA Compliance)</h2>
              <p>
                Depending on your location, you possess distinct statutory rights regarding your personal information:
              </p>
              
              <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                <div>
                  <h3 className="font-semibold text-slate-950">European Union & UK Users (GDPR)</h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                    <li>The right to request access to and receive copies of your personal data.</li>
                    <li>The right to rectify inaccurate or incomplete records.</li>
                    <li>The right to request erasure (&ldquo;Right to be Forgotten&rdquo;) of your records.</li>
                    <li>The right to restrict or object to the processing of your data, or withdraw consent.</li>
                    <li>The right to data portability.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-950">California Residents (CCPA/CPRA)</h3>
                  <p className="text-sm mt-1 text-slate-600">
                    You have the right to request disclosures regarding the categories of personal data collected, specific sources, business purposes, and the categories of third parties with whom data is shared. You have the right to request deletion of personal information, opt-out of standard selling or sharing for cross-context behavioral advertising, and receive equal service without discrimination.
                  </p>
                  <p className="text-sm mt-2 text-slate-600">
                    Lucent does not exchange personal details for financial compensation. However, some analytic integrations may be defined as a &ldquo;sale&rdquo; or &ldquo;share&rdquo; of data under California law. You may submit opt-out requests at any time.
                  </p>
                </div>
              </div>

              <p className="mt-2 text-sm">
                To exercise any of these protections, please contact our privacy compliance desk using the details in the Contact section below. We will authenticate your request and reply within statutory timelines.
              </p>
            </section>

            {/* Section 7 */}
            <section id="cookies" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">7. Cookies, Web Beacons, and Tracking Pixels</h2>
              <p>
                Lucent uses cookies, persistent browser identifiers, local storage tokens, and web beacons to save form selections, preserve session configurations, and analyze visitor paths.
              </p>
              <p>
                You can block or disable cookies via your browser configurations; however, doing so may disable vital components of the dynamic audit calculator or block report saving mechanisms.
              </p>
              <p>
                <strong>Do Not Track (DNT) Notice:</strong> Lucent does not respond to or modify its operations in response to &ldquo;Do Not Track&rdquo; browser request headers, as there is currently no global technical standard for DNT response protocols.
              </p>
            </section>

            {/* Section 8 */}
            <section id="children" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">8. Children&apos;s Online Privacy Protection</h2>
              <p>
                Lucent is designed exclusively for business organizations, IT departments, and corporate professionals. We do not intentionally compile, request, or maintain data from children under the age of 16 (or older depending on jurisdictions). If we discover that we have inadvertently collected information from a child under these age parameters, we will purge it from our servers immediately.
              </p>
            </section>

            {/* Section 9 */}
            <section id="changes" className="scroll-mt-24 space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">9. Amendments and Updates to This Policy</h2>
              <p>
                We reserve the right to modify, amend, or rewrite this Privacy Policy at any time, in our sole discretion, without direct prior notice. Any adjustments will take effect immediately upon being posted to this URL. The &ldquo;Last Updated&rdquo; timestamp at the top of this document will signify when changes have occurred. Your continued use of the website or the audit dashboard following updates constitutes acceptance of the new privacy conditions.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="scroll-mt-24 space-y-6">
              <h2 className="text-2xl font-bold text-slate-950">10. Contact Us & Data Requests</h2>
              <p>
                For questions regarding data processing, requests to delete audit records, or to submit CCPA/GDPR access inquiries, contact our data protection team:
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm space-y-2">
                <p className="font-bold text-slate-900">Lucent Technologies Corp.</p>
                <p className="text-slate-600 text-sm">Attention: Data Protection & Legal Compliance Division</p>
                <p className="text-slate-600 text-sm">Email: <a href="mailto:privacy@lucent.example.com" className="text-slate-900 underline hover:text-slate-700">privacy@lucent.example.com</a></p>
                <p className="text-slate-600 text-sm">Mailing Address: 100 Savings Way, Suite 400, Wilmington, DE 19801</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

