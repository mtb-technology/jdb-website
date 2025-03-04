interface RouteMapping {
  [key: string]: {
    nl: string;
    en: string;
  };
}

interface TopicMapping {
  [key: string]: string;
}

export const topicENToDictionaryKey: TopicMapping = {
  'private-limited-company': 'private-company',
};

export const topicNLToDictionaryKey: TopicMapping = {
  'besloten-vennootschap': 'private-company',
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
    "incometax-return": {
      nl: "onderwerpen/belastingaangifte",
      en: "topics/incometax-return"
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const routeKey = Object.entries(routes).find(([_key, values]) => 
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