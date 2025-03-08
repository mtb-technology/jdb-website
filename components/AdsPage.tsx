import { getDictionary } from "@/app/dictionaries";
import { PageContent } from "@/app/dictionaries/types";
import { SupportedLocale } from "@/lib/types";
import Footer from "./Footer";
import Header from "./Header";
import FormSection from "./sections/FormSection";
import HeroSection from "./sections/HeroSection";
import PartnersSection from "./sections/PartnersSection";
import StepsSection from "./sections/StepsSection";
import SupportSection from "./sections/SupportSection";

export async function AdsPage({
  contentDict,
  locale,
}: {
  contentDict: PageContent;
  locale: SupportedLocale;
}) {
  const dict = await getDictionary(locale);

  const { hero, partners, support, stepsSection, form } = contentDict;

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
            steps={stepsSection.items}
            buttonText={stepsSection.buttonText}
            buttonLink={stepsSection.buttonLink}
            buttonSubtext={stepsSection.buttonSubtext}
          />

          {form && form.name && (
            <div className="container">
              <FormSection formName={form.name} />
            </div>
          )}
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
