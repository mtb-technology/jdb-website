import Image from "next/image";
import Link from "next/link";

interface Partner {
  src: string;
  alt: string;
  width: number;
  url: string;
}

interface PartnersSectionProps {
  title: string;
  partners: Partner[];
}

export default function PartnersSection({
  title,
  partners,
}: PartnersSectionProps) {
  return (
    <div className="mb-20 text-center">
      <p className="text-gray-500 mb-4">{title}</p>
      <div className="flex justify-center items-center gap-8 grayscale opacity-60">
        {partners.map(
          (image, index) =>
            image.src && (
              <div key={index} className="h-6">
                <Link href={image.url} target="_blank">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={image.width}
                    height={24}
                    className="h-full w-auto"
                  />
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  );
} 