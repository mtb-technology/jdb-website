import TopicPage from "@/app/onderwerpen/[topic]/page";
import { generatePageMetadata } from "@/lib/metadata";

interface TopicPageProps {
  params: {
    topic: string;
    locale?: string;
  };
}

export const generateMetadata = generatePageMetadata;

export default async function LocalizedPage({ params }: TopicPageProps) {
  return <TopicPage params={{ topic: params.topic, locale: 'en' }} />;
} 