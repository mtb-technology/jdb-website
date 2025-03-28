import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import { default as DefaultHome } from "../page";

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
    params: { ...resolvedParams, locale: "en" },
  });
};

export default async function LocalizedPage({
  params,
  searchParams,
}: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  return (
    <DefaultHome
      params={Promise.resolve({ ...resolvedParams, locale: "en" })}
      searchParams={Promise.resolve(resolvedSearchParams)}
    />
  );
} 