import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FAQAndBlogSection from "@/components/sections/FAQAndBlogSection";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StepsSection from "@/components/sections/StepsSection";
import SupportSection from "@/components/sections/SupportSection";
import { getDictionary } from "@/lib/getDictionary";
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
type DictionaryKeys = keyof Dictionary['pages'];

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
    imageAlt: string;
    stats: string;
  };
  partners: {
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
  steps: Step[];
}

export default async function TopicPage({ params }: TopicPageProps) {
  const locale = params.locale || 'nl';
  const dict = await getDictionary(locale as SupportedLocale);
  const { topic } = params;
  let dictionaryKey: string;
  // Get the dictionary key for this topic
  if (locale === 'nl') {
    dictionaryKey = topicNLToDictionaryKey[topic];
  } else {
    dictionaryKey = topicENToDictionaryKey[topic];
  }
  
  // If we don't have a mapping for this topic, show 404
  if (!dictionaryKey || !(dictionaryKey in dict.pages)) {
    console.log('No dictionary key found for topic:', topic, dictionaryKey);
    notFound();
  }
  
  // Get the topic-specific content using the dictionary key
  const topicContent = dict.pages[dictionaryKey as DictionaryKeys] as PageContent;
  
  // If the topic content doesn't exist, show 404
  if (!topicContent) {
    console.log('No content found for dictionary key:', dictionaryKey);
    notFound();
  }

  const { hero, partners, support, steps, faq } = topicContent;

  const heroContent = {
    ...hero,
    image: {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scherm%C2%ADafbeelding%202025-02-26%20om%2016.23.59-oYubQJhKr5eN7kW099wpXbYm9rVhOR.png",
      alt: hero.imageAlt,
      width: 400,
      height: 240,
    }
  };
  

  return (
    <main className="flex-1 flex flex-col relative">
      <Header />
      <div className="pt-22 overflow-y-auto h-[calc(100vh)]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <HeroSection {...heroContent} />
          <PartnersSection partners={partners.items} />
          <SupportSection {...support} />
          <StepsSection steps={steps} />
          <FAQAndBlogSection 
            {...faq}
          />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}


