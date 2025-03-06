import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FAQAndBlogSection from "@/components/sections/FAQAndBlogSection";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StepsSection from "@/components/sections/StepsSection";
import SupportSection from "@/components/sections/SupportSection";
import { getDictionary } from "@/lib/getDictionary";
import { generatePageMetadata } from "@/lib/metadata";
import { topicENToDictionaryKey, topicNLToDictionaryKey } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import { notFound } from "next/navigation";

interface TopicPageProps {
  params: {
    topic: string;
    locale?: string;
  };
}

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
type DictionaryKeys = keyof Dictionary["topics"];

interface Partner {
  src: string;
  alt: string;
  width: number;
}

interface Step {
  title: string;
  description: string;
  image: string;
  alt: string;
  showButton?: boolean;
}

interface PageContent {
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
    imageAlt: string;
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
  };
  stepsSection: {
    buttonText: string;
    buttonLink: string;
    buttonSubtext: string;
    items: Step[];
  };
  faq: {
    title: string;
    faqTitle: string;
    blogTitle: string;
    faqItems: Array<{
      question: string;
      answer: string;
    }>;
    blogArticles: Array<{
      title: string;
      link: string;
    }>;
    buttonText: string;
    buttonLink: string;
  };
}

export async function generateStaticParams() {
  // Get all unique chat routes for both languages
  const nlRoutes = Object.keys(topicNLToDictionaryKey);
  const enRoutes = Object.keys(topicENToDictionaryKey);

  // Generate params for both NL and EN routes
  const params = [
    // NL routes don't need locale in the URL
    ...nlRoutes.map((topic) => ({
      topic,
      locale: "nl",
    })),
    // EN routes need locale in the URL
    ...enRoutes.map((topic) => ({
      topic,
      locale: "en",
    })),
  ];

  return params;
}

export const generateMetadata = generatePageMetadata;

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic, locale = "nl" } = await params;
  const dict = await getDictionary(locale as SupportedLocale);
  let dictionaryKey: string;
  // Get the dictionary key for this topic
  console.log("topic", topic);
  if (locale === "nl") {
    dictionaryKey = topicNLToDictionaryKey[topic];
  } else {
    dictionaryKey = topicENToDictionaryKey[topic];
  }

  console.log("dictionaryKey", dictionaryKey);
  console.log("dict", dict.topics[dictionaryKey]);

  // If we don't have a mapping for this topic, show 404
  if (!dictionaryKey || !(dictionaryKey in dict.topics)) {
    console.log("No dictionary key found for topic:", topic, dictionaryKey);
    notFound();
  }

  // Get the topic-specific content using the dictionary key
  const topicContent = dict.topics[
    dictionaryKey as DictionaryKeys
  ] as PageContent;

  // If the topic content doesn't exist, show 404
  if (!topicContent) {
    console.log("No content found for dictionary key:", dictionaryKey);
    notFound();
  }

  const { hero, partners, support, faq } = topicContent;

  console.log("hero", hero);

  return (
    <main className="flex-1 flex flex-col relative">
      <Header />
      <div className="pt-22 overflow-y-auto h-[calc(100vh)]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <HeroSection
            title={hero.title}
            description={hero.description}
            callToAction={hero.callToAction}
            buttonText={hero.buttonText}
            buttonSubtext={hero.buttonSubtext}
            buttonLink={hero.buttonLink}
            image={hero.image}
            stats={hero.stats}
          />
          <PartnersSection title={partners.title} partners={partners.items} />
          <SupportSection {...support} />
          <StepsSection
            steps={topicContent.stepsSection.items}
            buttonText={topicContent.stepsSection.buttonText}
            buttonLink={topicContent.stepsSection.buttonLink}
            buttonSubtext={topicContent.stepsSection.buttonSubtext}
          />
          <FAQAndBlogSection
            title={faq.title}
            faqTitle={faq.faqTitle}
            blogTitle={faq.blogTitle}
            faqItems={faq.faqItems}
            blogArticles={faq.blogArticles}
            buttonText={faq.buttonText}
            buttonLink={faq.buttonLink}
          />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}


