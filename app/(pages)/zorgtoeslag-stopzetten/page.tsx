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
            <strong>
              Hoe en wanneer stop je met het ontvangen van zorgtoeslag?
            </strong>
          </h2>
          <p>
            Zorgtoeslag is een extra steun die je vanaf je 18e verjaardag van de
            Nederlandse overheid ontvangt. Misschien kom je in aanmerking voor
            deze toeslag. Of je deze toeslag ontvangt en hoeveel je krijgt,
            hangt af van je inkomen. In 2024 mag je maximaal €37.496 bruto per
            jaar verdienen om in aanmerking te komen, en samen met je
            (toeslag)partner mag je €47.368 verdienen.
          </p>
          <p>
            <br />
            Redenen om de zorgtoeslag stop te zetten Soms moet je de toeslag
            stopzetten omdat je anders onterecht te veel ontvangt. Alle ten
            onrechte ontvangen toeslagen moeten namelijk worden terugbetaald.
            Veranderingen in inkomen of samenwonen (want dan krijg je een
            toeslagpartner) kunnen ervoor zorgen dat je geen recht meer hebt op
            zorgtoeslag. Dit soort veranderingen moet je altijd binnen 4 weken
            doorgeven aan de Belastingdienst.
          </p>
          <p>
            <br />
          </p>
          <h3>Hoe zet je zorgtoeslag stop?&nbsp;</h3>
          <p>
            Het stopzetten van zorgtoeslag is relatief eenvoudig. Bij de
            Belastingdienst kun je, nadat je bent ingelogd met je DigiD, zien op
            welke toeslagen je op dat moment recht hebt. Via deze website kun je
            ook financiële wijzigingen en veranderingen in je leven doorgeven.
            Zo wordt opnieuw naar je situatie gekeken en wordt bepaald of je nog
            recht hebt op zorgtoeslag.
          </p>
          <p>
            <br />
            Gevolgen van onterecht ontvangen zorgtoeslag Als je geen wijzigingen
            doorvoert of niet op tijd bent met het doorgeven, kan het zijn dat
            je onterecht te veel zorgtoeslag hebt ontvangen. In dat geval krijg
            je een bericht van de Belastingdienst waarin staat dat je te veel
            hebt ontvangen. Dit bedrag moet worden verrekend met de zorgtoeslag
            waar je nog recht op hebt, of je moet het terugbetalen via een
            terugvorderingsbesluit van de Belastingdienst.
          </p>
          <p>
            <br />
          </p>
          <h2>Wanneer moet je de zorgtoeslag stopzetten?&nbsp;</h2>
          <h3>
            Er zijn verschillende situaties waarin je de zorgtoeslag moet
            stopzetten. Bijvoorbeeld wanneer:
          </h3>
          <p>
            <br />
          </p>
          <ol>
            <li>
              Je vermogen hoger is dan €140.213, of wanneer je samen met je
              fiscale partner/toeslagpartner meer dan €177.301 aan spaargeld
              bezit.
            </li>
            <li>
              Je jaarinkomen boven de inkomensgrens voor zorgtoeslag ligt. Het
              bedrag waar je dan boven zit, is €37.496. Als je een fiscale
              partner/toeslagpartner hebt, ligt dit bedrag boven de €47.368.
            </li>
            <li>
              Moet je de zorgtoeslag stopzetten na je studie? Als je je diploma
              hebt behaald, betekent dit niet automatisch dat je direct de
              zorgtoeslag moet stopzetten. Dit hangt af van je inkomen. Pas als
              je niet meer voldoet aan de eisen voor zorgtoeslag of je inkomen
              te hoog is, moet je de zorgtoeslag stopzetten.
            </li>
          </ol>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
