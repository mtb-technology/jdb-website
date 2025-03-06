// @ts-nocheck
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { jdbApi } from "@/lib/api/JDBApi";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { BlogContentClient } from "./components/BlogContentClient";

export const generateMetadata = generatePageMetadata;

interface PageProps {
  params: { locale?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({
  params = { locale: "nl" },
  searchParams = {},
}: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(locale || "nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Suspense fallback={<BlogLoadingSkeleton />}>
            <InitialBlogData
              searchParams={resolvedSearchParams}
              locale={locale || "nl"}
              dict={dict}
            />
          </Suspense>
        </div>
      </div>

      <Footer dict={dict} />
    </main>
  );
}

interface BlogSearchParams {
  category?: string | string[];
  page?: string | string[];
}

async function InitialBlogData({
  searchParams = {},
  locale,
  dict,
}: {
  searchParams: BlogSearchParams;
  locale: SupportedLocale;
  dict: Dictionary;
}) {
  // Fetch initial data
  const [categoriesResponse, postsResponse] = await Promise.all([
    jdbApi.getBlogCategories(locale),
    jdbApi.getBlogPosts({
      page: searchParams.page
        ? parseInt(
            Array.isArray(searchParams.page)
              ? searchParams.page[0]
              : searchParams.page
          )
        : 1,
      category: Array.isArray(searchParams.category)
        ? searchParams.category[0]
        : searchParams.category || "",
      locale,
    }),
  ]);

  const categories = [
    {
      name: {
        nl: dict.pages.blog.allCategories,
        en: dict.pages.blog.allCategories,
      },
      slug: {
        nl: "",
        en: "",
      },
    },
    ...categoriesResponse.categories,
  ];

  const activeCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "";

  return (
    <BlogContentClient
      initialPosts={postsResponse}
      categories={categories}
      locale={locale}
      dict={dict}
      activeCategory={activeCategory}
    />
  );
}

function BlogLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-16" />

      <div className="flex justify-center gap-3 mb-12">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
            <div className="h-48 bg-gray-200" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
