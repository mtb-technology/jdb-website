import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getDictionary } from "./dictionaries";

export default async function NotFound() {
  const locale = "nl"; // Default to Dutch
  const dict = await getDictionary(locale);

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <NotFoundSection />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}

function NotFoundSection() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-8 relative">
        <div className="mb-6">
          <NotFoundAnimation />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Pagina niet gevonden
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Sorry, de pagina die je zoekt bestaat niet of is verplaatst.
      </p>

      <Button
        className="bg-[#2B4EE6] text-white hover:bg-[#2341C7] transition-colors duration-300 px-8 py-3"
        asChild
      >
        <Link href="/">Terug naar de homepagina</Link>
      </Button>
    </div>
  );
}

function NotFoundAnimation() {
  return (
    <div className="w-full max-w-xs mx-auto mb-8 relative">
      <div className="relative w-32 h-32 mx-auto">
        {/* Document with question mark animation */}
        <div className="absolute inset-0 animate-bounce-slow">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Animated Document */}
            <rect
              x="20"
              y="15"
              width="60"
              height="70"
              rx="4"
              fill="white"
              stroke="#2B4EE6"
              strokeWidth="3"
            />

            {/* Blue header area */}
            <rect
              x="20"
              y="15"
              width="60"
              height="15"
              rx="4 4 0 0"
              fill="#2B4EE6"
            />

            {/* Document lines */}
            <line
              x1="30"
              y1="45"
              x2="70"
              y2="45"
              stroke="#E4E4E7"
              strokeWidth="3"
            />
            <line
              x1="30"
              y1="55"
              x2="70"
              y2="55"
              stroke="#E4E4E7"
              strokeWidth="3"
            />
            <line
              x1="30"
              y1="65"
              x2="50"
              y2="65"
              stroke="#E4E4E7"
              strokeWidth="3"
            />

            {/* Question mark */}
            <text
              x="50"
              y="65"
              fontSize="30"
              fontWeight="bold"
              fill="#2B4EE6"
              textAnchor="middle"
              dominantBaseline="central"
              className="font-bold"
            >
              ?
            </text>

            {/* Magnifying glass */}
            <circle
              cx="65"
              cy="40"
              r="10"
              fill="white"
              stroke="#FF8A00"
              strokeWidth="3"
              className="animate-pulse"
            />
            <line
              x1="73"
              y1="48"
              x2="80"
              y2="55"
              stroke="#FF8A00"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
