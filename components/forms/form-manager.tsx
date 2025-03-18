<<<<<<< ours
"use client"

import { FormMeta, getFormById, getFormMetas } from "@/app/forms/forms"
import { DynamicForm } from "@/components/forms/dynamic-form"
import { FormSelector } from "@/components/forms/form-selector"
import { Button } from "@/components/ui/button"
import type { SupportedLocale } from "@/lib/types"
import { useCallback, useEffect, useMemo, useState } from "react"

const localeContent = {
  nl: {
    title: "Waar heb je hulp bij nodig?",
    loading: "Formulieren laden...",
    noForms: "Geen formulieren gevonden. Probeer het later aub opnieuw.",
    backToForms: "← Terug naar categorieën",
    formNotFound: "Formulier niet gevonden. Ga terug naar de formulierenselectie.",
    backToSelection: "Terug naar categorieën",
  },
  en: {
    title: "What do you need help with?",
    loading: "Loading forms...",
    noForms: "No forms found. Please try again later.",
    backToForms: "← Back to categories",
    formNotFound: "Form not found. Go back to form selection.",
    backToSelection: "Back to categories",
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
    console.log(formId)
    setSelectedFormId(formId)
  }, [])

  const handleBackToSelector = useCallback(() => {
    setSelectedFormId(null)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{t.title}</h2>
        </div>
        <div className="flex justify-center items-center h-40">
          <p>{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-center">{t.title}</h2>
      </div>
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
          <DynamicForm config={selectedForm} className="mb-8" locale={locale} />
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

|||||||
=======
"use client"

import { FormMeta, getFormById, getFormMetas } from "@/app/forms/forms"
import { DynamicForm } from "@/components/forms/dynamic-form"
import { FormSelector } from "@/components/forms/form-selector"
import { Button } from "@/components/ui/button"
import type { SupportedLocale } from "@/lib/types"
import { useCallback, useEffect, useMemo, useState } from "react"

const localeContent = {
  nl: {
    title: "Waar heb je hulp bij nodig?",
    loading: "Formulieren laden...",
    noForms: "Geen formulieren gevonden. Probeer het later aub opnieuw.",
    backToForms: "← Terug naar categorieën",
    formNotFound: "Formulier niet gevonden. Ga terug naar de formulierenselectie.",
    backToSelection: "Terug naar categorieën",
  },
  en: {
    title: "What do you need help with?",
    loading: "Loading forms...",
    noForms: "No forms found. Please try again later.",
    backToForms: "← Back to categories",
    formNotFound: "Form not found. Go back to form selection.",
    backToSelection: "Back to categories",
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

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{t.title}</h2>
        </div>
        <div className="flex justify-center items-center h-40">
          <p>{t.loading}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-2xl font-bold text-center">{t.title}</h2>
      </div>

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
          
          <DynamicForm config={selectedForm} className="mb-8" locale={locale} />

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

>>>>>>> theirs
