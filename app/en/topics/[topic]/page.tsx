import TopicPage from "@/app/onderwerpen/[topic]/page";
import { generatePageMetadata } from "@/lib/metadata";
import { topicENToDictionaryKey } from "@/lib/routes";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";

type PageParams = Promise<{
  topic: string;
  locale: SupportedLocale;
}>;

type PageProps = {
  params: PageParams;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  return generatePageMetadata({
    params: { ...resolvedParams, locale: "en" },
  });
};

export async function generateStaticParams() {
  // Get all unique chat routes for both languages
  const enRoutes = Object.keys(topicENToDictionaryKey);

  // Generate params for EN routes
  const params = [
    // EN routes need locale in the URL
    ...enRoutes.map((topic) => ({
      topic,
      locale: "en",
    })),
  ];

  return params;
}

export default async function LocalizedPage({
  params,
  searchParams,
}: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  return <TopicPage params={{ topic: resolvedParams.topic, locale: "en" }} />;
} 