import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enquire | Wedding & Photography Enquiries Cambridge",
  description:
    "Get in touch about weddings, outdoor sessions, commercial work or larger projects. We come back to every enquiry within 24 hours.",
  alternates: { canonical: "/enquire" },
  openGraph: {
    title: "Enquire | Something Blue Productions",
    description:
      "Get in touch about weddings, outdoor sessions, commercial work or larger projects in Cambridgeshire.",
    url: "https://something-blue-productions.com/enquire",
    type: "website",
  },
};

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
