import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Wedding, Family & Studio Photography Cambridge",
  description:
    "Selected wedding, family, newborn, maternity and commercial photography from across Cambridgeshire. Documentary-style work by Something Blue Productions.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Something Blue Productions",
    description:
      "Selected wedding, family, newborn and commercial photography from Cambridgeshire.",
    url: "https://something-blue-productions.com/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
