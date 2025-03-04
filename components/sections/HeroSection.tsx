import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  callToAction: string;
  buttonText: string;
  buttonSubtext: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  stats: string;
}

export default function HeroSection({
  title,
  description,
  callToAction,
  buttonText,
  buttonSubtext,
  image,
  stats,
}: HeroSectionProps) {
  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>
          <p className="text-gray-600 mb-6">{callToAction}</p>
          <Button className="bg-primary text-white hover:bg-[#2341C7] mb-2">{buttonText}</Button>
          <p className="text-sm text-gray-500">{buttonSubtext}</p>
        </div>
        <div>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="rounded-lg shadow-lg mx-auto"
          />
          <div className="mt-4 text-sm text-gray-500 text-center">{stats}</div>
        </div>
      </div>
    </div>
  );
} 