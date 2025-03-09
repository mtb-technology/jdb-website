import { AdsPage } from "@/components/AdsPage";

const dictionary = {
  metadata: {
    title: "Deskundige ondersteuning voor ondernemers & ZZP'ers | Jan de Belastingman",
    description: "Krijg deskundige begeleiding bij belastingzaken voor ondernemers & ZZP'ers in Nederland. Van aftrekposten tot BTW-aangiftes, wij helpen je je belastingen te optimaliseren.",
    ogTitle: "Ondernemer & ZZP Belastingondersteuning - Jan de Belastingman",
    ogDescription: "Professionele belastingassistentie voor ZZP'ers in Nederland. Krijg betrouwbaar advies en maximaliseer je aftrekposten.",
    ogImageAlt: "Ondernemer & ZZP Belastingondersteuning van Jan de Belastingman",
  },
  hero: {
    title: "Deskundige ondersteuning voor ondernemers & ZZP'ers",
    description: "Wil je als ondernemer meer verdienen en minder tijd kwijt zijn aan je belastingen? Jan de Belastingman helpt je slim te besparen met aftrekposten, BTW-aangiftes en belastingoptimalisatie.",
    callToAction: "Ben je zelfstandig ondernemer en worstel je met het beheren van je bedrijfsfinanciën of het navigeren door belastingregels? Met het juiste advies kun je je administratieve taken stroomlijnen en je focussen op waar je goed in bent.",
    buttonText: "Stel je vraag in de chat",
    buttonSubtext: "Direct antwoord",
    buttonLink: "/chat/ondernemer",
    image: {
      src: "/storage/media/chat-interface.png",
      alt: "Chat Interface Voorbeeld",
      width: 800,
      height: 600,
    },
    stats: "4,8 sterren uit beoordelingen",
  },
  partners: {
    title: "Bekend van",
    items: [
      {
        src: "/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
        alt: "De Jurist",
        url: "https://dejurist.com/nieuws/50008411/kortgedingrechter-jan-de-belastingman-maakt-geen-inbreuk-op-handelsnaam-jan",
        width: 100,
      },
      {
        src: "/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
        alt: "Accountant",
        url: "https://www.accountant.nl/nieuws/2020/8/jan-moet-jan-de-belastingman-dulden",
        width: 120,
      },
      {
        src: "/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
        url: "https://www.quotenet.nl/nieuws/a33495849/sneu-accountantskantoor-jan-eist-duizenden-euros-student",
        alt: "Quote",
        width: 90,
      },
      {
        src: "/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
        alt: "FD",
        url: "https://www.fd.nl/nieuws/2020/10/jan-de-belastingman-krijgt-kortgeding-van-student-die-zijn-naam-gebruikt-heeft~b4441f2b/?referrer=https%3A%2F%2Fjandebelastingman.test%2F&referrer=https%3A%2F%2Fjandebelastingman.nl%2F",
        width: 60,
      },
    ],
  },
  support: {
    title: "Ondernemer/ZZP Ondersteuning in Nederland",
    description: "Een eigen bedrijf runnen in Nederland brengt unieke uitdagingen met zich mee, vooral als het gaat om financieel beheer en belastingverplichtingen. Jan de Belastingman biedt op maat gemaakte begeleiding om zelfstandigen te helpen bij deze obstakels, van belastingaftrek tot financiële planning, zodat je bedrijf kan floreren in een competitieve omgeving.",
    buttonText: "Stel je vraag in de chat",
    buttonSubtext: "Direct antwoord",
    buttonLink: "/chat/ondernemer",
    imageSrc: "/storage/media/business-professional.jpeg",
    imageAlt: "Professionele Belastingadviseur",
    items: [
      {
        title: "Bedrijfsexpertise",
        description: "Gespecialiseerde kennis van ZZP-belastingen"
      },
      {
        title: "Maximale Voordelen",
        description: "Optimaal gebruik van beschikbare aftrekposten"
      },
      {
        title: "Naleving Verzekerd",
        description: "Blijf voldoen aan belastingregels"
      }
    ]
  },
  stepsSection: {
    buttonText: "Stel je vraag in de chat",
    buttonLink: "/chat/ondernemer",
    buttonSubtext: "Direct antwoord",
    items: [
      {
        title: "1. Stel je vraag 24/7 en krijg direct antwoord",
        description: "Heb je een vraag over je belastingen? Bij Jan de Belastingman stel je jouw vraag online en krijg je meteen een duidelijk antwoord van onze slimme AI-chatbot. Deze is direct verbonden met de meest actuele belastingdata, dus of het nu gaat om aftrekposten, BTW of je aangifte, je krijgt altijd een snelle en betrouwbare oplossing – zonder wachten! We behandelen je gegevens veilig en in overeenstemming met de AVG-vereisten.",
        image: "/storage/media/chat-interface.png",
        alt: "Chat Interface"
      },
      {
        title: "2. Kom je er niet uit? Wij vinden een geschikte adviseur",
        description: "Soms is een vraag te specifiek voor onze chatbot, of wil je (een deel van) je administratie liever uitbesteden. Geen probleem! Binnen 24 uur koppelt Jan de Belastingman je aan een deskundige adviseur die jouw situatie volledig begrijpt en de regels persoonlijk voor je toepast. Zo krijg je altijd de hulp van een specialist die precies bij jou past, zonder gedoe.",
        image: "/storage/media/business-professional.jpeg",
        alt: "Professional Advisor"
      },
      {
        title: "3. Maak een account aan en beheer je belastingvragen",
        description: "Met een gratis account bij Jan de Belastingman houd je alles overzichtelijk bij elkaar. Meld je gemakkelijk aan via social login (Google of Facebook) of je e-mail en sla al je belastingvragen op één plek op. Zo kun je altijd terugkijken wat je hebt gevraagd - van toeslagen tot aftrekposten - en hoef je niet steeds opnieuw te beginnen. Handig voor nu én later, bijvoorbeeld bij je volgende aangifte!",
        image: "/storage/media/account-dashboard.png",
        alt: "Account Dashboard",
        showButton: true
      }
    ]
  },
};

export default async function ZelfstandigenZonderPersoneelPage() {
  return <AdsPage contentDict={dictionary} locale="nl" />;
}
