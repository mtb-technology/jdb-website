import { SupportedLocale } from "@/lib/types";
import chatDictionaries from "./dictionaries.json";

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

export type ChatType = keyof typeof chatDictionaries.nl;

export function getChatDictionary(locale: SupportedLocale, chatType: ChatType): ChatSpecificDictionary {
  const chatDict = chatDictionaries[locale][chatType] as ChatSpecificDictionary;

  if (!chatDict) {
    console.warn(`Warning: No dictionary found for chat type: ${chatType}`);
    return {} as ChatSpecificDictionary;
  }

  return chatDict;
} 