import { Dictionary } from "@/app/dictionaries/types";
import "server-only";
import type { Locale } from "../i18n-config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default as unknown as Dictionary),
  nl: () => import('@/dictionaries/nl.json').then((module) => module.default as unknown as Dictionary),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
} 