import "server-only";
import type { Locale } from "../i18n-config";

interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    twitterTitle: string;
    twitterDescription: string;
  };
  pages: {
    "private-company": {
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
        imageAlt: string;
        stats: string;
      };
      partners: {
        items: Array<{
          src: string;
          alt: string;
          width: number;
        }>;
      };
      support: {
        title: string;
        description: string;
        buttonText: string;
        buttonSubtext: string;
        buttonLink: string;
        imageSrc: string;
        imageAlt: string;
      };
      steps: Array<{
        title: string;
        description: string;
        image: string;
        alt: string;
        showButton?: boolean;
      }>;
      faq: {
        title: string;
        buttonText: string;
        buttonLink: string;
        faqItems: Array<{
          question: string;
          answer: string;
        }>;
        blogArticles: Array<{
          title: string;
          link: string;
        }>;
      };
    };
    "about-us": {
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
    };
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
    topics: {
      metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
      };
    };
    "free-tax-advice": {
      metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
      };
    };
    "income-tax-return": {
      metadata: {
        title: string;
        description: string;
        ogTitle: string;
        ogDescription: string;
      };
    };
    "how-it-works": {
      title: string;
      steps: Array<{
        title: string;
        description: string;
        image: string;
        alt: string;
        icon: string;
      }>;
      buttons: {
        chat: {
          text: string;
          subtext: string;
        };
        advisor: {
          text: string;
          subtext: string;
        };
      };
    };
    "find-advisor": {
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
      faq: {
        title: string;
        items: Array<{
          question: string;
          answer: string;
        }>;
      };
      promise: {
        title: string;
        items: string[];
      };
    };
    blog: {
      title: string;
      description: string;
      allCategories: string;
      loadMore: string;
      newsletter: {
        title: string;
        description: string;
        emailPlaceholder: string;
        subscribeButton: string;
      };
    };
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((module) => module.default),
  nl: () => import("./nl.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale](); 