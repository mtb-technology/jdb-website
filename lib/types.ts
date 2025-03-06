export type SupportedLocale = 'nl' | 'en';

export interface PageMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

// Base metadata for all pages
export interface BaseMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
  twitterTitle: string;
  twitterDescription: string;
}

// Page-specific metadata structure
export interface PageSpecificMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

// Metadata for all routes/pages
export interface MetadataTranslations extends BaseMetadata {
  pages: {
    home: PageSpecificMetadata;
    topics: PageSpecificMetadata;
    'free-tax-advice': PageSpecificMetadata;
    'income-tax-return': PageSpecificMetadata;
    'm-form': PageSpecificMetadata;
    'healthcare-allowance': PageSpecificMetadata;
    'rent-allowance': PageSpecificMetadata;
    'childcare-allowance': PageSpecificMetadata;
    'child-budget': PageSpecificMetadata;
    'private-company': PageSpecificMetadata;
    'self-employed': PageSpecificMetadata;
    'tax-deductions': PageSpecificMetadata;
    'inheritance-tax': PageSpecificMetadata;
    'state-pension': PageSpecificMetadata;
    'additional-income-pension': PageSpecificMetadata;
    'find-advisor': AdvisorFinderDict;
    blog: PageSpecificMetadata;
  };
}

export interface CommonQuestions {
  deductions: string;
  vatReturn: string;
  box3: string;
  businessStructure: string;
  more: string;
}

export interface FooterLinks {
  home: string;
  about: string;
  contact: string;
  privacy: string;
  terms: string;
}


export interface AdvisorFinderDict {
  title: string;
  subtitle: string;
  intro: {
    text: string;
    benefits: string[];
    networkDescription: string;
  };
  categories: {
    id: string;
    title: string;
    description: string;
  }[];
  form: {
    title: string;
    backButton: string;
    fields: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: {
        label: string;
        placeholder: string;
      };
    };
    privacyConsent: string;
    submitButton: string;
  };
  success: {
    title: string;
    message: string;
    newRequestButton: string;
  };
  testimonials: {
    title: string;
    items: {
      name: string;
      role: string;
      quote: string;
      avatar: string;
    }[];
  };
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  promise: {
    title: string;
    items: string[];
  };
}

