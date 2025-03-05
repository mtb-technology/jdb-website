import { generatePageMetadata } from "@/lib/metadata";
import BlogPage from "../../blog/page";

export const generateMetadata = generatePageMetadata;

interface BlogPageProps {
  params: {
    locale: SupportedLocale;
  };
  searchParams: {
    category?: string;
    page?: string;
  };
}

export default async function LocalizedPage({
  params,
  searchParams,
}: BlogPageProps) {
  return (
    <BlogPage
      searchParams={searchParams}
      params={{ ...params, locale: "en" }}
    />
  );
}
