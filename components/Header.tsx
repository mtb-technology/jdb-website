"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
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
          <Button asChild variant="outline" className="text-sm">
            <Link href="https://app.jandebelastingman.nl/saas/register">Aanmelden</Link>
          </Button>
          <Button asChild variant="outline" className="text-sm">
            <Link href="https://app.jandebelastingman.nl/saas/login">Inloggen</Link>
          </Button>
        </div>
      </div>
      <div className="flex sm:hidden ml-auto">
        <Button asChild variant="outline" size="sm" className="text-xs">
          <Link href="https://app.jandebelastingman.nl/saas/login">Inloggen</Link>
        </Button>
      </div>

      {/* SVG Definitions */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </header>
  )
} 