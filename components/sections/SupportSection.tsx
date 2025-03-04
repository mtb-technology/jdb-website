import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface SupportSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonSubtext: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
}

export default function SupportSection({
  title,
  description,
  buttonText,
  buttonSubtext,
  buttonLink,
  imageSrc,
  imageAlt,
}: SupportSectionProps) {
  return (
    <div className="mb-20">
      <div className="bg-[#EEF2FF] rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center p-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">{title}</h2>
            <p className="text-gray-700 mb-6">{description}</p>
            <Link href={buttonLink}>
              <Button className="bg-[#1E3BB3] text-white hover:bg-[#152C8F] transition-colors mb-2">
                {buttonText}
              </Button>
            </Link>
            <p className="text-sm text-gray-600 mt-2">{buttonSubtext}</p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg"></div>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={400}
              height={240}
              className="rounded-lg object-cover mx-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 