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
  { 
    href: "#", 
    label: "Onderwerpen",
    children: [
      {
        label: "Trending",
        href: "#",
        children: [
          { href: "/onderwerpen/gratis-belastingadvies", label: "Gratis belastingadvies" },
          { href: "/onderwerpen/aangifte-inkomstenbelasting", label: "Aangifte inkomstenbelasting" },
          { href: "/onderwerpen/m-formulier", label: "M-formulier" }
        ]
      },
      {
        label: "Toeslagen",
        href: "#",
        children: [
          { href: "/onderwerpen/zorgtoeslag", label: "Zorgtoeslag" },
          { href: "/onderwerpen/huurtoeslag", label: "Huurtoeslag" },
          { href: "/onderwerpen/kinderopvangtoeslag", label: "Kinderopvangtoeslag" },
          { href: "/onderwerpen/kindgebonden-budget", label: "Kindgebonden budget" }
        ]
      },
      {
        label: "ZZP en BV",
        href: "#",
        children: [
          { href: "/onderwerpen/bv", label: "BV" },
          { href: "/onderwerpen/zzper", label: "ZZP'er" }
        ]
      },
      {
        label: "Belastingaangifte",
        href: "#",
        children: [
          { href: "/onderwerpen/aangifte-inkomstenbelasting", label: "Aangifte inkomstenbelasting" },
          { href: "/onderwerpen/m-formulier", label: "M-formulier" },
          { href: "/onderwerpen/aftrekposten", label: "Aftrekposten" },
          { href: "/onderwerpen/erfbelasting", label: "Erfbelasting" }
        ]
      },
      {
        label: "AOW",
        href: "#",
        children: [
          { href: "/onderwerpen/aow-uitkering", label: "AOW uitkering" },
          { href: "/onderwerpen/extra-inkomen-aow", label: "Extra inkomen naast AOW-pensioen" }
        ]
      }
    ]
  },
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
