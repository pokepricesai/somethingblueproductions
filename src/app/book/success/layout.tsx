import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Something Blue Productions",
  description: "Your booking is confirmed — confirmation email is on its way.",
  robots: { index: false, follow: false },
};

export default function BookSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
