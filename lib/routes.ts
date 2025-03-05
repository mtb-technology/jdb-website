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
  'aangifte-inkomstenbelasting': 'income-tax-return',
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
    "tax-advisor": {
      nl: "onderwerpen/belastingaangifte-laten-doen",
      en: "topics/tax-advisor"
    },
    "income-tax-return": {
      nl: "onderwerpen/belastingaangifte",
      en: "topics/income-tax-return"
    },
    "m-form": {
      nl: "onderwerpen/m-form",
      en: "topics/m-form"
    },
    "tax-credit": {
      nl: "onderwerpen/aftrekposten-en-kortingen",
      en: "topics/tax-credit"
    },
    "inheritance-tax": {
      nl: "onderwerpen/erfbelasting",
      en: "topics/inheritance-tax"
    },
    "private-limited-company": {
      nl: "onderwerpen/besloten-vennootschap",
      en: "topics/private-limited-company"
    },
    "self-employed-professional": {
      nl: "onderwerpen/zelfstandigen-zonder-personeel",
      en: "topics/self-employed-professional"
      },
    "healthcare-allowance": {
      nl: "onderwerpen/zorgtoeslag",
      en: "topics/healthcare-allowance"
    },
    "housing-allowance": {
      nl: "onderwerpen/huurtoeslag",
      en: "topic/housing-allowance"
    },
    "childcare-allowance": {
      nl: "onderwerpen/kinderopvangtoeslag",
      en: "topics/childcare-allowance"
    },
    "child-benefit": {
      nl: "onderwerpen/kinderbijslag",
      en: "topics/child-benefit"
    },
    "aow-pension": {
      nl: "onderwerpen/aow-pensioen",
      en: "topics/aow-pension"
    },
    "income-aow-pension": {
      nl: "onderwerpen/inkomen-aow-pensioen",
      en: "topics/income-aow-pension"
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