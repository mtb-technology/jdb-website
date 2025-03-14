import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  callToAction: string;
  buttonText: string;
  buttonSubtext: string;
  buttonLink: string;
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
  buttonLink,
  image,
  stats,
}: HeroSectionProps) {
  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div
            className="text-gray-600 mb-6"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className="text-gray-600 mb-6">{callToAction}</p>
          <Link href={buttonLink}>
            <Button className="bg-primary text-white hover:bg-primary mb-2">
              {buttonText}
            </Button>
          </Link>
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