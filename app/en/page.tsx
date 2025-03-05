import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import { default as DefaultHome } from "../page";

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

export default async function LocalizedPage({
  params,
  searchParams,
}: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  return <DefaultHome params={{ ...resolvedParams, locale: "en" }} />;
} 