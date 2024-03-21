import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const press_start = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clarity | Home",
  description: "Clarity Rust Homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={press_start.className}>{children}</body>
    </html>
  );
}
