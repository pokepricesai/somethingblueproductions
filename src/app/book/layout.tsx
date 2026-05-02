import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Studio Session | Photography Cambridge from £99",
  description:
    "Book a photography session at our Papworth Everard studio in Cambridgeshire. Couple, maternity, newborn, family and headshot sessions from £99. All images included — pay securely online.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Studio Session | Something Blue Productions",
    description:
      "Studio photography sessions in Cambridgeshire from £99. All images included. Book instantly online.",
    url: "https://something-blue-productions.com/book",
    type: "website",
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
