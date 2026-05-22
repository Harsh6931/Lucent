import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucent",
  description: "AI spend audit for startups."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

