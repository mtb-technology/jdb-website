"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white font-sans text-base">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[#2B4EE6] text-white p-8">
        <div className="mb-16 text-base">
          <Image
            src="https://jandebelastingman.nl/images/brand/logo.svg"
            alt="Jan de Belastingman Logo"
            width={200}
            height={56}
            className="w-auto"
          />
        </div>

        <div className="space-y-6 mb-8 text-sm">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-orange-400 text-xl">✓</div>
            <p className="leading-tight">Gratis en onafhankelijk advies via chat</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 text-orange-400 text-xl">✓</div>
            <p className="leading-tight">Gebouwd op de nieuwste generatie AI</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 text-orange-400 text-xl">✓</div>
            <p className="leading-tight">Direct gekoppeld aan actuele belastingdata</p>
          </div>
        </div>

        <nav className="space-y-6 mb-auto mt-4 pt-10 border-t border-white/20 text-base">
          <Link href="#" className="block hover:opacity-80 transition-opacity">
            Hoe werkt het
          </Link>
          <Link href="#" className="block hover:opacity-80 transition-opacity">
            Onderwerpen
          </Link>
          <Link href="#" className="block hover:opacity-80 transition-opacity">
            Blog
          </Link>
          <Link href="#" className="block hover:opacity-80 transition-opacity">
            Over ons
          </Link>
        </nav>

        <Button className="mt-8 bg-white text-[#2B4EE6] hover:bg-gray-100 transition-colors text-sm">
          Vind een adviseur
        </Button>
      </aside>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute top-6 left-6">
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
              <div className="flex items-start gap-3">
                <div className="mt-1 text-orange-400 text-xl">✓</div>
                <p className="leading-tight">Gratis en onafhankelijk advies via chat</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-orange-400 text-xl">✓</div>
                <p className="leading-tight">Gebouwd op de nieuwste generatie AI</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-orange-400 text-xl">✓</div>
                <p className="leading-tight">Direct gekoppeld aan actuele belastingdata</p>
              </div>
            </div>

            <Separator className="bg-white/20" />

            <nav className="space-y-6 my-6 text-lg">
              <Link href="#" className="block hover:opacity-80 transition-opacity">
                Hoe werkt het
              </Link>
              <Link href="#" className="block hover:opacity-80 transition-opacity">
                Onderwerpen
              </Link>
              <Link href="#" className="block hover:opacity-80 transition-opacity">
                Blog
              </Link>
              <Link href="#" className="block hover:opacity-80 transition-opacity">
                Over ons
              </Link>
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