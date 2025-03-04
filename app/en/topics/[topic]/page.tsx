import TopicPage from "@/app/onderwerpen/[topic]/page";

interface TopicPageProps {
  params: {
    topic: string;
    locale?: string;
  };
}

export default async function LocalizedPage({ params }: TopicPageProps) {
  return <TopicPage params={{ topic: params.topic, locale: 'en' }} />;
} 