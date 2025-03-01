"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Send, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-6 text-sm">
          <div className="flex md:hidden ml-12">
            <Image
              src="https://jandebelastingman.nl/images/brand/logo.svg"
              alt="Jan de Belastingman Logo"
              width={140}
              height={40}
              className="w-auto"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 ml-auto text-sm">
            <div className="flex items-center gap-1 mr-4">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" strokeWidth={0} fill="url(#half)" />
              <span className="ml-2 text-gray-600">4.8/5, 101 geverifieerde reviews</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-sm">
                Aanmelden
              </Button>
              <Button variant="outline" className="text-sm">
                Inloggen
              </Button>
            </div>
          </div>
          <div className="flex sm:hidden ml-auto">
            <Button variant="outline" size="sm" className="text-xs">
              Inloggen
            </Button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="mb-8">
              <Image
                src="/logo-small.svg"
                alt="Tax Assistant Avatar"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 md:mb-8">
              Hoe kan ik je helpen?
            </h1>

            <div className="relative mb-8">
              <Input
                type="text"
                placeholder="Stel je vraag"
                className="w-full pl-4 pr-12 py-6 rounded-xl shadow-lg text-base"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-12 text-sm">
              <Button variant="outline" className="rounded-full">
                Welke aftrekposten kan ik toepassen?
              </Button>
              <Button variant="outline" className="rounded-full">
                Hoe moet de btw-aangifte als zelfstandige?
              </Button>
              <Button variant="outline" className="rounded-full">
                Moet ik vermogen in box 3 opgeven?
              </Button>
              <Button variant="outline" className="rounded-full">
                Wat is de impact van eenmanszaak naar BV?
              </Button>
              <Button variant="outline" className="rounded-full">
                Meer ...
              </Button>
            </div>

            <p className="text-gray-500 mb-12 text-xs">
              Deze dienst is een digitale assistent, geen gecertificeerde belastingadviseur.
              <br />
              Er kunnen geen rechten aan de verstrekte informatie worden ontleend.
            </p>

            <div className="text-center">
              <p className="text-gray-500 mb-4 text-sm">Onder andere bekend van</p>
              <div className="flex justify-center items-center gap-4 md:gap-8 grayscale opacity-60 flex-wrap">
                {[
                  {
                    src: "https://jandebelastingman.nl/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
                    alt: "De Jurist",
                    width: 100,
                  },
                  {
                    src: "https://jandebelastingman.nl/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
                    alt: "Accountant",
                    width: 120,
                  },
                  {
                    src: "https://jandebelastingman.nl/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
                    alt: "Quote",
                    width: 90,
                  },
                  {
                    src: "https://jandebelastingman.nl/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
                    alt: "FD",
                    width: 60,
                  },
                ].map((image, index) => (
                  <div key={index} className="h-6">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={24}
                      className="h-full w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="py-6 px-6 border-t border-gray-100 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Jan de Belastingman. Alle rechten voorbehouden.
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacybeleid
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Gebruiksvoorwaarden
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </main>

      {/* SVG Definitions */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
