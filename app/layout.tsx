import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://lucent-rose.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Lucent - AI Spend Audit for Startups",
    template: "%s | Lucent"
  },
  description:
    "Lucent analyzes your AI tool stack, flags plan mismatches, and estimates monthly and annual savings with clear reasoning. Free, no login required.",
  icons: {
    icon: "/icon.svg"
  },
  keywords: ["SaaS spend", "AI tools audit", "startup savings", "Cursor", "Copilot", "ChatGPT"],
  openGraph: {
    type: "website",
    siteName: "Lucent",
    title: "Lucent - AI Spend Audit for Startups",
    description: "Find hidden AI tool overspend in under two minutes.",
    url: APP_URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucent - AI Spend Audit for Startups",
    description: "Find hidden AI tool overspend in under two minutes."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

