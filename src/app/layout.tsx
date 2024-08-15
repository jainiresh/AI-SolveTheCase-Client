import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from '../Redux/ReduxProvider/ReduxProvider'

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
      <link rel="icon" href="/nylas.png" sizes="any" />
      <ReduxProvider>
        <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
