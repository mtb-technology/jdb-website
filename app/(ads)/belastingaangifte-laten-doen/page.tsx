import { AdsPage } from "@/components/AdsPage";

const dictionary = {
  metadata: {
    title: "Zorgeloos belastingaangifte doen | Jan de Belastingman",
    description:
      "Deskundige belastinghulp voor particulieren en ondernemers in Nederland. Krijg hulp bij je aangifte en maximaliseer je aftrekposten.",
    ogTitle: "Deskundige Belastinghulp - Jan de Belastingman",
    ogDescription:
      "Professionele belastingaangifte service in Nederland. Krijg betrouwbaar advies en maximaliseer je teruggave.",
    ogImageAlt: "Belastingadvies van Jan de Belastingman",
  },
  hero: {
    title: "Laat je belastingaangifte doen. Zonder stress, snel en goed geregeld",
    description: "Moeite met je belastingaangifte? Onze experts regelen het voor je. Jij levert de info, wij doen de rest. <br><br/><ul><li>✔ Geen fouten – Alles dubbel gecheckt door experts</li><li>✔ Snel geregeld – Binnen 24 uur contact</li><li>✔ Maximaal voordeel – Wij kennen alle slimme aftrekposten</li></ul>",
    callToAction: "Wil jij ook makkelijk je belastingaangifte laten doen? Chat met onze AI-assistent, laat je gegevens achter en we nemen binnen 24 uur contact met je op. Jan de Belastingman laat zien dat het ook makkelijk en betrouwbaar kan.",
    buttonText: "Stel je vraag in de chat",
    buttonSubtext: "Direct antwoord",
    buttonLink: "/chat/belastingaangifte",
    image: {
      src: "/storage/media/advisor.jpg",
      alt: "Tax Advisor",
      width: 800,
      height: 600,
    },
    stats: "4.800+ tevreden klanten",
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
    title: "Waarom je aangifte uitbesteden? Laat je belastingaangifte zonder zorgen regelen",
    description: "Geen fouten. Geen stress. Geen gedoe. Onze belastingexperts zorgen ervoor dat jouw aangifte snel, foutloos en voordelig wordt ingediend. Laat geen aftrekpost liggen en voorkom problemen met de Belastingdienst. Wij optimaliseren je aangifte, zodat je nooit te veel betaalt!",
    buttonText: "Stel je vraag in de chat",
    buttonSubtext: "Direct antwoord",
    buttonLink: "/chat/belastingaangifte",
    imageSrc: "/storage/media/spaargeld.png",
    imageAlt: "Savings",
    items: [
      {
        title: "Expertkennis",
        description: "Toegang tot gecertificeerde belastingprofessionals met jarenlange ervaring"
      },
      {
        title: "Persoonlijke Service",
        description: "Advies op maat voor uw specifieke belastingsituatie"
      },
      {
        title: "Tijdige Indiening",
        description: "Gegarandeerde tijdige indiening van uw belastingaangifte"
      }
    ]
  },
  stepsSection: {
    sectionTitle: "ZO KUNNEN WE JE HELPEN",
    buttonText: "Stel je vraag in de chat",
    buttonSubtext: "Direct antwoord",
    buttonLink: "/chat/belastingaangifte",
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
  form: {
    name: "income-tax-advisor",
  },
};

export default async function BelastingaangifteLatenDoen() {
  return <AdsPage contentDict={dictionary} locale="nl" />;
}
