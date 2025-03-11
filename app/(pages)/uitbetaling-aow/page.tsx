import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { generatePageMetadata } from "@/lib/metadata";
import { SupportedLocale } from "@/lib/types";
import { Metadata } from "next";
import { getDictionary } from "../../dictionaries";

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
    params: { ...resolvedParams, locale: "nl" },
  });
};

export default async function UitbetalingAowPage({
  params,
  searchParams,
}: PageProps) {
  const dict = await getDictionary("nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="block text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-2xl leading-8 sm:leading-none tracking-tight font-extrabold sm:text-5xl">
                  <span className="text-blue-dark">Uitbetaling AOW 2025</span>
                </span>
              </h1>
              <div className="prose mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                <ul>
                  <li>
                    <h3>
                      In 2025 betaalt de SVB de AOW op de volgende kalender data
                      uit:
                    </h3>
                    <ul>
                      <li>23 januari 2025</li>
                      <li>24 februari 2025</li>
                      <li>24 maart 2025</li>
                      <li>23 april 2025</li>
                      <li>22 mei 2025 (inclusief vakantiegeld)</li>
                      <li>23 juni 2025</li>
                      <li>23 juli 2025</li>
                      <li>21 augustus 2025</li>
                      <li>23 september 2025</li>
                      <li>23 oktober 2025</li>
                      <li>24 november 2025</li>
                      <li>22 december 2025</li>
                    </ul>
                  </li>
                  <li>Kijk hier voor de uitbetalingen van AOW in 2024</li>
                </ul>
              </div>
              <div className="mt-5 sm:mt-8 lg:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/chat/algemene-ouderdomswet"
                    target="_self"
                    className="w-full flex items-center justify-center px-8 py-3 border-2 border-blue-base text-base font-medium rounded-md text-blue-base bg-transparent hover:bg-indigo-700 hover:text-white md:py-4 md:text-lg md:px-10"
                  >
                    Hulp nodig bij het AOW-pensioen? Chat met ons!
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:col-start-8 lg:col-span-4 mt-12">
              <img
                src={
                  "https://app.jandebelastingman.nl/curator/media/2079a9de-8175-40c0-8782-fb320276384b-1694968446.jpg?s=2685c04779f0bc707ec4b5631a3300f2"
                }
                alt=""
                width={8688}
                height={4887}
                loading="lazy"
                className="object-cover w-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
