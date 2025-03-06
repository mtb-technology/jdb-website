import { BackButton } from "@/app/components/back-button";
import { getDictionary } from "@/app/dictionaries";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { jdbApi } from "@/lib/api/JDBApi";
import { Calendar, Share2, User } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageParams = Promise<{
  post: string;
}>;

type PageProps = {
  params: PageParams;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

// Parse HTML content
const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

export async function generateStaticParams() {
  // Fetch all blog posts for both locales
  const posts = await jdbApi.getBlogPosts({ locale: "nl" });
  return posts.posts.map((post) => ({
    post: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
  searchParams,
}: PageProps) {
  const locale = "nl"; // Default to Dutch
  const dict = await getDictionary(locale);
  const resolvedParams = await params;

  const currentPost = await jdbApi.getBlogPost(resolvedParams.post, locale);

  if (!currentPost) {
    return notFound();
  }

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
        <div className="relative z-0 pt-12 pb-24">
          {/* Back Button */}
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <BackButton />
          </div>

          {/* Post Header */}
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <div className="inline-block mb-4">
              <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                {currentPost.category.name}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {currentPost.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
              {currentPost.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {currentPost.author.name}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(currentPost.published_at).toLocaleDateString(
                  locale === "nl" ? "nl-NL" : "en-US",
                  {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto px-6 mb-8">
            <div className="relative h-64 md:h-96 overflow-hidden rounded-xl">
              <Image
                src={currentPost.banner?.large || "/placeholder.svg"}
                alt={currentPost.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Post Content */}
          <div className="max-w-4xl mx-auto px-6 mb-12">
            {currentPost.content ? (
              <div className="prose prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={createMarkup(currentPost.content)}
                />
              </div>
            ) : (
              <p className="text-gray-600">
                Inhoud is momenteel niet beschikbaar.
              </p>
            )}

            {/* Share Buttons */}
            <div className="mt-8 flex items-center gap-2">
              <span className="text-sm text-gray-600">Deel dit artikel:</span>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Related Posts */}
          {/* <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Gerelateerde artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.length > 0 ? (
                relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="cursor-pointer"
                    onClick={() => openPostDetail(post)}
                  >
                    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500 mt-auto">
                          {post.date}
                        </time>
                      </div>
                    </article>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-gray-600">
                  Geen gerelateerde artikelen gevonden.
                </p>
              )}
            </div>
          </div> */}

          {/* Newsletter Section */}
          <section className="max-w-4xl mx-auto px-6 mt-24">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-3">Blijf op de hoogte</h2>
                <p className="text-gray-600">
                  Ontvang de nieuwste belastingtips en updates direct in je
                  inbox.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Je e-mailadres"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button className="bg-primary text-white hover:bg-[#2341C7] whitespace-nowrap">
                  Aanmelden
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
