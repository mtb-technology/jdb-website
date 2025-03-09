import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Step {
  title: string;
  description: string;
  image: string;
  alt: string;
  showButton?: boolean;
}

interface StepsSectionProps {
  title?: string;
  steps: Step[];
  buttonText: string;
  buttonLink: string;
  buttonSubtext: string;
}

export default function StepsSection({
  title,
  steps,
  buttonText,
  buttonLink,
  buttonSubtext,
}: StepsSectionProps) {
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-center mb-12">{title}</h2>
      )}
      <div className="space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
            <div className={index === 1 ? "md:order-2" : ""}>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {step.showButton && (
                <>
                  <Button
                    className="bg-primary text-white hover:bg-[#2341C7] mt-6"
                    asChild
                  >
                    <a href={buttonLink}>{buttonText}</a>
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">{buttonSubtext}</p>
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
  );
} 