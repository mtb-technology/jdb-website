import { SupportedLocale } from "./types";

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
  'home': {
    nl: '',
    en: ''
  },
  'how-it-works': {
    nl: 'hoe-werkt-het',
    en: 'how-it-works'
  },
  'blog': {
    nl: 'blog',
    en: 'blog'
  },
  'about-us': {
    nl: 'over-ons',
    en: 'about-us'
  },
  'find-advisor': {
    nl: 'vind-een-adviseur',
    en: 'find-advisor'
  },
  'topics': {
    nl: 'onderwerpen',
    en: 'topics'
  },
  'topics/tax-advisor': {
    nl: 'onderwerpen/belastingaangifte-laten-doen',
    en: 'topics/tax-advisor'
  },
  'topics/income-tax-return': {
    nl: 'onderwerpen/belastingaangifte',
    en: 'topics/income-tax-return'
  },
  'topics/m-form': {
    nl: 'onderwerpen/m-formulier',
    en: 'topics/m-form'
  },
  'topics/tax-credit': {
    nl: 'onderwerpen/aftrekposten-en-kortingen',
    en: 'topics/tax-credit'
  },
  'topics/inheritance-tax': {
    nl: 'onderwerpen/erfbelasting',
    en: 'topics/inheritance-tax'
  },
  'topics/private-company': {
    nl: 'onderwerpen/besloten-vennootschap',
    en: 'topics/private-limited-company'
  },
  'topics/entrepreneur': {
    nl: 'onderwerpen/ondernemer',
    en: 'topics/entrepreneur'
  },
  'topics/healthcare-allowance': {
    nl: 'onderwerpen/zorgtoeslag',
    en: 'topics/healthcare-allowance'
  },
  'topics/housing-allowance': {
    nl: 'onderwerpen/huurtoeslag',
    en: 'topics/housing-allowance'
  },
  'topics/childcare-allowance': {
    nl: 'onderwerpen/kinderopvangtoeslag',
    en: 'topics/childcare-allowance'
  },
  'topics/child-benefit': {
    nl: 'onderwerpen/kinderbijslag',
    en: 'topics/child-benefit'
  },
  'topics/general-old-age-act': {
    nl: 'onderwerpen/aow',
    en: 'topics/general-old-age-act'
  },
  'topics/income-general-old-age-act': {
    nl: 'onderwerpen/inkomen-aow',
    en: 'topics/income-general-old-age-act'
  },
  'chat': {
    nl: 'chat',
    en: 'chat'
  },
  'chat/income-tax-return': {
    nl: 'chat/belastingaangifte',
    en: 'chat/income-tax-return'
  },
  'chat/private-company': {
    nl: 'chat/besloten-vennootschap',
    en: 'chat/private-limited-company'
  },
  'chat/entrepreneur': {
    nl: 'chat/ondernemer',
    en: 'chat/entrepreneur'
  },
  'chat/m-form': {
    nl: 'chat/m-formulier',
    en: 'chat/m-form'
  },
  'chat/tax-return-checklist': {
    nl: 'chat/belastingaangifte-checklist',
    en: 'chat/tax-return-checklist'
  },
  'chat/child-benefit': {
    nl: 'chat/kindertoeslag',
    en: 'chat/child-benefit-assistent'
  },
  'chat/general-questions': {
    nl: 'chat/algemene-vragen',
    en: 'chat/general-questions'
  },
  'chat/general-old-age-act': {
    nl: 'chat/algemene-ouderdomswet',
    en: 'chat/general-old-age-act'
  },
  'chat/healthcare-allowance': {
    nl: 'chat/zorgtoeslag',
    en: 'chat/healthcare-allowance'
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
  'healthcare-allowance': 'healthcare-allowance',
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
  'zorgtoeslag': 'healthcare-allowance',
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

export const routeNLToDictionaryKey: RouteMapping = {
  '': 'home',
  'hoe-werkt-het': 'how-it-works',
  'blog': 'blog',
  'over-ons': 'about-us',
  'vind-een-adviseur': 'find-advisor',
  'onderwerpen': 'topics',
  'chat': 'chat',
  'belastingchat': 'tax-chat'
};

export const routeENToDictionaryKey: RouteMapping = {
  '': 'home',
  'how-it-works': 'how-it-works',
  'blog': 'blog',
  'about-us': 'about-us',
  'find-advisor': 'find-advisor',
  'topics': 'topics',
  'chat': 'chat',
  'tax-chat': 'tax-chat'
};

export function getLocalizedPath(path: string, locale: SupportedLocale): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // If path is just the locale or empty, return /
  if (cleanPath === "" || cleanPath === locale) {
    return "/en";
  }

  // Split path into segments
  const segments = cleanPath.split("/");

  // Remove locale from start if present
  if (segments[0] === "nl" || segments[0] === "en") {
    segments.shift();
  }

  // Try to find the full path first in routes
  const fullPath = segments.join("/");
  const nlRoutes = Object.keys(routes).filter((route) => routes[route].nl === fullPath);
  const enRoutes = Object.keys(routes).filter((route) => routes[route].en === fullPath);
  const routeEntry = nlRoutes[0] || enRoutes[0];


  //const routeEntry = routes[fullPath];
  if (routeEntry) {
    const localizedPath = routes[routeEntry][locale];
    return locale === "en" ? `/en/${localizedPath}` : `/${localizedPath}`;
  }

  // If not found, try to translate each segment
  const translatedSegments = segments.map((segment, index) => {
    // Build the path up to this segment
    const pathUpToHere = segments.slice(0, index + 1).join("/");
    const routeEntry = routes[pathUpToHere];

    if (routeEntry) {
      // Get the last part of the translated path
      const translatedPath = routeEntry[locale];
      return translatedPath.split("/").pop() || segment;
    }

    return segment;
  });

  // Only include locale prefix for English
  return locale === "en"
    ? `/en/${translatedSegments.join("/")}`
    : `/${translatedSegments.join("/")}`;
}

export function getCurrentLocale(pathname: string): string {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "en" ? "en" : "nl";
} 