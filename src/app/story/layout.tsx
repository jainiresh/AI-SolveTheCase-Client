import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nylas Challenge",
  description: "Generating puzzles with ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
        <body className={inter.className}>
        <Header/>{children}</body>
    </html>

  );
}
