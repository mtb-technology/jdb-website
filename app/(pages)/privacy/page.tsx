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

export default async function PrivacyPage({ params, searchParams }: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  const dict = await getDictionary("nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto px-6 py-12">
          <h1>Privacybeleid</h1>
          <p className="text-sm">Laatst bijgewerkt: maart 2025</p>

          <h2>1. Inleiding</h2>
          <p>
            Welkom bij Jan de Belastingman, een handelsnaam van MTB Technology B.V. (&ldquo;wij,&rdquo; &ldquo;ons,&rdquo; of &ldquo;onze&rdquo;). Wij hechten veel waarde aan uw privacy en zetten ons in om uw persoonsgegevens te beschermen. In dit Privacybeleid leggen we uit hoe wij informatie verzamelen, gebruiken, delen en beschermen wanneer u gebruikmaakt van onze diensten, waaronder onze website, AI-gebaseerde chatfunctionaliteit en wanneer wij uw vragen doorsturen naar menselijke adviseurs.
          </p>
          <p>
            Door gebruik te maken van onze diensten, gaat u akkoord met het verzamelen en gebruiken van informatie overeenkomstig dit Privacybeleid. Wij kunnen dit beleid van tijd tot tijd bijwerken; we raden u aan het periodiek te bekijken.
          </p>

          <h2>2. Wie Wij Zijn</h2>
          <ul>
            <li>Naam: Jan de Belastingman (een handelsnaam van MTB Technology B.V.)</li>
            <li>Kamer van Koophandel (KvK): 96211350</li>
            <li>Vestigingsnummer: 000061552631</li>
            <li>Geregistreerd adres: De Lairessestraat 151, 1075 HK Amsterdam, Nederland</li>
            <li>E-mail: info@jandebelastingman.nl</li>
          </ul>
          <p>
            MTB Technology B.V. ontwikkelt, implementeert en beheert software- en automatiseringsoplossingen, waaronder platforms die geautomatiseerd en menselijk ondersteund belastingadvies bieden.
          </p>

          <h2>3. Welke Persoonsgegevens Verzamelen Wij?</h2>
          <p>Wij kunnen de volgende categorieën persoonsgegevens verzamelen en verwerken:</p>
          <ol>
            <li>Identificatie- & contactgegevens: naam, adres, geslacht, telefoonnummer, e-mailadres.</li>
            <li>Financiële & fiscale gegevens: gegevens uit jaaropgaven, uitgaven, aftrekposten of andere relevante informatie voor het verstrekken van belastingadvies.</li>
            <li>Communicatiegegevens: chatlogs, e-mailcorrespondentie of alle andere informatie die u met ons deelt.</li>
            <li>Technische gegevens: IP-adres, browsertype, besturingssysteem en andere technische informatie die wordt verzameld via cookies en vergelijkbare technologieën (zie &quot;Cookies&quot; hieronder).</li>
          </ol>
          <p>
            U bent verantwoordelijk voor de nauwkeurigheid van de persoonsgegevens die u indient en voor het niet delen van meer persoonlijke of gevoelige informatie dan nodig.
          </p>

          <h2>4. Hoe Gebruiken Wij Uw Persoonsgegevens?</h2>
          <p>Wij verwerken uw persoonsgegevens voor de volgende doeleinden:</p>
          <ol>
            <li>
              <strong>Belastingadvies & diensten</strong>
              <ul>
                <li>Om belastingadvies te geven, hetzij automatisch (via ons AI-gebaseerde systeem) of door uw vraag door te sturen naar een gekwalificeerde adviseur.</li>
              </ul>
            </li>
            <li>
              <strong>AI-gebaseerde antwoorden</strong>
              <ul>
                <li>Om geautomatiseerde antwoorden te genereren met behulp van ons AI-systeem, dat de door u verstrekte informatie analyseert. Let op dat AI-gegenereerde antwoorden niet altijd nauwkeurig of volledig zijn en geen officieel juridisch of financieel advies vormen.</li>
              </ul>
            </li>
            <li>
              <strong>Doorsturen naar adviseurs</strong>
              <ul>
                <li>Indien nodig of op uw verzoek kunnen wij uw vragen, samen met uw relevante persoonsgegevens, doorsturen naar ons netwerk van menselijke adviseurs voor meer gedetailleerde of gespecialiseerde ondersteuning.</li>
              </ul>
            </li>
            <li>
              <strong>Marketing & communicatie</strong>
              <ul>
                <li>Om u gepersonaliseerde marketingcommunicatie te sturen als u toestemming hebt gegeven (bijv. nieuwsbrieven, promoties of updates over onze diensten).</li>
              </ul>
            </li>
            <li>
              <strong>Profilering & analytics</strong>
              <ul>
                <li>Om te analyseren hoe u onze website gebruikt, de gebruikerservaring te verbeteren en onze diensten beter af te stemmen op uw behoeften.</li>
              </ul>
            </li>
          </ol>

          <h2>5. Rechtsgrondslag voor Verwerking</h2>
          <p>Wij verwerken uw persoonsgegevens op basis van een of meer van de volgende rechtsgronden:</p>
          <ol>
            <li>
              <strong>Uitvoering van een overeenkomst</strong>
              <ul>
                <li>Wij hebben uw gegevens nodig om onze belastingadviesdiensten aan u te kunnen leveren.</li>
              </ul>
            </li>
            <li>
              <strong>Gerechtvaardigd belang</strong>
              <ul>
                <li>Wij kunnen bepaalde gegevens verwerken om de gebruikerservaring te verbeteren, ons platform te optimaliseren of relevante diensten aan te bieden die voor u interessant kunnen zijn.</li>
              </ul>
            </li>
            <li>
              <strong>Toestemming</strong>
              <ul>
                <li>Waar wettelijk vereist, vragen wij uw toestemming voordat wij uw persoonsgegevens verwerken (bijv. voor direct marketing of AI-gebaseerde assistentie). U kunt uw toestemming te allen tijde intrekken.</li>
              </ul>
            </li>
          </ol>

          <h2>6. Gebruik van AI en Geautomatiseerde Besluitvorming</h2>
          <p>
            Wij maken gebruik van AI-gebaseerde hulpmiddelen om geautomatiseerde antwoorden te geven op uw belastinggerelateerde vragen. Hoewel wij streven naar kwalitatieve, betrouwbare antwoorden, kunnen wij de nauwkeurigheid of volledigheid ervan niet garanderen. Geautomatiseerde antwoorden zijn uitsluitend informatief en vervangen geen professioneel advies. Wij raden u aan om bij complexe of belangrijke belastingkwesties de informatie te verifiëren of een gekwalificeerde professional te raadplegen.
          </p>

          <h2>7. Is het Verplicht om Persoonsgegevens te Verstrekken?</h2>
          <p>
            U bent niet wettelijk verplicht om ons persoonsgegevens te verstrekken. Als u echter bepaalde informatie niet verstrekt, kan het zijn dat wij onze diensten niet effectief kunnen leveren, zoals het geven van passend belastingadvies of het doorsturen van uw vragen naar de juiste adviseur.
          </p>

          <h2>8. Het Delen van Uw Persoonsgegevens</h2>
          <ol>
            <li>
              <strong>Externe adviseurs</strong>
              <ul>
                <li>Wij kunnen uw gegevens delen met ons netwerk van belastingadviseurs om gespecialiseerde hulp te bieden.</li>
              </ul>
            </li>
            <li>
              <strong>Dienstverleners</strong>
              <ul>
                <li>Wij maken gebruik van vertrouwde externe dienstverleners (bijv. cloud hosting, AI-dienstverleners, analyse) om ons te helpen bij het beheren en verbeteren van ons platform. Deze dienstverleners verwerken uw gegevens uitsluitend namens ons en onder strikte geheimhoudingsverplichtingen.</li>
              </ul>
            </li>
            <li>
              <strong>Wettelijke vereisten</strong>
              <ul>
                <li>Wij kunnen uw gegevens openbaar maken als de wet dit vereist of als reactie op geldige verzoeken van overheidsinstanties (bijv. een rechtbank of overheidsinstantie).</li>
              </ul>
            </li>
            <li>
              <strong>Doorgifte buiten de EU</strong>
              <ul>
                <li>In principe dragen wij uw persoonsgegevens niet over buiten de Europese Economische Ruimte (EER). Bepaalde dienstverleners (bijv. Google Analytics) kunnen gegevens verwerken in de Verenigde Staten of andere rechtsgebieden. Waar dergelijke doorgiften plaatsvinden, zorgen wij voor een passend niveau van gegevensbescherming in overeenstemming met de AVG (bijv. door middel van Standaardcontractbepalingen).</li>
              </ul>
            </li>
          </ol>

          <h2>9. Cookies en Vergelijkbare Technologieën</h2>
          <p>
            Wij gebruiken cookies en vergelijkbare technologieën om onze diensten te verbeteren, het gebruik te analyseren en uw voorkeuren te onthouden. Een cookie is een klein bestand dat op uw apparaat wordt geplaatst wanneer u onze website bezoekt. U kunt cookies weigeren via uw browserinstellingen, maar dit kan de functionaliteit van onze website beperken.
          </p>
          <p>
            Wij maken ook gebruik van tools van derden, zoals Google Analytics, om te begrijpen hoe onze website wordt gebruikt. Google kan deze informatie opslaan in de Verenigde Staten of andere locaties. Wij nemen maatregelen om ervoor te zorgen dat deze doorgiften voldoen aan de relevante wetgeving inzake gegevensbescherming.
          </p>

          <h2>10. Bewaartermijn van Uw Gegevens</h2>
          <p>
            Wij bewaren uw persoonsgegevens alleen zo lang als nodig is voor de doeleinden waarvoor ze zijn verzameld, om te voldoen aan wettelijke verplichtingen (bijv. fiscale en boekhoudkundige vereisten), geschillen op te lossen en onze overeenkomsten af te dwingen. Wij evalueren onze bewaartermijnen regelmatig om te garanderen dat wij gegevens niet langer bewaren dan nodig is.
          </p>

          <h2>11. Uw Rechten</h2>
          <p>Op grond van de Algemene Verordening Gegevensbescherming (AVG) hebt u bepaalde rechten met betrekking tot uw persoonsgegevens, waaronder:</p>
          <ol>
            <li>Recht van inzage &ndash; het recht om een kopie van uw persoonsgegevens op te vragen.</li>
            <li>Recht op rectificatie &ndash; het recht om ons te vragen onjuiste of onvolledige gegevens te corrigeren.</li>
            <li>Recht op verwijdering (&ldquo;recht om vergeten te worden&rdquo;) &ndash; het recht om onder bepaalde omstandigheden verwijdering van uw persoonsgegevens te vragen.</li>
            <li>Recht van bezwaar &ndash; het recht om bezwaar te maken tegen bepaalde verwerkingsactiviteiten (bijv. direct marketing).</li>
            <li>Recht op beperking van de verwerking &ndash; het recht om de verwerking van gegevens in specifieke situaties te beperken.</li>
            <li>Recht op gegevensoverdraagbaarheid &ndash; het recht om uw persoonsgegevens te ontvangen in een gestructureerd, gangbaar en machineleesbaar formaat en deze over te dragen aan een andere organisatie, waar technisch haalbaar.</li>
          </ol>
          <p>
            Om een van deze rechten uit te oefenen, kunt u contact met ons opnemen via help@jandebelastingman.nl. Wij zullen binnen de wettelijk vereiste termijn op uw verzoek reageren.
          </p>

          <h2>12. Beveiligingsmaatregelen</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, ongeautoriseerde toegang, openbaarmaking, wijziging of vernietiging. Voorbeelden hiervan zijn versleuteling van data tijdens transport (HTTPS), toegangscontroles en regelmatige beveiligingsaudits.
          </p>
          <p>
            In het geval van een beveiligingsincident of datalek dat een hoog risico inhoudt voor uw rechten en vrijheden, hebben wij een intern incidentresponsproces. Indien vereist door de wet, zullen wij de relevante toezichthoudende autoriteit (bijv. de Autoriteit Persoonsgegevens) binnen 72 uur op de hoogte stellen en u tijdig informeren als er een aanzienlijk risico is voor uw persoonsgegevens.
          </p>

          <h2>13. Contactgegevens</h2>
          <p>Als u vragen hebt over dit Privacybeleid, over hoe wij met gegevens omgaan of als u een van uw rechten wilt uitoefenen, neem dan contact met ons op:</p>
          <p>
            Jan de Belastingman (MTB Technology B.V.)<br />
            E-mail: info@jandebelastingman.nl<br />
            Adres: De Lairessestraat 151, 1075 HK Amsterdam, Nederland
          </p>

          <h2>14. Klachten</h2>
          <p>
            Als u van mening bent dat wij niet hebben gehandeld in overeenstemming met de toepasselijke wetgeving inzake gegevensbescherming, verzoeken wij u eerst contact met ons op te nemen, zodat wij uw zorgen kunnen behandelen. U hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens of uw lokale toezichthouder.
          </p>

          <h2>Disclaimer:</h2>
          <ul>
            <li>AI-antwoorden: Eventuele geautomatiseerde (door AI gegenereerde) antwoorden die via onze dienst worden gegeven, dienen alleen ter informatie en vormen geen officieel belasting- of juridisch advies.</li>
            <li>Professionele verificatie: Voor complexe vragen of definitief advies raden wij u aan een gekwalificeerde professional te raadplegen.</li>
          </ul>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
