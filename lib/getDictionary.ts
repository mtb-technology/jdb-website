import type { Locale } from '@/config/i18n.config';
import 'server-only';

const dictionaries = {
  nl: () => import('@/dictionaries/nl.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
}; 