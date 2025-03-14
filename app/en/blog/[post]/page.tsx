import BlogPostContent from "@/app/components/BlogPostContent";
import { getDictionary } from "@/app/dictionaries";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { jdbApi } from "@/lib/api/JDBApi";
import { SupportedLocale } from "@/lib/types";
import { notFound } from "next/navigation";

type PageParams = {
  post: string;
  locale?: SupportedLocale;
};

type PageProps = {
  params: Promise<PageParams>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateStaticParams() {
  // Fetch all blog posts for both locales
  const posts = await jdbApi.getBlogPosts({ locale: "en" });
  return posts.posts.map((post) => ({
    post: post.slug,
  }));
}

export default async function BlogEnPostPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;

  const dict = await getDictionary("en");

  const currentPost = await jdbApi.getBlogPost(resolvedParams.post, "en");

  if (!currentPost) {
    return notFound();
  }

  const locale = resolvedParams.locale || "en";

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="relative flex-1 overflow-y-auto">
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

        {/* Blog Post Detail */}
        <BlogPostContent currentPost={currentPost} locale={locale} />
      </div>
      <Footer dict={dict} />
    </main>
  );
}
