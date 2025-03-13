"use client"

import type { SupportedLocale } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const localeContent = {
  nl: {
    step: "Stap",
    of: "van",
  },
  en: {
    step: "Step",
    of: "of",
  },
}

interface FormProgressProps {
  currentPage: number
  totalPages: number
  className?: string
  locale?: SupportedLocale
}

export function FormProgress({ currentPage, totalPages, className, locale = "nl" }: FormProgressProps) {
  const t = useMemo(() => localeContent[locale] || localeContent.nl, [locale])

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="text-sm text-muted-foreground mr-2">
        {t.step} {currentPage} {t.of} {totalPages}
      </div>
      <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        />
      </div>
    </div>
  )
}

