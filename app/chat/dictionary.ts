import { getLocalizedPath } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import chatDictionaries from "./dictionaries.json";

interface ChatSpecificDictionary {
  assistantId: number;
  assistantName: string;
  assistantDescription: string;
  helpQuestion: string;
  inputPlaceholder: string;
  commonQuestions: {
    [key: string]: string;
  };
}

export type ChatType = keyof typeof chatDictionaries.nl;

export function getChatDictionary(locale: SupportedLocale, chatType: ChatType): ChatSpecificDictionary | false {
  const chatDict = chatDictionaries[locale][chatType] as ChatSpecificDictionary;

  if (!chatDict) {
    console.warn(`Warning: No dictionary found for chat type: ${chatType}`);
    return false;
  }

  return chatDict;
} 

interface ChatEmployee {
  id: string;
  name: string;
  description: string;
}

export function getChatEmployees(locale: SupportedLocale): ChatEmployee[] {
  return Object.entries(chatDictionaries[locale] as unknown as Record<string, ChatSpecificDictionary>).map(([chatKey, chatEmployee]) => {
    return {
      id: getLocalizedPath(chatKey, locale),
      name: chatEmployee.assistantName,
      description: chatEmployee.assistantDescription,
    };
  });
}
