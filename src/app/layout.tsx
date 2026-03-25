import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SpaceX IPO Dashboard — The Road to Public Markets",
  description:
    "Comprehensive SpaceX IPO tracker: launches, revenue, Starlink growth, valuation history, and everything you need to know about the most anticipated IPO in history.",
  openGraph: {
    title: "SpaceX IPO Dashboard",
    description: "The most comprehensive SpaceX IPO tracker on the internet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="starfield" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
