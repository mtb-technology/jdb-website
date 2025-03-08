import { getLocalizedPath } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import chatDictionaries from "./dictionaries.json";

interface ChatSpecificDictionary {
  helpQuestion: string;
  inputPlaceholder: string;
  commonQuestions: {
    [key: string]: string;
  };
  assistantId?: number;
  assistantName?: string;
  assistantDescription?: string;
  selectable: boolean;
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
  selectable: boolean;
  id: string;
  name: string;
  description: string;
}

export function getChatEmployees(locale: SupportedLocale): ChatEmployee[] {
  return Object.entries(chatDictionaries[locale] as unknown as Record<string, ChatSpecificDictionary>)
    .map(([chatKey, chatEmployee]) => {
      if (!chatEmployee.assistantName || !chatEmployee.assistantDescription) {
        return null;
      }
      return {
        id: getLocalizedPath('chat/' + chatKey, locale),
        name: chatEmployee.assistantName,
        description: chatEmployee.assistantDescription,
        selectable: chatEmployee.selectable,
      };
    })
    .filter((employee): employee is ChatEmployee => employee !== null && employee.selectable);
}
