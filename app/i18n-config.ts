export const i18n = {
  defaultLocale: "nl" as const,
  locales: ["nl", "en"] as const,
};

export type Locale = (typeof i18n.locales)[number]; 