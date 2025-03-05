import { getDictionary } from "@/app/dictionaries";
import ChatWindow from "@/components/chat/ChatWindow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";

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

export const generateMetadata = async ({ params }: HomePageProps) => {
  const resolvedParams = await params;
  return generatePageMetadata({
    params: resolvedParams,
  });
};

export default async function Home({ params }: HomePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "nl";
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
