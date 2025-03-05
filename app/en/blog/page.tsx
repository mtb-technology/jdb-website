// @ts-nocheck
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import BlogPage from "../../blog/page";

// Types for generateMetadata
type MetadataParams = {
  locale: SupportedLocale;
};

type MetadataProps = {
  params: MetadataParams;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Types for Page component
type PageParams = Promise<{
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

export default async function Page({ params, searchParams }: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  return (
    <BlogPage
      searchParams={resolvedSearchParams}
      params={{ ...resolvedParams, locale: "en" }}
    />
  );
}
