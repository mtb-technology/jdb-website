import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SupportedLocale } from "@/lib/types";
import { getDictionary } from "../../dictionaries";
import AdvisorFinder from "./AdvisorFinder";

interface VindEenAdviseurPageProps {
  params: {
    locale: SupportedLocale;
  };
}

export default async function VindEenAdviseurPage({
  params,
}: VindEenAdviseurPageProps) {
  const locale = params.locale || "nl";
  const dict = await getDictionary(locale);
  //const howItWorks = dict.pages["how-it-works"] as HowItWorksDict;

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Find an Advisor Content */}
          <AdvisorFinder dict={dict.pages["find-advisor"]} locale={locale} />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
