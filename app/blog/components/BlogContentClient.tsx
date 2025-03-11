"use client";

import type { Dictionary } from "@/app/dictionaries/types";
import { Button } from "@/components/ui/button";
import type { BlogPostsResponse, Post } from "@/lib/api/JDBApi";
import { jdbApi } from "@/lib/api/JDBApi";
import { SupportedLocale } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import NewsletterSubscription from "./NewsletterSubscription";

interface BlogContentClientProps {
  initialPosts: BlogPostsResponse;
  categories: Array<{
    name: {
      [key in SupportedLocale]: string;
    };
    slug: {
      [key in SupportedLocale]: string;
    };
  }>;
  locale: SupportedLocale;
  dict: Dictionary;
  activeCategory?: string;
}

function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="relative h-48 bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function BlogContentClient({
  initialPosts,
  categories,
  locale,
  dict,
  activeCategory = "",
}: BlogContentClientProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts.posts);
  const [currentPage, setCurrentPage] = useState(
    initialPosts.meta.current_page
  );
  const [totalPages, setTotalPages] = useState(initialPosts.meta.last_page);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setPosts([]); // Clear posts while loading
      try {
        const response = await jdbApi.getBlogPosts({
          page: 1,
          category: activeCategory,
          locale,
        });
        setPosts(response.posts);
        setCurrentPage(1);
        setTotalPages(response.meta.last_page);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch posts whenever the URL search params change
    fetchPosts();
  }, [activeCategory, locale]);

  const loadMorePosts = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await jdbApi.getBlogPosts({
        page: nextPage,
        category: activeCategory,
        locale,
      });

      setPosts((prevPosts) => [...prevPosts, ...response.posts]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, totalPages, activeCategory, locale, isLoading]);

  return (
    <div className="relative">
      {/* Blue background with wave */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary -z-10">
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
        <section className="max-w-6xl mx-auto px-6 mb-12 overflow-x-auto">
          <div className="flex flex-nowrap flex-wrap gap-3 justify-center   min-w-0 pb-4 md:pb-0">
            {categories.map((category, index) => (
              <Link
                key={index + "-" + category.slug[locale]}
                href={`/blog${
                  category.slug[locale]
                    ? `?category=${category.slug[locale]}`
                    : ""
                }`}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                  ${
                    category.slug[locale] === activeCategory
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {index === 0
                  ? dict.pages.blog.allCategories
                  : category.name[locale]}
              </Link>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  className="group"
                >
                  <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                          {post.category.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <time className="text-sm text-gray-500 mt-auto">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{dict.pages.blog.noPosts}</p>
            </div>
          )}
        </section>

        {/* Load More Button */}
        {!isLoading && currentPage < totalPages && (
          <section className="max-w-6xl mx-auto px-6 mt-12 text-center">
            <Button
              onClick={loadMorePosts}
              disabled={isLoading}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 h-10 px-4 py-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {dict.pages.blog.loading}
                </>
              ) : (
                dict.pages.blog.loadMore
              )}
            </Button>
          </section>
        )}

        {/* Newsletter Section */}
        <NewsletterSubscription dict={dict} />
      </div>
    </div>
  );
}
