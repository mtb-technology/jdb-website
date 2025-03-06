interface RouteMapping {
  [key: string]: {
    nl: string;
    en: string;
  };
}

interface TopicMapping {
  [key: string]: string;
}

interface ChatMapping {
  [key: string]: string;
}

export const chatENToDictionaryKey: ChatMapping = {
  'income-tax-return': 'income-tax-return',
  'besloten-vennootschap-assist': 'private-limited-company-assist',
  'entrepreneurs-self-employed': 'entrepreneurs-self-employed',
  'm-form-assistant': 'm-form',
  'tax-return-checklist': 'tax-return-checklist',
  'child-benefit-assistent': 'child-benefit-assistant',
  'general-questions': 'general-questions',
  'general-old-age-act': 'general-old-age-act',
  'health-care-allowance-chat': 'health-care-allowance-chat',
  'belastingchat': 'tax-chat',
};

export const chatNLToDictionaryKey: ChatMapping = {
  'belastingaangifte': 'income-tax-return',
  'besloten-vennootschap-hulp': 'private-limited-company-assist',
  'ondernemers-zzp': 'entrepreneurs-self-employed',
  'm-form': 'm-form',
  'belastingaangifte-checklist': 'tax-return-checklist',
  'kindertoeslag': 'child-benefit-assistant',
  'algemene-vragen': 'general-questions',
  'algemene-ouderdomswet': 'general-old-age-act',
  'zorgtoeslag': 'health-care-allowance-chat',
  'expat-assistant': 'expat-assistant',
  'belastingchat': 'tax-chat',
};

export const topicENToDictionaryKey: TopicMapping = {
  'tax-advisor': 'tax-advisor',
  'income-tax-return': 'income-tax-return',
  'm-form': 'm-form',
  'tax-credit': 'tax-credit',
  'inheritance-tax': 'inheritance-tax',
  'private-limited-company': 'private-company',
  'self-employed-professional': 'self-employed-professional',
  'healthcare-allowance': 'healthcare-allowance',
  'housing-allowance': 'housing-allowance',
  'childcare-allowance': 'childcare-allowance',
  'child-benefit': 'child-benefit',
  'aow-pension': 'aow-pension',
  'income-aow-pension': 'income-aow-pension',
};

export const topicNLToDictionaryKey: TopicMapping = {
  'belastingaangifte-laten-doen': 'tax-advisor',
  'belastingaangifte': 'income-tax-return',
  'm-form': 'm-form',
  'aftrekposten-en-kortingen': 'tax-credit',
  'erfbelasting': 'inheritance-tax',
  'besloten-vennootschap': 'private-company',
  'zelfstandigen-zonder-personeel': 'self-employed-professional',
  'zorgtoeslag': 'healthcare-allowance',
  'huurtoeslag': 'housing-allowance',
  'kinderopvangtoeslag': 'childcare-allowance',
  'kinderbijslag': 'child-benefit',
  'aow-pensioen': 'aow-pension',
  'inkomen-aow-pensioen': 'income-aow-pension',
};

export const routes: RouteMapping = {
  //start pages
  "home": {
    nl: "",
    en: ""
  },
  "how-it-works": {
    nl: "hoe-werkt-het",
    en: "how-it-works"
  },
  "topics": {
    nl: "onderwerpen",
    en: "topics"
  },
  "bv": {
    nl: "besloten-vennootschap",
    en: "private-limited-company"
  },
  "tax-advisor": {
    nl: "elastingaangifte-laten-doen",
    en: "tax-advisor"
  },
  "blog": {
    nl: "blog",
    en: "blog"
  },
  "about-us": {
    nl: "over-ons",
    en: "about-us"
  },
  "find-advisor": {
    nl: "vind-een-adviseur",
    en: "find-advisor"
  },
  //end pages
  //start topics
  "onderwerpen": {
    nl: "onderwerpen",
    en: "topics"
  },
  //end topics
  //start chat
  "chat": {
    nl: "chat",
    en: "chat"
  },
  "income-tax-return": {
    nl: "belastingaangifte",
    en: "income-tax-return"
  }
};

export function getLocalizedPath(path: string, locale: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // If path is just the locale or empty, return /
  if (cleanPath === "" || cleanPath === locale) {
    return "/";
  }

  // Split path into segments
  const segments = cleanPath.split("/");

  // Remove locale from start if present
  if (segments[0] === "nl" || segments[0] === "en") {
    segments.shift();
  }

  // Translate each segment
  const translatedSegments = segments.map(segment => {
    // Find the route key that matches either nl or en value
    const routeKey = Object.entries(routes).find(([, values]) =>
      values.nl === segment || values.en === segment
    );

    console.log("routeKey", routeKey, Object.entries(routes), segment);

    if (routeKey) {
      return routeKey[1][locale as keyof typeof routeKey[1]];
    }
    return segment;
  });

  // Only include locale prefix for English
  return locale === "en"
    ? `/${locale}/${translatedSegments.join("/")}`
    : `/${translatedSegments.join("/")}`;
}

export function getCurrentLocale(pathname: string): string {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "en" ? "en" : "nl";
} 