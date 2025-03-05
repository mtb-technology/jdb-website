import { getDictionary } from "@/app/dictionaries";
import ChatWindow from "@/components/chat/ChatWindow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";

interface HomePageProps {
  params: {
    locale: SupportedLocale;
  };
}

export const generateMetadata = generatePageMetadata;

export default async function Home({ params }: HomePageProps) {
  const locale = params.locale || "nl";
  const dict = await getDictionary(locale);

  return (
    <main className="relative flex-1 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <ChatWindow dict={dict.pages.home} />
      </div>
      <Footer dict={dict} />
    </main>
  );
}
