"use client"

import { FormMeta, getFormById, getFormMetas } from "@/app/forms/forms"
import { DynamicForm } from "@/components/forms/dynamic-form"
import { FormSelector } from "@/components/forms/form-selector"
import { Button } from "@/components/ui/button"
import type { SupportedLocale } from "@/lib/types"
import { useCallback, useEffect, useMemo, useState } from "react"

const localeContent = {
  nl: {
    title: "Jan de Belastingman",
    subtitle: "Deskundige en persoonlijke hulp bij aangifte inkomstenbelasting",
    loading: "Formulieren laden...",
    noForms: "Geen formulieren gevonden. Controleer de JSON-configuratie.",
    backToForms: "← Terug naar formulieren",
    whatHappens: "Wat gebeurt er als ik op",
    click: "klik?",
    confirmation: "Je krijgt een bevestiging per e-mail (hiermee kun je je ook uitschrijven).",
    contact: "Een adviseur neemt binnen 2 werkdagen contact op via email.",
    noMatch: "Indien we niemand vinden laten we dit ook weten.",
    formNotFound: "Formulier niet gevonden. Ga terug naar de formulierenselectie.",
    backToSelection: "Terug naar formulieren",
  },
  en: {
    title: "John the Tax Man",
    subtitle: "Expert and personal assistance with income tax returns",
    loading: "Loading forms...",
    noForms: "No forms found. Check the JSON configuration.",
    backToForms: "← Back to forms",
    whatHappens: "What happens when I",
    click: "click?",
    confirmation: "You will receive a confirmation by email (which you can also use to unsubscribe).",
    contact: "An advisor will contact you within 2 business days via email.",
    noMatch: "If we cannot find anyone, we will also let you know.",
    formNotFound: "Form not found. Go back to form selection.",
    backToSelection: "Back to forms",
  },
}

interface FormManagerProps {
  locale: SupportedLocale
}

export default function FormManager({locale}: FormManagerProps) {
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formMetas, setFormMetas] = useState<FormMeta[]>([])
  const [error, setError] = useState<string | null>(null)

  const t = useMemo(() => localeContent[locale] || localeContent.nl, [locale])

  useEffect(() => {
    setIsLoading(true)
    try {
      const metas = getFormMetas(locale)
      setFormMetas(metas)
      setError(null)
    } catch (error) {
      console.error("Error loading form metas:", error)
      setError("Failed to load forms")
    } finally {
      setIsLoading(false)
    }
  }, [locale])

  const selectedForm = useMemo(
    () => (selectedFormId ? getFormById(selectedFormId, locale) : null),
    [selectedFormId, locale],
  )

  const handleFormSelect = useCallback((formId: string) => {
    setSelectedFormId(formId)
  }, [])

  const handleBackToSelector = useCallback(() => {
    setSelectedFormId(null)
  }, [])

  const handleSubmit = useCallback(async (values: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Error submitting form:", error)
      return false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t.title}</h1>
        </div>
        <p className="text-lg mb-8">{t.subtitle}</p>
        <div className="flex justify-center items-center h-40">
          <p>{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>
      </div>
      <p className="text-lg mb-8">{t.subtitle}</p>

      {error || formMetas.length === 0 ? (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md mb-4">
          <p className="text-red-700">{error || t.noForms}</p>
        </div>
      ) : !selectedFormId ? (
        <FormSelector forms={formMetas} onSelect={handleFormSelect} className="mb-8" locale={locale} />
      ) : selectedForm ? (
        <div>
          <div className="mb-4">
            <Button variant="outline" onClick={handleBackToSelector} className="mb-4">
              {t.backToForms}
            </Button>
          </div>
          <DynamicForm config={selectedForm} onSubmit={handleSubmit} locale={locale} />

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {t.whatHappens} "{selectedForm.submitButtonText}" {t.click}
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>{t.confirmation}</li>
              <li>{t.contact}</li>
              <li>{t.noMatch}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-md">
          <p className="text-yellow-700">{t.formNotFound}</p>
          <Button variant="outline" onClick={handleBackToSelector} className="mt-2">
            {t.backToSelection}
          </Button>
        </div>
      )}
    </div>
  )
}

