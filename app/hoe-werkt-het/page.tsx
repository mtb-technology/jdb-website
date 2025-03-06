import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { MessageCircle, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../dictionaries";

interface HowItWorksDict {
  locale: SupportedLocale;
  title: string;
  steps: {
    title: string;
    description: string;
    image: string;
    alt: string;
    icon: string;
  }[];
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
}

interface HowItWorksPageProps {
  params: {
    locale: SupportedLocale;
  };
}

export const generateMetadata = generatePageMetadata;

export default async function HowItWorksPage({ params }: HowItWorksPageProps) {
  const locale = params.locale || "nl";
  const dict = await getDictionary(locale);
  const howItWorks = dict.pages["how-it-works"] as HowItWorksDict;

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Steps Section */}
          <StepsSection {...howItWorks} locale={locale} />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}

function StepsSection({ title, steps, buttons, locale }: HowItWorksDict) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-3 mt-0 text-center">{title}</h1>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="mr-4 sm:mr-6 flex-shrink-0">
                  {step.icon === "message-circle" && (
                    <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  )}
                  {step.icon === "users" && (
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  )}
                  {step.icon === "user-plus" && (
                    <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold sm:hidden">
                  {step.title}
                </h3>
              </div>

              <div className="flex-1 sm:pr-6">
                <h3 className="text-xl font-bold mb-4 hidden sm:block">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>

              <div className="w-full sm:w-1/3 mt-4 sm:mt-0 sm:ml-6">
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={step.image || "/placeholder.svg"}
                    alt={step.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <div className="text-center">
          <Button
            asChild
            className="w-full bg-primary text-white hover:bg-[#2341C7] transition-colors duration-300 py-3 sm:py-4"
          >
            <Link href={locale === "nl" ? "/" : "/en/"}>
              {buttons.chat.text}
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-2">{buttons.chat.subtext}</p>
        </div>
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="w-full border-primary text-primary hover:bg-[#EEF2FF] transition-colors duration-300 py-3 sm:py-4"
          >
            <Link
              href={locale === "nl" ? "/vind-een-adviseur" : "/en/find-advisor"}
            >
              {buttons.advisor.text}
            </Link>
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            {buttons.advisor.subtext}
          </p>
        </div>
      </div>
    </div>
  );
}
