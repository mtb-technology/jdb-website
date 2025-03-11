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

export default async function HuurtoeslagStopzettenPage({
  params,
  searchParams,
}: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  const dict = await getDictionary("nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto py-22">
          <h2>
            <strong>Wanneer moet ik mijn huurtoeslag stopzetten?</strong>
          </h2>
          <p>
            Verandert uw situatie en komt u niet langer in aanmerking voor
            huurtoeslag? Geen zorgen, wij staan voor u klaar om u te helpen met
            het eenvoudig en snel stopzetten van uw huurtoeslag.&nbsp;
          </p>
          <h3>
            Enkele voorbeelden van situaties waarin u uw huurtoeslag moet
            stopzetten zijn:
          </h3>
          <ul>
            <li>Verhuizen naar een koopwoning of het kopen van een huis.</li>
            <li>Overschrijden van het inkomensplafond.</li>
            <li>Wonen in een recreatiewoning of vakantiewoning.</li>
            <li>Verhuizen naar het buitenland.</li>
            <li>Samenwonen en uw woning opzeggen.</li>
          </ul>
          <p>
            Het is van essentieel belang om de annulering van uw huurtoeslag
            tijdig door te geven om eventuele terugbetalingen van te veel
            ontvangen toeslagen te voorkomen.
          </p>
          <h3>
            <strong>
              Voordelen van het annuleren van uw huurtoeslag bij Jan de
              Belastingman:
            </strong>
          </h3>
          <ul>
            <li>Geen DigiD nodig.</li>
            <li>Officiële verwerking van uw annulering.</li>
            <li>
              Grondige controle van uw gegevens voor een correcte afhandeling.
            </li>
            <li>Snelle en eenvoudige annulering van uw huurtoeslag.</li>
            <li>
              Mogelijkheid om uw huurtoeslag met terugwerkende kracht te
              annuleren.
            </li>
            <li>
              Flexibele stopdatum, bepaald door u en doorgegeven aan de
              Belastingdienst.
            </li>
          </ul>
          <h3>
            <strong>
              Wat zijn de voorwaarden voor het ontvangen van huurtoeslag?
            </strong>
          </h3>
          <ul>
            <li>U bent 18 jaar of ouder.</li>
            <li>U bent ingeschreven bij de gemeente op uw woonadres.</li>
            <li>U huurt een zelfstandige woonruimte.</li>
            <li>
              U heeft de Nederlandse nationaliteit of een geldige
              verblijfsvergunning.
            </li>
            <li>Uw huurprijs valt binnen de vastgestelde grenzen.</li>
            <li>Uw (gezamenlijke) inkomen is niet te hoog.</li>
          </ul>
          <h3>
            <strong>Bereken uw huurtoeslag bij Jan de Belastingman:</strong>
          </h3>
          <p>
            Bent u benieuwd naar het bedrag dat u terugkrijgt? Bij Jan de
            Belastingman kunt u snel en eenvoudig uw huurtoeslag berekenen.
            Ontdek of u recht heeft op huurtoeslag en hoeveel u kunt ontvangen
            door onze gratis berekeningstool te gebruiken.
          </p>
          <p>
            Wacht niet langer, Jan de Belastingman staat voor u klaar om u te
            helpen met uw huurtoeslagzaken. Neem vandaag nog contact met ons op
            voor meer informatie of om direct uw huurtoeslag te annuleren.
          </p>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
