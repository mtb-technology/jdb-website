import { getDictionary } from "@/app/dictionaries";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FAQAndBlogSection from "@/components/sections/FAQAndBlogSection";
import FormSection from "@/components/sections/FormSection";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StepsSection from "@/components/sections/StepsSection";
import SupportSection from "@/components/sections/SupportSection";
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

export async function generateStaticParams() {
  // Get all unique chat routes for both languages
  const nlRoutes = Object.keys(topicNLToDictionaryKey);

  // Generate params for EN routes
  const params = [
    // EN routes need locale in the URL
    ...nlRoutes.map((topic) => ({
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
  if (locale === "nl") {
    dictionaryKey = topicNLToDictionaryKey[topic] as string;
  } else {
    dictionaryKey = topicENToDictionaryKey[topic] as string;
  }

  // If we don't have a mapping for this topic, show 404
  if (!dictionaryKey || !Object.hasOwn(dict.topics, dictionaryKey)) {
    console.log("No dictionary key found for topic:", topic, dictionaryKey);
    notFound();
  }

  // Get the topic-specific content using the dictionary key
  const topicContent = dict.topics[dictionaryKey];

  // If the topic content doesn't exist, show 404
  if (!topicContent) {
    console.log("No content found for dictionary key:", dictionaryKey);
    notFound();
  }

  const { hero, partners, support, stepsSection, faq, form } = topicContent;

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="overflow-y-auto h-[calc(100vh)]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <HeroSection {...hero} />
          <PartnersSection title={partners.title} partners={partners.items} />
          <SupportSection
            title={support.title}
            description={support.description}
            buttonText={support.buttonText}
            buttonSubtext={support.buttonSubtext}
            buttonLink={support.buttonLink}
            imageSrc={support.imageSrc}
            imageAlt={support.imageAlt}
          />
          <StepsSection
            title={stepsSection.sectionTitle}
            steps={stepsSection.items}
            buttonText={stepsSection.buttonText}
            buttonLink={stepsSection.buttonLink}
            buttonSubtext={stepsSection.buttonSubtext}
          />
          {faq && (
            <div className="container">
              <FAQAndBlogSection
                title={faq.title}
                faqTitle={faq.faqTitle}
                blogTitle={faq.blogTitle}
                faqItems={faq.faqItems}
                blogCategory={faq.blogCategory || ""}
                buttonText={faq.buttonText}
                buttonLink={faq.buttonLink}
              />
            </div>
          )}

          {form && form.name && (
            <div className="container">
              <FormSection formName={form.name} locale={locale} />
            </div>
          )}
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
