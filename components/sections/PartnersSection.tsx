import Image from "next/image";

interface Partner {
  src: string;
  alt: string;
  width: number;
}

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
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
  );
} 