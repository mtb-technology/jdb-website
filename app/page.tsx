"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="relative flex-1 flex flex-col">
      <Header />

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

      {/* SVG Definitions */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </main>
  );
}
