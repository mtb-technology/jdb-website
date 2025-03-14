import ChatWindow from "@/components/chat/ChatWindow";
import Footer from "@/components/Footer";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import Header from "../components/Header";
import { getChatDictionary } from "./chat/dictionary";
import { getDictionary } from "./dictionaries";

type PageParams = Promise<{
  locale: SupportedLocale;
}>;

type PageProps = {
  params: PageParams;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  return generatePageMetadata({
    params: resolvedParams,
  });
};

export default async function Home({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "nl";
  const dict = await getDictionary(locale);
  const chatDict = getChatDictionary(locale, "home");
  //const homeDict = dict.pages.home;

  return (
    <main className="relative flex-1 flex flex-col">
      <Header dict={dict} />
      <div className="flex-1 flex items-center justify-center">
        <ChatWindow dict={chatDict} />
      </div>
      <Footer hideOnMobile={true} dict={dict} />
    </main>
  );
}
