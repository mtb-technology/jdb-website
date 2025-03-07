import { getDictionary } from "@/app/dictionaries";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";

// Types for generateMetadata
type MetadataParams = {
  locale: SupportedLocale;
};

type MetadataProps = {
  params: MetadataParams;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Types for Page component
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

export default async function PrivacyPage({ params, searchParams }: PageProps) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const dict = await getDictionary("en");

  return (
    <main className="flex-1 flex flex-col relative">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto px-6 py-12">
          <h2>DISCLAIMER</h2>
          <p>
            Although the content of this website has been compiled with care,
            jandebelastingman.nl cannot guarantee the accuracy or completeness
            of the given (legal) information. Jandebelastingman.nl accepts no
            liability for any damages, of whatever nature, arising in any way
            from the use of the website and chatbot, including actions,
            omissions and / or decisions based on such information, as well as
            the (temporary) inability to use the website.
            <br />
            <br />
            Jandebelastingman.nl accepts no liability for direct or indirect
            damage caused by the content of the information on the website and
            chatbot.
            <br />
            <br />
            The information on these web pages and in the chatbot may contain
            technical or typographical errors. This information may be changed
            or expanded at any time without prior warning. Jandebelastingman.nl
            is in no way responsible for other web pages that link to the
            jandebelastingman.nl website.
            <br />
            <br />
            The content of this website is checked as much as possible for its
            content and topicality. If errors or inaccuracies would be published
            we can not be held responsible. The information that the visitor of
            our website reads can only be used at his own risk and
            responsibility.
          </p>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
  