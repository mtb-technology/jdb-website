export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    twitterTitle?: string;
    twitterDescription?: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  pages: {
    home: {
      metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
      };
      helpQuestion: string;
      inputPlaceholder: string;
      commonQuestions: {
        deductions: string;
        vatReturn: string;
        box3: string;
        businessStructure: string;
        more: string;
      };
      disclaimer: string;
      knownFrom: string;
    };
    'how-it-works': {
      title: string;
      stepsSection: {
        buttonText: string;
        buttonLink: string;
        buttonSubtext: string;
        items: Step[];
      };
      buttons: {
        chat: Button;
        advisor: Button;
      };
    };
    'find-advisor': {
      title: string;
      subtitle: string;
      intro: {
        text: string;
        benefits: string[];
        networkDescription: string;
      };
      categories: Array<{
        id: string;
        title: string;
        description: string;
      }>;
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
        items: Array<{
          name: string;
          role: string;
          quote: string;
          avatar: string;
        }>;
      };
      faq: any;
      promise: {
        title: string;
        items: string[];
      };
    };
    'about-us': AboutUsPage;
    blog: {
      title: string;
      description: string;
      loading: string;
      loadMore: string;
      noPosts: string;
      allCategories: string;
      newsletter: {
        title: string;
        description: string;
        emailPlaceholder: string;
        subscribeButton: string;
      };
    };
    [key: string]: {
      [key: string]: any;
    };
  };
  topics: {
    [key: string]: PageContent;
  };
  ads: {
    [key: string]: PageContent;
  };
}

interface Partner {
  src: string;
  alt: string;
  width: number;
  url: string;
}

interface Step {
  title: string;
  description: string;
  image: string;
  alt: string;
  icon?: string;
  showButton?: boolean;
}

interface Button {
  text: string;
  subtext: string;
}

interface FAQ {
  title: string;
  faqTitle: string;
  blogTitle: string;
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  blogCategory?: string;
  buttonText: string;
  buttonLink: string;
}

export interface PageContent {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  };
  hero: {
    title: string;
    description: string;
    callToAction: string;
    buttonText: string;
    buttonSubtext: string;
    buttonLink: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    stats: string;
  };
  partners: {
    title: string;
    items: Partner[];
  };
  support: {
    title: string;
    description: string;
    buttonText: string;
    buttonSubtext: string;
    buttonLink: string;
    imageSrc: string;
    imageAlt: string;
    items?: Array<{
      title: string;
      description: string;
    }>;
  };
  stepsSection: {
    buttonText: string;
    buttonLink: string;
    buttonSubtext: string;
    items: Step[];
  };
  faq?: FAQ;
  form?: {
    name: string;
  };
}

interface AboutUsPage {
  title: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  team: {
    title: string;
    description: string;
    members: Array<{
      name: string;
      role: string;
      background: string;
      imageSrc: string;
    }>;
  };
  journey: {
    title: string;
    milestones: Array<{
      year: string;
      subtitle: string;
      description: string;
    }>;
  };
  partners: {
    title: string;
    description: string;
    types: Array<{
      title: string;
      description: string;
    }>;
  };
  mission: {
    title: string;
    description: string;
    points: string[];
  };
  vision: {
    title: string;
    description: string;
    points: string[];
  };
  cta: {
    title: string;
    description: string;
    buttons: {
      chat: string;
      howItWorks: string;
    };
  };
} 