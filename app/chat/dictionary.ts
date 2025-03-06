import { SupportedLocale } from "@/lib/types";
import chatDictionaries from "./dictionaries.json";

interface CommonDictionary {
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  disclaimer: string;
  knownFrom: string;
}

interface ChatSpecificDictionary {
  helpQuestion: string;
  inputPlaceholder: string;
  commonQuestions: {
    deductions: string;
    vatReturn: string;
    box3: string;
    businessStructure: string;
    more: string;
  };
}

export type ChatDictionary = CommonDictionary & ChatSpecificDictionary;

export type ChatType = keyof typeof chatDictionaries.nl;

const commonNLDictionary: CommonDictionary = {
  assistantId: 12,
  disclaimer: "Jan de Belastingman is een AI-assistent die je helpt met belastingvragen.\nDe antwoorden zijn informatief van aard en niet bedoeld als professioneel advies.",
  knownFrom: "Bekend van:",
  footer: {
    copyright: "© {year} Jan de Belastingman. Alle rechten voorbehouden.",
    privacy: "Privacy",
    terms: "Voorwaarden",
    contact: "Contact",
  },
};

const commonENDictionary: CommonDictionary = {
  disclaimer: "Jan de Belastingman is an AI assistant that helps you with tax questions.\nThe answers are informative in nature and not intended as professional advice.",
  knownFrom: "As featured in:",
  footer: {
    copyright: "© {year} Jan de Belastingman. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
  },
};

export function getChatDictionary(locale: SupportedLocale, chatType: ChatType): ChatDictionary {
  const commonDict = locale === "nl" ? commonNLDictionary : commonENDictionary;
  const chatDict = chatDictionaries[locale][chatType] as ChatSpecificDictionary;

  if (!chatDict) {
    throw new Error(`No dictionary found for chat type: ${chatType}`);
  }

  return {
    ...commonDict,
    ...chatDict,
  };
} 