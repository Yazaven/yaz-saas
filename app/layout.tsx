// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Legalynx | AI Contract Intelligence",
  description: "Enterprise-grade AI for legal contract analysis and management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0D0D0D] text-gray-200`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}