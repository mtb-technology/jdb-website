import { getDictionary } from "@/app/dictionaries";
import ChatWindow from "@/components/chat/ChatWindow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { chatENToDictionaryKey, chatNLToDictionaryKey } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import { notFound } from "next/navigation";
import { ChatType, getChatDictionary } from "../dictionary";

type PageParams = Promise<{
  employee: string;
  locale: SupportedLocale;
}>;

type HomePageProps = {
  params: PageParams;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateStaticParams() {
  // Get all unique chat routes for both languages
  const nlRoutes = Object.keys(chatNLToDictionaryKey);

  // Generate params for both NL and EN routes
  const params = [
    // NL routes don't need locale in the URL
    ...nlRoutes.map((employee) => ({
      employee,
      locale: "nl",
    })),
  ];

  return params;
}

export const generateMetadata = async ({ params }: HomePageProps) => {
  const resolvedParams = await params;
  return generatePageMetadata({
    params: resolvedParams,
  });
};

export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "nl";
  const employee = resolvedParams.employee;

  // Get the dictionary key based on locale
  const dictionaryKey =
    locale === "nl"
      ? chatNLToDictionaryKey[employee]
      : chatENToDictionaryKey[employee];

  if (!dictionaryKey) {
    notFound();
  }

  const chatDict = getChatDictionary(locale, dictionaryKey as ChatType);
  const dict = await getDictionary(locale);

  return (
    <main className="relative flex-1 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <ChatWindow dict={chatDict} />
      </div>
      <Footer dict={dict} />
    </main>
  );
}
