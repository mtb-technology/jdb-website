import { AdsPage } from "@/components/AdsPage";

const dictionary = {
  metadata: {
    title: "M-Form | Jan de Belastingman",
    description: "Learn everything about the M-Form. Get help with your M-Form declaration.",
    ogTitle: "M-Form - Jan de Belastingman",
    ogDescription: "Expert help with your M-Form declaration. Discover tips and advice from our AI assistant.",
    ogImageAlt: "M-Form from Jan de Belastingman",
  },
  hero: {
    title: "Expert assistance for stress-free M form (M-Formulier) filing",
    description: "Struggling with your M-form tax return after relocating from or departing the Netherlands? Don't fret. Jan de Belastingman is here to make the process seamless for you.",
    callToAction: "Could you use some help with your tax return during years of migration? Jan de Belastingman takes care of everything for you and is happy to help you submit a complete and correct M form.",
    buttonText: "Ask your question in chat",
    buttonSubtext: "Instant answer",
    buttonLink: "/en/chat/m-form",
    image: {
      src: "/storage/media/advisor.jpg",
      alt: "Tax Advisor",
      width: 800,
      height: 600,
    },
    stats: "4.8 stars from reviews",
  },
  partners: {
    title: "As featured in",
    items: [
      {
        src: "/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
        alt: "De Jurist",
        url: "https://dejurist.com/nieuws/50008411/kortgedingrechter-jan-de-belastingman-maakt-geen-inbreuk-op-handelsnaam-jan",
        width: 100,
      },
      {
        src: "/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
        alt: "Accountant",
        url: "https://www.accountant.nl/nieuws/2020/8/jan-moet-jan-de-belastingman-dulden",
        width: 120,
      },
      {
        src: "/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
        alt: "Quote",
        url: "https://www.quotenet.nl/nieuws/a33495849/sneu-accountantskantoor-jan-eist-duizenden-euros-student",
        width: 90,
      },
      {
        src: "/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
        alt: "FD",
        url: "https://www.fd.nl/nieuws/2020/10/jan-de-belastingman-krijgt-kortgeding-van-student-die-zijn-naam-gebruikt-heeft~b4441f2b/?referrer=https%3A%2F%2Fjandebelastingman.test%2F&referrer=https%3A%2F%2Fjandebelastingman.nl%2F",
        width: 60,
      },
    ],
  },
  support: {
    title: "Help with completing your M form",
    description: "The M form is required when you've moved to or from the Netherlands during a tax year. Our experts understand the complexities of international taxation and ensure you claim all eligible deductions and benefits. Whether you're dealing with foreign income, the 30% ruling, or other migration-related tax matters, we'll help you file accurately and on time.",
    buttonText: "Ask your question in chat",
    buttonSubtext: "Instant answer",
    buttonLink: "/en/chat/m-form",
    imageSrc: "/storage/media/woman2.jpg",
    imageAlt: "Advisor",
  },
  stepsSection: {
    sectionTitle: "THIS IS HOW CAN WE HELP YOU",
    buttonText: "Ask your question in chat",
    buttonLink: "/en/chat/m-form",
    buttonSubtext: "Instant answer",
    items: [
      {
        title: "1. Ask your question 24/7 and get instant answers",
        description: "Do you have a question about your taxes? At Jan de Belastingman, ask your question online and get a clear answer right away from our smart AI chatbot. It is directly connected to the most up-to-date tax data, so whether it's about deductions, VAT or your tax return, you will always get a quick and reliable solution, without waiting! We handle your data securely and in compliance with GDPR requirements.",
        image: "/storage/media/chat-interface.png",
        alt: "Chat Interface"
      },
      {
        title: "2. Need more help? We'll find you a suitable advisor",
        description: "Sometimes a question is too specific for our chatbot, or you prefer to delegate (part of) your administration. No problem! Within 24 hours, Jan de Belastingman pairs you with an expert advisor who fully understands your situation and works out the rules for you personally. That way you always get specialist help that's just right for you, without the hassle.",
        image: "/storage/media/business-professional.jpeg",
        alt: "Professional Advisor"
      },
      {
        title: "3. Create an account and manage your tax questions",
        description: "With a free account with Jan de Belastingman, you'll keep everything organized. Sign up easily via social login (Google or Facebook) or your e-mail and save all your tax questions in one place. This way you can always look back at what you have asked - from allowances to deductions - and you don't have to keep starting over. Handy for now and later, for your next tax return, for example!",
        image: "/storage/media/account-dashboard.png",
        alt: "Account Dashboard",
        showButton: true
      }
    ]
  },
  form: {
    name: "m-form-advisor",
  },
};

export default async function MFormPage() {
  return <AdsPage contentDict={dictionary} locale="en" />;
}
