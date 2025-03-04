interface RouteMapping {
  [key: string]: {
    nl: string;
    en: string;
  };
}

export const routes: RouteMapping = {
  home: {
    nl: "",
    en: ""
  },
  "how-it-works": {
    nl: "hoe-werkt-het",
    en: "how-it-works"
  },
  topics: {
    nl: "onderwerpen",
    en: "topics"
  },
  // "free-tax-advice": {
  //   nl: "gratis-belastingadvies",
  //   en: "free-tax-advice"
  // },
  // "income-tax-return": {
  //   nl: "aangifte-inkomstenbelasting",
  //   en: "income-tax-return"
  // },
  "m-form": {
    nl: "m-form",
    en: "m-form-assistant"
  },
  // "healthcare-allowance": {
  //   nl: "zorgtoeslag",
  //   en: "healthcare-allowance"
  // },
  // "rent-allowance": {
  //   nl: "huurtoeslag",
  //   en: "rent-allowance"
  // },
  // "childcare-allowance": {
  //   nl: "kinderopvangtoeslag",
  //   en: "childcare-allowance"
  // },
  // "child-budget": {
  //   nl: "kindgebonden-budget",
  //   en: "child-budget"
  // },
    "private-company": {
      nl: "onderwerpen/besloten-vennootschap",
      en: "topics/private-limited-company"
    },
  // "self-employed": {
  //   nl: "zzper",
  //   en: "self-employed"
  // },
  // "tax-deductions": {
  //   nl: "aftrekposten",
  //   en: "tax-deductions"
  // },
  // "inheritance-tax": {
  //   nl: "erfbelasting",
  //   en: "inheritance-tax"
  // },
  // "state-pension": {
  //   nl: "aow-uitkering",
  //   en: "state-pension"
  // },
  // "additional-income-pension": {
  //   nl: "extra-inkomen-aow",
  //   en: "additional-income-pension"
  // },
  // blog: {
  //   nl: "blog",
  //   en: "blog"
  // }
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