import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Pricing | Photography Cambridge from £99",
  description:
    "Studio sessions from £99, family sessions £199, plus wedding, newborn, maternity and commercial packages. Transparent pricing with all images included.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages & Pricing | Something Blue Productions",
    description:
      "Studio sessions from £99 with all images included. Wedding, family, newborn, maternity and commercial packages across Cambridgeshire.",
    url: "https://something-blue-productions.com/packages",
    type: "website",
  },
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
