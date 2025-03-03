"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

export default function SidebarLayout({ 
  children,
  features,
  navLinks,
}: { 
  children: React.ReactNode;
  features: string[];
  navLinks: NavLink[];
}) {
  const [activeMenus, setActiveMenus] = useState<string[]>([]);

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
        key={link.href}
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
      <aside className="hidden md:flex flex-col w-72 bg-[#2B4EE6] text-white p-8">
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
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1 text-orange-400 text-xl">✓</div>
              <p className="leading-tight">{feature}</p>
            </div>
          ))}
        </div>

        <nav className="space-y-4 mb-auto mt-4 pt-10 border-t border-white/20 text-base">
          {navLinks.map((link) => renderNavLink(link))}
        </nav>

        <Button className="mt-8 bg-white text-[#2B4EE6] hover:bg-gray-100 transition-colors text-sm">
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
          <div className="bg-[#2B4EE6] text-white h-full p-6">
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
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-orange-400 text-xl">✓</div>
                  <p className="leading-tight">{feature}</p>
                </div>
              ))}
            </div>

            <Separator className="bg-white/20" />

            <nav className="space-y-4 my-6 text-lg">
              {navLinks.map((link) => renderNavLink(link, true))}
            </nav>

            <Button className="w-full bg-white text-[#2B4EE6] hover:bg-gray-100 transition-colors text-sm">
              Vind een adviseur
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {children}
    </div>
  );
} 