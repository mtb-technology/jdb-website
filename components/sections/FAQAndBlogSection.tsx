import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { jdbApi } from "@/lib/api/JDBApi";
import Link from "next/link";
import { Suspense } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAndBlogSectionProps {
  faqItems: readonly FAQItem[];
  blogCategory: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  faqTitle: string;
  blogTitle: string;
}

async function RecentBlogPosts({ category }: { category: string }) {
  const posts = await jdbApi.getBlogPosts({ category, page: 1 });

  return (
    <ul className="space-y-4">
      {posts.posts.slice(0, 4).map((post) => (
        <li
          key={post.id}
          className="border-b border-blue-200 pb-4 last:border-b-0"
        >
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary hover:underline block"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function FAQAndBlogSection({
  faqItems,
  blogCategory,
  title,
  buttonText,
  buttonLink,
  faqTitle,
  blogTitle,
}: FAQAndBlogSectionProps) {
  return (
    <section className="my-24">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            {faqTitle}
          </h3>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-md"
              >
                <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="bg-[#EEF2FF] rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-primary">
            {blogTitle}
          </h3>
          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 bg-blue-100 rounded"></div>
                ))}
              </div>
            }
          >
            <RecentBlogPosts category={blogCategory} />
          </Suspense>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="text-sm bg-white hover:bg-gray-50 text-primary"
            >
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
