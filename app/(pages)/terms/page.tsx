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

export default async function TermsPage({ params, searchParams }: PageProps) {
  const [resolvedParams] = await Promise.all([params]);
  const dict = await getDictionary("nl");

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <article className="max-w-4xl prose text-gray-500 mx-auto px-6 py-12">
          <h1>Gebruiksvoorwaarden</h1>
          <p className="text-sm">Laatst bijgewerkt: maart 2025</p>

          <h2>1. Inleiding</h2>
          <p>
            Welkom bij Jan de Belastingman, een handelsnaam van MTB Technology B.V. ("wij," "ons," of "onze"). Door gebruik te maken van onze website, chatbot en aanverwante diensten (gezamenlijk de "Diensten"), verklaart u dat u deze Gebruiksvoorwaarden ("Voorwaarden") hebt gelezen, begrepen en ermee instemt gebonden te zijn. Als u niet akkoord gaat, dient u geen gebruik te maken van onze Diensten.
          </p>

          <h2>2. Beschrijving van de Diensten</h2>
          <h3>2.1 AI-gebaseerde assistentie</h3>
          <p>
            Onze AI-agent en website kunnen geautomatiseerde, door AI gegenereerde antwoorden geven op fiscale of financiële vragen. Deze AI-antwoorden dienen uitsluitend ter informatie en vormen geen officieel belasting-, juridisch of financieel advies. Er kunnen geen rechten worden ontleend aan deze AI-gegenereerde informatie, en wij garanderen niet de volledigheid of nauwkeurigheid ervan.
          </p>

          <h3>2.2 Doorverwijzing naar externe adviseurs</h3>
          <p>
            Wij kunnen uw vragen doorsturen of links aanbieden naar externe belastingadviseurs of professionals ("Adviseurs"). Hoewel wij ons inspannen om u in contact te brengen met betrouwbare Adviseurs, onderschrijven of garanderen wij hun diensten niet. Elke overeenkomst, afspraak of communicatie tussen u en deze Adviseurs is strikt tussen u en hen.
          </p>

          <h2>3. Afwijzing van aansprakelijkheid</h2>
          <h3>3.1 Geen juridisch of financieel advies</h3>
          <p>
            De informatie die via onze Diensten wordt aangeboden—ongeacht of deze is gegenereerd door AI, door ons is samengesteld of door externe Adviseurs is verstrekt—mag niet worden opgevat als vervanging van professioneel advies. U blijft te allen tijde zelf verantwoordelijk voor uw beslissingen en handelingen.
          </p>

          <h3>3.2 Externe adviseurs</h3>
          <p>
            Zelfs als u ons direct betaalt voor toegang tot of gebruik van onze Diensten, blijft elk definitief advies of elke dienst die u van een Adviseur ontvangt de uitsluitende verantwoordelijkheid van die Adviseur. Wij maken geen deel uit van de overeenkomst tussen u en de Adviseur en zijn niet aansprakelijk voor handelingen, nalatigheden of uitkomsten die voortvloeien uit de diensten van de Adviseur.
          </p>

          <h3>3.3 Algemene uitsluiting van aansprakelijkheid</h3>
          <p>
            Voor zover maximaal is toegestaan door de wet, wijzen wij iedere aansprakelijkheid af voor directe, indirecte, incidentele, gevolg- of bijzondere schade die voortvloeit uit of op enigerlei wijze verband houdt met:
          </p>
          <ul>
            <li>Uw gebruik van (of onvermogen om te gebruiken) onze AI-gebaseerde chatbot.</li>
            <li>Het vertrouwen op AI-gegenereerde inhoud of andere informatie die via onze Diensten wordt verstrekt.</li>
            <li>Handelingen of nalatigheden van externe Adviseurs aan wie u bent voorgesteld of doorverwezen.</li>
            <li>Eventuele fouten of onjuistheden in onze Diensten, of tijdelijke onbeschikbaarheid van de Diensten.</li>
          </ul>

          <h3>3.4 Geen garanties</h3>
          <p>
            Wij garanderen niet dat de Diensten ononderbroken, foutloos of veilig zullen zijn. U erkent dat het gebruik van onze Diensten voor uw eigen risico is.
          </p>

          <h2>4. Verplichtingen van de gebruiker</h2>
          <h3>4.1 Juiste informatie</h3>
          <p>
            Wanneer u communiceert met onze chatbot of adviseurs, stemt u ermee in nauwkeurige, volledige en actuele informatie te verstrekken. Wij zijn niet verantwoordelijk voor de gevolgen van onjuiste of onvolledige informatie die u aanlevert.
          </p>

          <h3>4.2 Rechtmatig gebruik</h3>
          <p>
            U stemt ermee in de Diensten niet te gebruiken voor onwettige of verboden activiteiten, waaronder (maar niet beperkt tot) het schenden van intellectuele eigendomsrechten, het verspreiden van schadelijke software of het plegen van fraude.
          </p>

          <h2>5. Intellectueel eigendom</h2>
          <h3>5.1 Eigendom</h3>
          <p>
            Alle content, functies en functionaliteit van de Diensten (inclusief maar niet beperkt tot tekst, grafische elementen, logo's, iconen, afbeeldingen en software) zijn eigendom van of in licentie gegeven aan ons, tenzij anders vermeld.
          </p>

          <h3>5.2 Beperkte licentie</h3>
          <p>
            Wij verlenen u een beperkte, niet-exclusieve, niet-overdraagbare, herroepelijke licentie om de Diensten te openen en te gebruiken voor uw persoonlijk of intern zakelijk gebruik. U mag geen onderdelen van de Diensten reproduceren, distribueren, wijzigen, er afgeleide werken van maken, openbaar vertonen of anderszins exploiteren zonder onze voorafgaande schriftelijke toestemming.
          </p>

          <h2>6. Links en inhoud van derden</h2>
          <h3>6.1 Links</h3>
          <p>
            Onze Diensten kunnen links bevatten naar websites of bronnen van derden. Wij hebben geen controle over deze sites en zijn niet verantwoordelijk voor de inhoud of beschikbaarheid ervan. Het openen van gelinkte websites is op eigen risico.
          </p>

          <h3>6.2 Geen goedkeuring</h3>
          <p>
            Het opnemen van een link impliceert geen goedkeuring door ons. Wij wijzen alle aansprakelijkheid af voor eventuele schade die het gevolg is van het gebruik van dergelijke externe bronnen.
          </p>

          <h2>7. Wijzigingen in de Diensten en Voorwaarden</h2>
          <h3>7.1 Wijzigingen in de Diensten</h3>
          <p>
            Wij behouden ons het recht voor om elk onderdeel van de Diensten, tijdelijk of permanent, te wijzigen, op te schorten of stop te zetten, met of zonder kennisgeving.
          </p>

          <h3>7.2 Wijzigingen in de Voorwaarden</h3>
          <p>
            Wij kunnen deze Voorwaarden op elk moment bijwerken of herzien. Wijzigingen worden van kracht zodra de bijgewerkte Voorwaarden zijn geplaatst. Door de Diensten te blijven gebruiken nadat de wijzigingen zijn gepubliceerd, aanvaardt u de herziene Voorwaarden.
          </p>

          <h2>8. Toepasselijk recht en geschillenbeslechting</h2>
          <h3>8.1 Toepasselijk recht</h3>
          <p>
            Deze Voorwaarden en eventuele geschillen die hieruit voortvloeien of hiermee verband houden, worden beheerst door en geïnterpreteerd in overeenstemming met het recht van Nederland, zonder rekening te houden met strijdige wetsbepalingen.
          </p>

          <h3>8.2 Rechtsgebied</h3>
          <p>
            Alle geschillen die voortvloeien uit of verband houden met deze Voorwaarden worden voorgelegd aan de exclusieve bevoegdheid van de bevoegde rechtbanken in Amsterdam, Nederland, tenzij anders vereist door toepasselijk recht.
          </p>

          <h2>9. Beperking van aansprakelijkheid</h2>
          <h3>9.1 Maximale aansprakelijkheid</h3>
          <p>
            Voor zover niet verboden door de wet is onze totale cumulatieve aansprakelijkheid jegens u voor enige aanspraken die voortvloeien uit of verband houden met het gebruik van onze Diensten beperkt tot het totaalbedrag (indien van toepassing) dat u aan ons hebt betaald voor de specifieke Diensten waaruit de aanspraak is ontstaan in de 12 maanden voorafgaand aan het voorval.
          </p>

          <h3>9.2 Uitzonderingen</h3>
          <p>
            Sommige rechtsgebieden staan bepaalde uitsluitingen of beperkingen van aansprakelijkheid niet toe. In dergelijke rechtsgebieden zal onze aansprakelijkheid worden beperkt tot de grootst toegestane mate volgens de wet.
          </p>

          <h2>10. Scheidbaarheid</h2>
          <p>
            Als een bepaling van deze Voorwaarden door een bevoegde rechtbank als niet-afdwingbaar wordt beschouwd, zal die bepaling worden gehandhaafd voor zover maximaal toegestaan en zullen de overige bepalingen volledig van kracht blijven.
          </p>

          <h2>11. Volledige overeenkomst</h2>
          <p>
            Deze Voorwaarden, samen met ons Privacybeleid en alle aanvullende juridische kennisgevingen of overeenkomsten die door ons op de Diensten worden gepubliceerd, vormen de volledige overeenkomst tussen u en ons met betrekking tot het gebruik van onze Diensten en vervangen alle eerdere overeenkomsten, schriftelijk of mondeling.
          </p>

          <h2>12. Contactgegevens</h2>
          <p>Als u vragen hebt over deze Voorwaarden, kunt u contact met ons opnemen:</p>
          <ul>
            <li>E-mail: info@jandebelastingman.nl</li>
            <li>Adres: De Lairessestraat 151, 1075 HK Amsterdam, Nederland</li>
          </ul>
        </article>
      </div>
      <Footer dict={dict} />
    </main>
  );
}
