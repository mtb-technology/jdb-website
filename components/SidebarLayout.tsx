"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";


interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}



const features = {
  nl: [
    "Gratis en onafhankelijk advies via chat",
    "Gebouwd op de nieuwste generatie AI",
    "Direct gekoppeld aan actuele belastingdata",
  ],
  en: [
    "Free and independent advice via chat",
    "Built on the latest generation AI",
    "Directly linked to current tax data",
  ]
};

const navLinks = {
  nl: [
    { href: "/hoe-werkt-het", label: "Hoe werkt het" },
    {
      href: "/onderwerpen",
      label: "Onderwerpen",
      children: [
        {
          label: "Trending",
          href: "/onderwerpen",
          children: [
            { href: "/onderwerpen/gratis-belastingadvies", label: "Gratis belastingadvies" },
            { href: "/onderwerpen/aangifte-inkomstenbelasting", label: "Aangifte inkomstenbelasting" },
            { href: "/onderwerpen/m-formulier", label: "M-formulier" }
          ]
        },
        {
          label: "Toeslagen",
          href: "/onderwerpen",
          children: [
            { href: "/onderwerpen/zorgtoeslag", label: "Zorgtoeslag" },
            { href: "/onderwerpen/huurtoeslag", label: "Huurtoeslag" },
            { href: "/onderwerpen/kinderopvangtoeslag", label: "Kinderopvangtoeslag" },
            { href: "/onderwerpen/kindgebonden-budget", label: "Kindgebonden budget" }
          ]
        },
        {
          label: "ZZP en BV",
          href: "/onderwerpen",
          children: [
            { href: "/onderwerpen/bv", label: "BV" },
            { href: "/onderwerpen/zzper", label: "ZZP'er" }
          ]
        }
      ]
    },
    { href: "/besloten-vennootschap", label: "Blog" },
    { href: "/over-ons", label: "Over ons" },
    { href: "/besloten-vennootschap", label: "Besloten vennootschap" },
  ],
  en: [
    { href: "/en/how-it-works", label: "How it works" },
    {
      href: "/en/topics",
      label: "Topics",
      children: [
        {
          label: "Trending",
          href: "/en/topics",
          children: [
            { href: "/en/topics/free-tax-advice", label: "Free tax advice" },
            { href: "/en/topics/income-tax-return", label: "Income tax return" },
            { href: "/en/topics/m-form", label: "M-form" }
          ]
        },
        {
          label: "Allowances",
          href: "/en/topics",
          children: [
            { href: "/en/topics/healthcare-allowance", label: "Healthcare allowance" },
            { href: "/en/topics/rent-allowance", label: "Rent allowance" },
            { href: "/en/topics/childcare-allowance", label: "Childcare allowance" },
            { href: "/en/topics/child-budget", label: "Child budget" }
          ]
        },
        {
          label: "Business",
          href: "/en/topics",
          children: [
            { href: "/en/topics/private-limited-company", label: "Private limited company" },
            { href: "/en/topics/self-employed", label: "Self-employed" }
          ]
        }
      ]
    },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/about-us", label: "About us" },
    { href: "/en/private-limited-company", label: "Private limited company" },
  ]
};

export default function SidebarLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  const [activeMenus, setActiveMenus] = useState<string[]>([]);
  const segment = useSelectedLayoutSegment();
  const locale = segment === "en" ? "en" : "nl";
  const currentFeatures = features[locale];
  const currentNavLinks = navLinks[locale];

  const toggleSubmenu = (label: string) => {
    setActiveMenus(current => {
      if (current.includes(label)) {
        return current.filter(item => item !== label);
      } else {
        return [...current, label];
      }
    });
  };

  const renderNavLink = (link: NavLink, isMobile: boolean = false, level: number = 0) => {
    const isActive = activeMenus.includes(link.label);
    const paddingLeft = level * 16;

    if (link.children) {
      return (
        <div key={link.label} className="space-y-2">
          <button
            onClick={() => toggleSubmenu(link.label)}
            className={`flex items-center justify-between w-full hover:opacity-80 transition-opacity ${
              level > 0 ? 'text-white/90' : ''
            }`}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            {link.label}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isActive ? "rotate-180" : ""
              }`}
            />
          </button>
          {isActive && (
            <div className={`space-y-3 ${isMobile ? 'text-base' : 'text-sm'}`}>
              {link.children.map((child) => renderNavLink(child, isMobile, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={`${link.href}-${link.label}`}
        href={link.href}
        className={`block hover:opacity-80 transition-opacity ${
          level > 0 ? 'text-white/80' : ''
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-base">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-primary text-white p-8">
        <div className="mb-16 text-base">
          <Link href="/">
            <Image
              src="https://jandebelastingman.nl/images/brand/logo.svg"
              alt="Jan de Belastingman Logo"
              width={200}
              height={56}
              className="w-auto"
            />
          </Link>
        </div>

        <div className="space-y-6 mb-8 text-sm">
          {currentFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 text-orange-400 text-xl">✓</div>
              <p className="leading-tight">{feature}</p>
            </div>
          ))}
        </div>

        <nav className="space-y-4 mb-auto mt-4 pt-10 border-t border-white/20 text-base">
          {currentNavLinks.map((link) => renderNavLink(link))}
        </nav>

        <Button className="mt-8 bg-white text-primary hover:bg-gray-100 transition-colors text-sm">
          Vind een adviseur
        </Button>
      </aside>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden z-50 absolute top-6 left-6">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-0">
          <div className="bg-primary text-white h-full p-6">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-white">
                <Image
                  src="https://jandebelastingman.nl/images/brand/logo.svg"
                  alt="Jan de Belastingman Logo"
                  width={140}
                  height={40}
                  className="w-auto"
                />
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 mb-8 text-sm">
              {currentFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-orange-400 text-xl">✓</div>
                  <p className="leading-tight">{feature}</p>
                </div>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <nav className="space-y-4 my-6 text-lg">
              {currentNavLinks.map((link) => renderNavLink(link, true))}
            </nav>

            <Button className="w-full bg-white text-primary hover:bg-gray-100 transition-colors text-sm">
              Vind een adviseur
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {children}
    </div>
  );
} 