import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SupportedLocale } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getDictionary } from "../dictionaries";

const features = [
  "Gratis en onafhankelijk advies via chat",
  "Gebouwd op de nieuwste generatie AI",
  "Direct gekoppeld aan actuele belastingdata",
]

const navLinks = [
  { href: "#", label: "Hoe werkt het" },
  { href: "#", label: "Onderwerpen" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Over ons" },
]

const partners = [
  {
    src: "https://jandebelastingman.nl/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
    alt: "De Jurist",
    width: 100,
  },
  {
    src: "https://jandebelastingman.nl/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
    alt: "Accountant",
    width: 120,
  },
  {
    src: "https://jandebelastingman.nl/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
    alt: "Quote",
    width: 90,
  },
  {
    src: "https://jandebelastingman.nl/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
    alt: "FD",
    width: 60,
  },
]

const steps = [
  {
    title: "1. Stel je vraag 24/7 en krijg direct antwoord",
    description:
      "Heb je een vraag over je belastingen? Bij Jan de Belastingman stel je jouw vraag online en krijg je meteen een duidelijk antwoord van onze slimme AI-chatbot. Deze is direct verbonden met de meest actuele belastingdata, dus of het nu gaat om aftrekposten, toeslagen of je aangifte, je krijgt altijd een snelle en betrouwbare oplossing – zonder wachten!",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scherm%C2%ADafbeelding%202025-02-26%20om%2016.23.59-oYubQJhKr5eN7kW099wpXbYm9rVhOR.png",
    alt: "Chat Interface",
    icon: "message-circle",
  },
  {
    title: "2. Kom je er niet uit? Wij vinden een passende adviseur",
    description:
      "Soms is een vraag te specifiek of persoonlijk voor onze chatbot, die nog niet alle regels op jouw unieke situatie kan toepassen. Geen probleem! Binnen 24 uur koppelt Jan de Belastingman je aan een deskundige adviseur die jouw situatie volledig begrijpt en de regels persoonlijk voor je uitwerkt. Zo krijg je altijd de hulp die precies bij jou past, zonder gedoe.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21211.jpg-jR9QkRMwu3UbhbAi0HuVs8tbdjwpga.jpeg",
    alt: "Professional Advisor",
    icon: "users",
  },
  {
    title: "3. Maak een account aan en beheer je belastingvragen",
    description:
      "Met een gratis account bij Jan de Belastingman houd je alles overzichtelijk bij elkaar. Meld je gemakkelijk aan via social login (Google of Facebook) of je e-mail en sla al je belastingvragen en antwoorden op één plek op. Zo kun je altijd terugkijken wat je hebt gevraagd - van toeslagen tot aftrekposten - en hoef je niet steeds opnieuw te beginnen. Handig voor nu én later, bijvoorbeeld bij je volgende aangifte!",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scherm%C2%ADafbeelding%202025-02-26%20om%2016.37.40-BaU3osKIKf3A0BMtu6F6BrSORHRosT.png",
    alt: "Account Dashboard",
    icon: "user-plus",
  },
]

const faqItems = [
  {
    question: "Wat is een BV en waarom zou ik er een oprichten?",
    answer:
      "Een BV (Besloten Vennootschap) is een rechtsvorm waarbij het bedrijf een aparte rechtspersoon is, gescheiden van de eigenaren. Het oprichten van een BV kan voordelen bieden op het gebied van aansprakelijkheid, belastingen en het aantrekken van investeerders. Het is vooral geschikt voor ondernemers die hun persoonlijke vermogen willen scheiden van het bedrijfsvermogen en die verwachten dat hun bedrijf zal groeien.",
  },
  {
    question: "Welke belastingvoordelen heeft een BV?",
    answer:
      "Een BV kan verschillende belastingvoordelen bieden, waaronder een lager vennootschapsbelastingtarief voor winsten tot €395.000 (15% in 2023), de mogelijkheid om winst in de BV te houden voor herinvestering tegen een lager tarief, en de optie om jezelf een salaris uit te keren en dividenden te ontvangen. Daarnaast zijn er mogelijkheden voor fiscale optimalisatie die niet beschikbaar zijn voor eenmanszaken of VOF's.",
  },
  {
    question: "Hoe kan Jan de Belastingman mij helpen bij het beheren van mijn BV?",
    answer:
      "Jan de Belastingman biedt expert advies en ondersteuning op verschillende gebieden van BV-beheer, waaronder belastingplanning, compliance met wet- en regelgeving, financiële rapportage, en strategisch advies. Onze AI-gestuurde chatbot kan direct antwoord geven op veel voorkomende vragen, terwijl ons netwerk van ervaren adviseurs beschikbaar is voor meer complexe kwesties. We helpen je om je BV financieel gezond te houden en optimaal gebruik te maken van beschikbare fiscale voordelen.",
  },
]

const blogArticles = [
  {
    title: "5 Fiscale Tips voor BV-Eigenaren in 2023",
    link: "#",
  },
  {
    title: "Hoe de Nieuwe Belastingwetgeving Jouw BV Beïnvloedt",
    link: "#",
  },
  {
    title: "BV vs. Eenmanszaak: Wat Past het Beste bij Jouw Onderneming?",
    link: "#",
  },
  {
    title: "Optimaliseer Je BV-Structuur: Een Stap-voor-Stap Gids",
    link: "#",
  },
]

interface BlogPageProps {
  params: {
    locale: SupportedLocale
  }
}

  
 export default async function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale || 'nl';
  const dict = await getDictionary(locale);
  const blog = dict.pages['blog'] as BlogPageProps;

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header />
      
      <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-12">
            {/* About Us Content */}
            <BlogContent />
          </div>
        </div>

      <Footer dict={dict} />
    </main>
  );
}


