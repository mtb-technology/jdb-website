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
  'private-limited-company': 'private-company',
  'entrepreneur': 'entrepreneur',
  'm-form': 'm-form',
  'tax-return-checklist': 'tax-return-checklist',
  'child-benefit-assistent': 'child-benefit',
  'general-questions': 'general-questions',
  'general-old-age-act': 'general-old-age-act',
  'healthcare-allowance': 'healthcare-allowance',
  'tax': 'tax',
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
  'zorgtoeslag': 'health-care-allowance',
  'belasting': 'tax',
};

export const topicENToDictionaryKey: TopicMapping = {
  'tax-advisor': 'tax-advisor',
  'income-tax-return': 'income-tax-return',
  'm-form': 'm-form',
  'tax-credit': 'tax-credit',
  'inheritance-tax': 'inheritance-tax',
  'private-limited-company': 'private-company',
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
  'besloten-vennootschap': 'private-company',
  'ondernemer': 'entrepreneur',
  'zorgtoeslag': 'healthcare-allowance',
  'huurtoeslag': 'housing-allowance',
  'kinderopvangtoeslag': 'childcare-allowance',
  'kinderbijslag': 'child-benefit',
  'aow': 'general-old-age-act',
  'inkomen-aow': 'income-general-old-age-act',
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
  //end topics
  //start chat
  "chat": {
    nl: "chat",
    en: "chat"
  },
  "tax-chat": {
    nl: "belastingchat",
    en: "tax-chat"
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