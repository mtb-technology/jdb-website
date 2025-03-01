import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarLayout from "../components/SidebarLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const features = [
  "Gratis en onafhankelijk advies via chat",
  "Gebouwd op de nieuwste generatie AI",
  "Direct gekoppeld aan actuele belastingdata",
]

const navLinks = [
  { href: "#", label: "Hoe werkt het" },
  { href: "#", label: "Onderwerpen" },
  { href: "/besloten-vennootschap", label: "Blog" },
  { href: "#", label: "Over ons" },
]

export const metadata: Metadata = {
  title: "Jan de Belastingman",
  description: "Belasting advies via AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <SidebarLayout features={features} navLinks={navLinks}>{children}</SidebarLayout>
      </body>
    </html>
  );
}
