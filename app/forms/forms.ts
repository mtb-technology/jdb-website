import type { FormConfig } from "@/components/forms/dynamic-form"
import type { SupportedLocale } from "@/lib/types"
import formsData from "./forms.json"

interface LocalizedFormsData {
  nl: FormConfig[]
  en: FormConfig[]
}

export interface FormMeta {
  id: string
  title: string
  description: string
}

export const formConfigs = formsData as unknown as LocalizedFormsData

const formMetasCache: Record<SupportedLocale, FormMeta[]> = {
  nl: [],
  en: [],
}

export const getFormById = (id: string, locale: SupportedLocale = "nl"): FormConfig | undefined => {
  if (!formConfigs[locale]) {
    console.error(`No forms found for locale: ${locale}`)
    return undefined
  }
  return formConfigs[locale].find((form) => form.id === id)
}

export const getFormMetas = (locale: SupportedLocale = "nl"): FormMeta[] => {
  if (formMetasCache[locale]?.length > 0) {
    return formMetasCache[locale]
  }

  if (!formConfigs[locale]) {
    console.error(`No forms found for locale: ${locale}`)
    return []
  }

  const metas = formConfigs[locale].map((form) => ({
    id: form.id,
    title: form.title,
    description: form.description || "",
  }))

  formMetasCache[locale] = metas
  return metas
}

