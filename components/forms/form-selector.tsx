"use client"
import type { FormMeta } from "@/app/forms/forms"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SupportedLocale } from "@/lib/types"
import { cn } from "@/lib/utils"
import { memo, useMemo } from "react"

const localeContent = {
  nl: {
    heading: "Waar heb je hulp bij nodig?",
    selectButton: "Selecteer",
  },
  en: {
    heading: "What do you need help with?",
    selectButton: "Select",
  }
}

interface FormSelectorProps {
  forms: FormMeta[]
  onSelect: (formId: string) => void
  selectedFormId?: string
  className?: string
  locale?: SupportedLocale
}

export const FormSelector = memo(function FormSelector({ 
  forms, 
  onSelect, 
  className, 
  locale = "nl" 
}: FormSelectorProps) {
  const t = useMemo(() => localeContent[locale] || localeContent.nl, [locale])
  
  return (
    <div className={cn("grid gap-4", className)}>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <Card
            key={form.id}
            className="flex flex-col h-full cursor-pointer transition-all hover:shadow-md"
            onClick={() => onSelect(form.id)}
          >
            <CardHeader className="pb-2 flex-grow">
              <CardTitle className="text-lg">{form.title}</CardTitle>
              <CardDescription className="line-clamp-4">{form.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button variant="outline" className="w-full">
                {t.selectButton}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
})
