// @ts-nocheck
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { jdbApi } from "@/lib/api/JDBApi";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";

export const generateMetadata = generatePageMetadata;

export default async function Page() {
  const params = { locale: "nl" };
  const searchParams = { category: "", page: "" };
  const dict = await getDictionary("nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Suspense fallback={<BlogLoadingSkeleton />}>
            <BlogContent
              searchParams={searchParams}
              locale={params.locale}
              dict={dict}
            />
          </Suspense>
        </div>
      </div>

      <Footer dict={dict} />
    </main>
  );
}

async function BlogContent({
  searchParams = {},
  locale,
  dict,
}: {
  searchParams?: BlogSearchParams;
  locale: SupportedLocale;
  dict: Dictionary;
}) {
  // Fetch initial data
  const [categoriesResponse, postsResponse] = await Promise.all([
    jdbApi.getBlogCategories(locale),
    jdbApi.getBlogPosts({
      page: searchParams.page ? parseInt(searchParams.page) : 1,
      category: searchParams.category,
      locale,
    }),
  ]);

  const categories = [
    { name: dict.pages.blog.allCategories, slug: "" },
    ...categoriesResponse.categories,
  ];
  const posts = postsResponse.posts;
  const totalPages = postsResponse.meta.last_page;
  const activeCategory = searchParams.category || "";

  return (
    <div className="relative">
      {/* Blue background with wave */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[#2B4EE6] -z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Blog Content */}
      <div className="relative z-0 pt-12 pb-24">
        {/* Header and Subheader */}
        <header className="text-center text-black mb-16">
          <h1 className="text-4xl font-bold mb-4">{dict.pages.blog.title}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {dict.pages.blog.description}
          </p>
        </header>

        {/* Category Filters */}
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog${category.slug ? `?category=${category.slug}` : ""}`}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors 
                  ${category.slug === activeCategory ? "bg-[#2B4EE6] text-white" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image.thumbnail || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B4EE6] text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#2B4EE6] transition-colors">
                      {post.title}
                    </h2>
                    <time className="text-sm text-gray-500">
                      {new Date(post.published_at).toLocaleDateString(
                        locale === "nl" ? "nl-NL" : "en-US",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        {postsResponse.meta.current_page < totalPages && (
          <section className="max-w-6xl mx-auto px-6 mt-12 text-center">
            <Link
              href={`/blog?page=${postsResponse.meta.current_page + 1}`}
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 py-2 rounded-md"
            >
              {dict.pages.blog.loadMore}
            </Link>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto px-6 mt-24">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">
                {dict.pages.blog.newsletter.title}
              </h2>
              <p className="text-gray-600">
                {dict.pages.blog.newsletter.description}
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={dict.pages.blog.newsletter.emailPlaceholder}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B4EE6]"
                required
              />
              <Button className="bg-[#2B4EE6] text-white hover:bg-[#2341C7] whitespace-nowrap">
                {dict.pages.blog.newsletter.subscribeButton}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
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
