import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

interface BlogArticle {
  title: string
  link: string
}

interface FAQAndBlogSectionProps {
  faqItems: readonly FAQItem[]
  blogArticles: readonly BlogArticle[]
  title: string
  buttonText: string
  buttonLink: string
}

export default function FAQAndBlogSection({ 
  faqItems,
  blogArticles,
  title,
  buttonText,
  buttonLink,
}: FAQAndBlogSectionProps) {
  return (
    <section className="my-24">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold mb-6 text-[#2B4EE6]">
            Veelgestelde Vragen
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
          <h3 className="text-2xl font-semibold mb-6 text-[#2B4EE6]">
            Laatste Blogartikelen over BV&#39;s
          </h3>
          <ul className="space-y-4">
            {blogArticles.map((article, index) => (
              <li
                key={index}
                className="border-b border-blue-200 pb-4 last:border-b-0"
              >
                <Link
                  href={article.link}
                  className="text-[#2B4EE6] hover:underline block"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="text-sm bg-white hover:bg-gray-50 text-[#2B4EE6]"
            >
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}