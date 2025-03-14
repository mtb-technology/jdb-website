import { jdbApi } from "@/lib/api/JDBApi";
import BlogPostPage from "../../../blog/[post]/page";
type PageParams = Promise<{
  post: string;
}>;

type PageProps = {
  params: PageParams;
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
  return (
    <BlogPostPage
      params={{ locale: "en", ...params }}
      searchParams={searchParams}
    />
  );
}
