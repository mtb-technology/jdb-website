import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StepsSection from "@/components/sections/StepsSection";
import SupportSection from "@/components/sections/SupportSection";
import { getDictionary } from "@/lib/getDictionary";

export default async function BVPage() {
  const dict = await getDictionary('nl');
  const { hero, partners, support, steps } = dict.pages.bv;

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
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
