import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Миний Чиглэл",
    template: "%s | Миний Чиглэл",
  },
  description:
    "Хүүхдийн чадвар, сонирхолд тулгуурласан мэргэжил сонголтын зөвлөгөө.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-navy">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
