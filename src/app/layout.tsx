import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Something Blue Productions | Wedding & Family Photography Cambridge",
    template: "%s | Something Blue Productions",
  },
  description:
    "Wedding, family, newborn and maternity photography and video. Based across two studios in Papworth Everard and Waterbeach, serving Cambridge and Cambridgeshire.",
  keywords: [
    "wedding photographer cambridge",
    "family photographer cambridge",
    "newborn photographer cambridge",
    "maternity photographer cambridgeshire",
    "wedding videography cambridge",
    "studio photography papworth everard",
    "studio photography waterbeach",
  ],
  authors: [{ name: "Something Blue Productions" }],
  creator: "Something Blue Productions",
  metadataBase: new URL("https://www.something-blue-productions.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.something-blue-productions.com",
    siteName: "Something Blue Productions",
    title: "Something Blue Productions | Wedding & Family Photography Cambridge",
    description:
      "Wedding, family, newborn and maternity photography and video. Two studios in Cambridgeshire.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Something Blue Productions",
    description:
      "Wedding, family, newborn and maternity photography and video. Two studios in Cambridgeshire.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}