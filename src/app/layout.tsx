import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpaceX IPO — The Road to $1.5 Trillion",
  description:
    "Comprehensive SpaceX IPO tracker: launches, revenue, Starlink growth, valuation history, and everything you need to know about the largest IPO in history.",
  openGraph: {
    title: "SpaceX IPO Dashboard",
    description:
      "The most comprehensive SpaceX IPO tracker on the internet. $1.5T valuation. June 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
