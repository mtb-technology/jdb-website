"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "../../components/Header";


export default function BVPage() {


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
    },
    {
      title: "2. Kom je er niet uit? Wij vinden een passende adviseur",
      description:
        "Soms is een vraag te specifiek of persoonlijk voor onze chatbot, die nog niet alle regels op jouw unieke situatie kan toepassen. Geen probleem! Binnen 24 uur koppelt Jan de Belastingman je aan een deskundige adviseur die jouw situatie volledig begrijpt en de regels persoonlijk voor je uitwerkt. Zo krijg je altijd de hulp die precies bij jou past, zonder gedoe.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21211.jpg-jR9QkRMwu3UbhbAi0HuVs8tbdjwpga.jpeg",
      alt: "Professional Advisor",
    },
    {
      title: "3. Maak een account aan en beheer je belastingvragen",
      description:
        "Met een gratis account bij Jan de Belastingman houd je alles overzichtelijk bij elkaar. Meld je gemakkelijk aan via social login (Google of Facebook) of je e-mail en sla al je belastingvragen en antwoorden op één plek op. Zo kun je altijd terugkijken wat je hebt gevraagd - van toeslagen tot aftrekposten - en hoef je niet steeds opnieuw te beginnen. Handig voor nu én later, bijvoorbeeld bij je volgende aangifte!",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scherm%C2%ADafbeelding%202025-02-26%20om%2016.37.40-BaU3osKIKf3A0BMtu6F6BrSORHRosT.png",
      alt: "Account Dashboard",
      showButton: true,
    },
  ]
  return (
    <main className="flex-1 flex flex-col relative">
      <Header />

      <div className="pt-22 overflow-y-auto h-[calc(100vh)]">
          <div className="max-w-5xl mx-auto px-6 py-12">
            {/* Hero Section */}
            <HeroSection />

            {/* Partners Section */}
            <PartnersSection partners={partners} />

            {/* Secondary Section - BV Ondersteuning */}
            <BVSupportSection />

            {/* Steps Section */}
            <StepsSection steps={steps} />
          </div>
        </div>
    </main>
  );
} 



function HeroSection() {
  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Expert Ondersteuning voor Besloten Vennootschappen (BV&apos;s)</h1>
          <p className="text-gray-600 mb-6">
            Beheer je een BV of loop je tegen uitdagingen aan bij het beheren van bedrijfsbelastingen of juridische verplichtingen? 
            Jan de Belastingman helpt je de complexiteit van het runnen van een Besloten Vennootschap in Nederland te doorgronden, zodat je bedrijf compliant en financieel gezond blijft.
          </p>
          <p className="text-gray-600 mb-6">
            Wil je een BV oprichten? Ontdek met Jan de Belastingman hoe een BV jouw financiële toekomst kan transformeren &ndash; start nu jouw winstgevendere ondernemersreis!&quot;
          </p>
          <Button className="bg-[#2B4EE6] text-white hover:bg-[#2341C7] mb-2">Stel je vraag in de chat</Button>
          <p className="text-sm text-gray-500">Direct antwoord</p>
        </div>
        <div>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scherm%C2%ADafbeelding%202025-02-26%20om%2016.23.59-oYubQJhKr5eN7kW099wpXbYm9rVhOR.png"
            alt="Chat Interface Preview"
            width={400}
            height={240}
            className="rounded-lg shadow-lg mx-auto"
          />
          <div className="mt-4 text-sm text-gray-500 text-center">Al 4.545 vragen over BV&apos;s beantwoord</div>
        </div>
      </div>
    </div>
  )
}

function PartnersSection({ partners }) {
  return (
    <div className="mb-20 text-center">
      <p className="text-gray-500 mb-4">Onder andere bekend van</p>
      <div className="flex justify-center items-center gap-8 grayscale opacity-60">
        {partners.map(
          (image, index) =>
            image.src && (
              <div key={index} className="h-6">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={image.width}
                  height={24}
                  className="h-full w-auto"
                />
              </div>
            ),
        )}
      </div>
    </div>
  )
}

function BVSupportSection() {
  return (
    <div className="mb-20">
      <div className="bg-[#EEF2FF] rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center p-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-[#2B4EE6]">BV Ondersteuning in Nederland</h2>
            <p className="text-gray-700 mb-6">
              Het runnen van een BV in Nederland vereist naleving van specifieke financiële regels en
              belastingverplichtingen. Jan de Belastingman biedt op maat gemaakte begeleiding voor BV&apos;s om je te helpen
              je bedrijfsverplichtingen effectief te beheren, van belastingplanning tot naleving van de Nederlandse
              ondernemingswetgeving.
            </p>
            <Button className="bg-[#1E3BB3] text-white hover:bg-[#152C8F] transition-colors mb-2">
              Stel je vraag in de chat
            </Button>
            <p className="text-sm text-gray-600 mt-2">Direct antwoord</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2B4EE6]/20 to-transparent rounded-lg"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21211.jpg-jR9QkRMwu3UbhbAi0HuVs8tbdjwpga.jpeg"
              alt="Business Professional"
              width={400}
              height={240}
              className="rounded-lg object-cover mx-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StepsSection({ steps }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-12">ZO KUNNEN WE JE HELPEN MET JE BV</h2>
      <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
            <div className={index === 1 ? "md:order-2" : ""}>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {step.showButton && (
                <>
                  <Button className="bg-[#2B4EE6] text-white hover:bg-[#2341C7] mt-6">Stel je vraag in de chat</Button>
                  <p className="text-sm text-gray-500 mt-2">Direct antwoord</p>
                </>
              )}
            </div>
            <div className={index === 1 ? "md:order-1" : ""}>
              <Image
                src={step.image || "/placeholder.svg"}
                alt={step.alt}
                width={400}
                height={240}
                className={`rounded-lg shadow-lg mx-auto ${index === 1 ? "object-cover" : ""}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
