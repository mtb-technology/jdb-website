"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    "Belastingvraag direct beantwoord via chat",
    "Toegang tot netwerk van betrouwbare experts",
    "AI-gedreven gebaseerd op actuele belastingdata",
    // "Gratis en onafhankelijk advies via chat",
    // "Gebouwd op de nieuwste generatie AI",
    // "Direct gekoppeld aan actuele belastingdata",
  ],
  en: [
    "Tax question answered instantly via chat",
    "Access to network of trusted tax specialists",
    "AI-driven directly linked with current tax data",
    // "Free and independent advice via chat",
    // "Built on the latest generation AI",
    // "Directly linked to current tax data",
  ]
};

const navLinks = {
  nl: [
    { href: "/hoe-werkt-het", label: "Hoe werkt het" }, //check
    {
      href: "/onderwerpen",
      label: "Onderwerpen",
      children: [
            { href: "/onderwerpen/belastingaangifte-laten-doen", label: "Belastingaangifte laten doen" },
            { href: "/onderwerpen/belastingaangifte", label: "Inkomstenbelasting" },
            { href: "/onderwerpen/m-formulier", label: "M-formulier" },
            { href: "/onderwerpen/erfbelasting", label: "Erfbelasting" },
            { href: "/onderwerpen/besloten-vennootschap", label: "BV" },
            { href: "/onderwerpen/ondernemer", label: "Ondernemer/ZZP" }
        // {
        //   label: "Belastingaangifte",
        //   href: "/onderwerpen",
        //   children: [
        //     { href: "/onderwerpen/belastingaangifte-laten-doen", label: "Belastingaangifte laten doen" },
        //     { href: "/onderwerpen/belastingaangifte", label: "Aangifte inkomstenbelasting" },
        //     { href: "/onderwerpen/m-formulier", label: "M-formulier" },
        //     { href: "/onderwerpen/aftrekposten-en-kortingen", label: "Aftrekposten en kortingen" },
        //     { href: "/onderwerpen/erfbelasting", label: "Erfbelasting" }
        //   ]
        // },
        // {
        //   label: "ZZP en BV",
        //   href: "/onderwerpen",
        //   children: [
        //     { href: "/onderwerpen/besloten-vennootschap", label: "BV" },
        //     { href: "/onderwerpen/zelfstandigen-zonder-personeel", label: "ZZP" }
        //   ]
        // },
        // {
        //   label: "Toeslagen",
        //   href: "/onderwerpen",
        //   children: [
        //     { href: "/onderwerpen/zorgtoeslag", label: "Zorgtoeslag" },
        //     { href: "/onderwerpen/huurtoeslag", label: "Huurtoeslag" },
        //     { href: "/onderwerpen/kinderopvangtoeslag", label: "Kinderopvangtoeslag" },
        //     { href: "/onderwerpen/kinderbijslag", label: "Kinderbijslag" }
        //   ]
        // },
        // {
        //   label: "AOW",
        //   href: "/onderwerpen",
        //   children: [
        //     { href: "/onderwerpen/aow-pensioen", label: "AOW pensioen" },
        //     { href: "/onderwerpen/inkomen-aow-pensioen", label: "Bijverdiensten AOW pensioen" }
        //   ]
        // }
      ]
    },
    { href: "/blog", label: "Blog" },
    { href: "/over-ons", label: "Over ons" },
  ],
  en: [
    { href: "/en/how-it-works", label: "How it works" }, //check
    {
      href: "/en/topics",
      label: "Topics",
      children: [
          { href: "/en/topics/tax-advisor", label: "Tax return assistance" },
          { href: "/en/topics/income-tax-return", label: "Income tax" },
          { href: "/en/topics/inheritance-tax", label: "Inheritance tax" },
          { href: "/en/topics/m-form", label: "M-form" },
          { href: "/en/topics/private-limited-company", label: "Private limited company" },
          { href: "/en/topics/entrepreneur", label: "Entrepreneur/ZZP" }
          
        // {
        //   label: "Tax Returns",
        //   href: "/en/topics",
        //   children: [
        //     { href: "/en/topics/tax-advisor", label: "Tax return assistance" },
        //     { href: "/en/topics/incometax-return", label: "Income tax return" },
        //     { href: "/en/topics/m-form", label: "M-form" },
        //     { href: "/en/topics/tax-credit", label: "Tax credit and deductions" },
        //     { href: "/en/topics/inheritance-tax", label: "Inheritance tax" }
        //   ]
        // },
        // {
        //   label: "ZZP en BV",
        //   href: "/en/topics",
        //   children: [
        //     { href: "/en/topics/private-limited-company", label: "Private limited company" },
        //     { href: "/en/topics/self-employed-professional", label: "Self-employed professional" }
        //   ]
        // },
        // {
        //   label: "Allowances",
        //   href: "/en/topics",
        //   children: [
        //     { href: "/en/topics/healthcare-allowance", label: "Healthcare allowance" },
        //     { href: "/en/topics/housing-allowance", label: "Housing allowance" },
        //     { href: "/en/topics/childcare-allowance", label: "Childcare allowance" },
        //     { href: "/en/topics/child-benefit", label: "Child benefit" }
        //   ]
        // },
        // {
        //   label: "AOW",
        //   href: "/en/topics",
        //   children: [
        //     { href: "/en/topics/aow-pension", label: "AOW pension" },
        //     { href: "/en/topics/income-aow-pension", label: "Extra income AOW pension" }
        //   ]
        // }
      ]
    },
    { href: "/en/blog", label: "Blog" },
    { href: "/en/about-us", label: "About us" },
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

  const renderNavLink = (
    link: NavLink,
    isMobile: boolean = false,
    level: number = 0
  ) => {
    const isActive = activeMenus.includes(link.label);
    const paddingLeft = level * 16;

    if (link.children) {
      return (
        <div key={link.label} className="space-y-2">
          <button
            onClick={() => toggleSubmenu(link.label)}
            className={`flex items-center justify-between w-full hover:opacity-80 transition-opacity ${
              level > 0 ? "text-white/90" : ""
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
            <div className={`space-y-3 ${isMobile ? "text-base" : "text-sm"}`}>
              {link.children.map((child) =>
                renderNavLink(child, isMobile, level + 1)
              )}
            </div>
          )}
        </div>
      );
    }

    const LinkComponent = (
      <Link
        href={link.href}
        className={`block hover:opacity-80 transition-opacity ${
          level > 0 ? "text-white/80" : ""
        }`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {link.label}
      </Link>
    );

    return isMobile ? (
      <SheetClose key={`${link.href}-${link.label}`} asChild>
        {LinkComponent}
      </SheetClose>
    ) : (
      <div key={`${link.href}-${link.label}`}>{LinkComponent}</div>
    );
  };

  return (
    <div className="flex h-screen bg-white font-sans text-base">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-primary text-white p-8 h-screen ">
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

        <nav className="space-y-4 mb-auto mt-4 pt-10 border-t border-white/20 text-base overflow-y-auto pr-6 -mr-6">
          {currentNavLinks.map((link) => renderNavLink(link))}
        </nav>

        <Button
          asChild
          className="mt-8 bg-white text-primary hover:bg-gray-100 transition-colors text-sm"
        >
          <Link
            href={locale === "nl" ? "/vind-een-adviseur" : "/en/find-advisor"}
          >
            {locale === "nl" ? "Vind een adviseur" : "Find an advisor"}
          </Link>
        </Button>
      </aside>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden z-50 absolute top-6 left-6"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-0">
          <div className="bg-primary text-white h-full p-6">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-white">
                <SheetClose key={`menu-logo`} asChild>
                  <Link href="/">
                    <Image
                      src="https://jandebelastingman.nl/images/brand/logo.svg"
                      alt="Jan de Belastingman Logo"
                      width={140}
                      height={40}
                      className="w-auto"
                    />
                  </Link>
                </SheetClose>
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

            <SheetClose asChild>
              <Button
                asChild
                className="w-full bg-white text-primary hover:bg-gray-100 transition-colors text-sm"
              >
                <Link
                  href={
                    locale === "nl" ? "/vind-een-adviseur" : "/en/find-advisor"
                  }
                >
                  {locale === "nl" ? "Vind een adviseur" : "Find an advisor"}
                </Link>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {children}
    </div>
  );
} 