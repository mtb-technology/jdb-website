import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { generatePageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../dictionaries";

type OverOnsPageProps = {
  params: {
    locale: "nl" | "en";
  };
};

interface TeamMember {
  name: string;
  role: string;
  background: string;
}

interface Milestone {
  year: string;
  subtitle: string;
  description: string;
}

interface PartnerType {
  title: string;
  description: string;
}

interface AboutUsDict {
  title: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  team: {
    title: string;
    description: string;
    members: TeamMember[];
  };
  journey: {
    title: string;
    milestones: Milestone[];
  };
  partners: {
    title: string;
    description: string;
    types: PartnerType[];
  };
  mission: {
    title: string;
    description: string;
    points: string[];
  };
  vision: {
    title: string;
    description: string;
    points: string[];
  };
  cta: {
    title: string;
    description: string;
    buttons: {
      chat: string;
      howItWorks: string;
    };
  };
}

export const generateMetadata = generatePageMetadata;

export default async function OverOnsPage({ params }: OverOnsPageProps) {
  const locale = params.locale || "nl";
  const dict = await getDictionary(locale);
  const aboutUs = (dict.pages as any)["about-us"] as AboutUsDict;

  return (
    <main className="relative flex-1 flex flex-col pt-20">
      <Header dict={dict} />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <AboutUsContent dict={aboutUs} />
        </div>
      </div>
      <Footer dict={dict} />
    </main>
  );
}

interface AboutUsContentProps {
  dict: AboutUsDict;
}

function AboutUsContent({ dict }: AboutUsContentProps) {
  const teamMembers = dict.team.members;

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">{dict.title}</h1>
        <div className="max-w-3xl mx-auto">
          <div className="relative h-80 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://jandebelastingman.nl/storage/media/belastinghulp.png"
              alt="Jan de Belastingman Team"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gray-50 rounded-2xl p-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {dict.story.title}
            </h2>
            {dict.story.paragraphs.map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-700 mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="md:w-1/2 relative h-64 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/storage/media/administration.jpg"
              alt="Oprichting Jan de Belastingman"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          {dict.team.title}
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {dict.team.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member: any, index: number) => (
            <div
              key={index}
              className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto border-4 border-primary/10">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-xs">{member.background}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Evolution Section */}
      <section className="bg-primary text-white rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {dict.journey.title}
        </h2>
        <div className="space-y-8">
          {dict.journey.milestones.map((milestone: any, index: number) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-6"
            >
              <div className="md:w-1/4 text-center">
                <h3 className="text-xl font-bold">{milestone.year}</h3>
                <p className="text-sm">{milestone.subtitle}</p>
              </div>
              <div className="md:w-3/4">
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certified Partners Section */}
      <section className="bg-gray-50 rounded-2xl p-10 my-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {dict.partners.title}
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          {dict.partners.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.partners.types.map((type: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-primary">
                {type.title}
              </h3>
              <p className="text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {dict.mission.title}
            </h2>
            <p className="text-gray-700 mb-6">{dict.mission.description}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {dict.mission.points.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4 text-primary">
              {dict.vision.title}
            </h2>
            <p className="text-gray-700 mb-6">{dict.vision.description}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {dict.vision.points.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center bg-gray-50 rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-6">{dict.cta.title}</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {dict.cta.description}
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/en/">
            <Button className="bg-primary text-white hover:bg-[#2341C7] transition-colors duration-300">
              {dict.cta.buttons.chat}
            </Button>
          </Link>
          <Link href="/en/how-it-works">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              {dict.cta.buttons.howItWorks}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
