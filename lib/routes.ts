interface TopicMapping {
  [key: string]: string;
}

interface ChatMapping {
  [key: string]: string;
}

interface RouteMapping {
  [key: string]: string;
}

interface Routes {
  [key: string]: {
    nl: string;
    en: string;
  };
}

export const routes: Routes = {
  "home": {
    nl: "",
    en: ""
  },
  "how-it-works": {
    nl: "hoe-werkt-het",
    en: "how-it-works"
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
  "topics": {
    nl: "onderwerpen",
    en: "topics"
  },
  "tax-advisor": {
    nl: "belastingaangifte-laten-doen",
    en: "tax-advisor"
  },
  "income-tax-return": {
    nl: "belastingaangifte",
    en: "income-tax-return"
  },
  "m-form": {
    nl: "m-formulier",
    en: "m-form"
  },
  "tax-credit": {
    nl: "aftrekposten-en-kortingen",
    en: "tax-credit"
  },
  "inheritance-tax": {
    nl: "erfbelasting",
    en: "inheritance-tax"
  },
  "private-limited-company": {
    nl: "besloten-vennootschap",
    en: "private-limited-company"
  },
  "entrepreneur": {
    nl: "ondernemer",
    en: "entrepreneur"
  },
  "healthcare-allowance": {
    nl: "zorgtoeslag",
    en: "healthcare-allowance"
  },
  "housing-allowance": {
    nl: "huurtoeslag",
    en: "housing-allowance"
  },
  "childcare-allowance": {
    nl: "kinderopvangtoeslag",
    en: "childcare-allowance"
  },
  "child-benefit": {
    nl: "kinderbijslag",
    en: "child-benefit"
  },
  "general-old-age-act": {
    nl: "aow",
    en: "general-old-age-act"
  },
  "income-general-old-age-act": {
    nl: "inkomen-aow",
    en: "income-general-old-age-act"
  },
  "chat": {
    nl: "chat",
    en: "chat"
  }
};

export const chatENToDictionaryKey: ChatMapping = {
  'income-tax-return': 'income-tax-return',
  'private-limited-company': 'private-company',
  'entrepreneur': 'entrepreneur',
  'm-form': 'm-form',
  'tax-return-checklist': 'tax-return-checklist',
  'child-benefit-assistent': 'child-benefit',
  'general-questions': 'general-questions',
  'general-old-age-act': 'general-old-age-act',
  'healthcare-allowance': 'healthcare-allowance'
};

export const chatNLToDictionaryKey: ChatMapping = {
  'belastingaangifte': 'income-tax-return',
  'besloten-vennootschap': 'private-company',
  'ondernemer': 'entrepreneur',
  'm-formulier': 'm-form',
  'belastingaangifte-checklist': 'tax-return-checklist',
  'kindertoeslag': 'child-benefit',
  'algemene-vragen': 'general-questions',
  'algemene-ouderdomswet': 'general-old-age-act',
  'zorgtoeslag': 'health-care-allowance'
};

export const topicENToDictionaryKey: TopicMapping = {
  'tax-advisor': 'tax-advisor',
  'income-tax-return': 'income-tax-return',
  'm-form': 'm-form',
  'tax-credit': 'tax-credit',
  'inheritance-tax': 'inheritance-tax',
  'private-limited-company': 'private-limited-company',
  'entrepreneur': 'entrepreneur',
  'healthcare-allowance': 'healthcare-allowance',
  'housing-allowance': 'housing-allowance',
  'childcare-allowance': 'childcare-allowance',
  'child-benefit': 'child-benefit',
  'general-old-age-act': 'general-old-age-act',
  'income-general-old-age-act': 'income-general-old-age-act',
};

export const topicNLToDictionaryKey: TopicMapping = {
  'belastingaangifte-laten-doen': 'tax-advisor',
  'belastingaangifte': 'income-tax-return',
  'm-formulier': 'm-form',
  'aftrekposten-en-kortingen': 'tax-credit',
  'erfbelasting': 'inheritance-tax',
  'besloten-vennootschap': 'private-limited-company',
  'ondernemer': 'entrepreneur',
  'zorgtoeslag': 'healthcare-allowance',
  'huurtoeslag': 'housing-allowance',
  'kinderopvangtoeslag': 'childcare-allowance',
  'kinderbijslag': 'child-benefit',
  'aow': 'general-old-age-act',
  'inkomen-aow': 'income-general-old-age-act',
};

export const routeNLToDictionaryKey: RouteMapping = {
  '': 'home',
  'hoe-werkt-het': 'how-it-works',
  'blog': 'blog',
  'over-ons': 'about-us',
  'vind-een-adviseur': 'find-advisor',
  'onderwerpen': 'topics',
  'chat': 'chat'
};

export const routeENToDictionaryKey: RouteMapping = {
  '': 'home',
  'how-it-works': 'how-it-works',
  'blog': 'blog',
  'about-us': 'about-us',
  'find-advisor': 'find-advisor',
  'topics': 'topics',
  'chat': 'chat'
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

  // Get the appropriate mappings based on locale
  const routeMapping = locale === "en" ? routeENToDictionaryKey : routeNLToDictionaryKey;
  const topicMapping = locale === "en" ? topicENToDictionaryKey : topicNLToDictionaryKey;

  // Translate each segment
  const translatedSegments = segments.map(segment => {
    // First check in routes, then in topics
    const routeKey = Object.entries(routeMapping).find(([key]) => key === segment)?.[1];
    const topicKey = Object.entries(topicMapping).find(([key]) => key === segment)?.[1];

    const key = routeKey || topicKey;

    if (key) {
    // If found in either mapping, get the localized version
      if (routeKey) {
        return locale === "en" ? routeENToDictionaryKey[key] : routeNLToDictionaryKey[key];
      } else {
        return locale === "en" ? topicENToDictionaryKey[key] : topicNLToDictionaryKey[key];
      }
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