function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("Alle")
  const [visiblePosts, setVisiblePosts] = useState(6)

  const categories = ["Alle", "Updates", "Belastingtips", "ZZP", "Ondernemers", "Particulieren", "Toeslagen"]

  const blogPosts = [
    {
      title: "Wisselende inkomsten als zzp'er? Zo blijf je financieel gezond bewerken",
      image:
        "https://sjc.microlink.io/Iv5odAth-P1S8-l3f-K0R3l2l4vHklNCJNQdlsQjtUftBWKUydQ-e0qIlA3npOiOCdSsr9teX-Xx06qoLTLsDg.jpeg",
      date: "Tuesday 19 November 2024",
      category: "ZZP",
      slug: "wisselende-inkomsten-zzper",
    },
    {
      title: "Alles wat je moet weten over de kleineondernemersregeling (KOR)",
      image:
        "https://sjc.microlink.io/Iv5odAth-P1S8-l3f-K0R3l2l4vHklNCJNQdlsQjtUftBWKUydQ-e0qIlA3npOiOCdSsr9teX-Xx06qoLTLsDg.jpeg",
      date: "Tuesday 24 September 2024",
      category: "Ondernemers",
      slug: "kleineondernemersregeling-kor",
    },
    {
      title: "Belastingaangifte 2024: Belangrijke wijzigingen en deadlines",
      image: "/placeholder.svg?height=400&width=600",
      date: "Monday 15 July 2024",
      category: "Updates",
      slug: "belastingaangifte-2024-wijzigingen",
    },
    {
      title: "Hoe werkt de hypotheekrenteaftrek in 2024?",
      image: "/placeholder.svg?height=400&width=600",
      date: "Friday 28 June 2024",
      category: "Particulieren",
      slug: "hypotheekrenteaftrek-2024",
    },
    {
      title: "Toeslagen aanvragen: Een stap-voor-stap gids",
      image: "/placeholder.svg?height=400&width=600",
      date: "Wednesday 12 June 2024",
      category: "Toeslagen",
      slug: "toeslagen-aanvragen-gids",
    },
    {
      title: "5 Belastingtips voor ondernemers in 2024",
      image: "/placeholder.svg?height=400&width=600",
      date: "Monday 27 May 2024",
      category: "Belastingtips",
      slug: "belastingtips-ondernemers-2024",
    },
    // Add more blog posts here to test the "Load More" functionality
    {
      title: "Zzp'er en pensioen: Wat zijn je opties?",
      image: "/placeholder.svg?height=400&width=600",
      date: "Friday 19 April 2024",
      category: "ZZP",
      slug: "zzper-pensioen-opties",
    },
    {
      title: "Nieuwe btw-regels voor e-commerce ondernemers",
      image: "/placeholder.svg?height=400&width=600",
      date: "Tuesday 2 April 2024",
      category: "Ondernemers",
      slug: "nieuwe-btw-regels-ecommerce",
    },
    {
      title: "Hoe bereid je je voor op de belastingaangifte als particulier?",
      image: "/placeholder.svg?height=400&width=600",
      date: "Monday 18 March 2024",
      category: "Particulieren",
      slug: "voorbereiding-belastingaangifte-particulier",
    },
  ]

  const filteredPosts =
    selectedCategory === "Alle" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const visibleFilteredPosts = filteredPosts.slice(0, visiblePosts)

  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) => prevVisible + 3)
  }

  return (
    <div className="relative">
      {/* Blue background with wave */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[#2B4EE6] -z-10">
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Blog Content */}
      <div className="relative z-0 pt-12 pb-24">
        {/* Header and Subheader */}
        <header className="text-center text-black mb-16">
          <h1 className="text-4xl font-bold mb-4">Nieuwsberichten</h1>
          <p className="max-w-3xl mx-auto text-lg">
            Vind hier alle berichten omtrent belastingnieuws. Daarnaast geeft Jan de Belastingman updates over tips &
            tricks die jou helpen belasting te besparen.</p>
        </header>

        {/* Category Filters */}
        <section className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? "bg-[#2B4EE6] text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleFilteredPosts.map((post, index) => (
              <Link href={`/blog/${post.slug}`} key={index} className="group">
                <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2B4EE6] text-white text-xs font-medium px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#2B4EE6] transition-colors">
                      {post.title}
                    </h2>
                    <time className="text-sm text-gray-500">{post.date}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        {visiblePosts < filteredPosts.length && (
          <section className="max-w-6xl mx-auto px-6 mt-12 text-center">
            <Button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" onClick={loadMorePosts}>
              Meer artikelen laden
            </Button>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="max-w-4xl mx-auto px-6 mt-24">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Blijf op de hoogte</h2>
              <p className="text-gray-600">Ontvang de nieuwste belastingtips en updates direct in je inbox.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Je e-mailadres"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B4EE6]"
                required
              />
              <Button className="bg-[#2B4EE6] text-white hover:bg-[#2341C7] whitespace-nowrap">Aanmelden</Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
