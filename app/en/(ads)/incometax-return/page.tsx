import { AdsPage } from "@/components/AdsPage";

const dictionary = {
  metadata: {
    title: "Income Tax Return | Jan de Belastingman",
    description: "Learn everything about filing your tax return. Get help with your income tax declaration.",
    ogTitle: "Income Tax Return - Jan de Belastingman",
    ogDescription: "Expert help with your income tax return. Discover tips and advice from our AI assistant.",
    ogImageAlt: "Income Tax Return from Jan de Belastingman",
  },
  hero: {
    title: "Instant Dutch Tax Advice for Expats (Belastingaangifte)",
    description: "Get immediate guidance on Dutch taxes. From understanding the tax system to expert assistance with your income tax return. Experience a stress-free, accurate, and time-efficient process.",
    callToAction: "No matter the case, Jan de Belastingman makes sure you can fill out your tax return with peace of mind, not miss out on any details, and file your tax return in time for the Dutch deadlines.",
    buttonText: "Ask your question in chat",
    buttonSubtext: "Instant answer",
    buttonLink: "/en/chat/income-tax-return",
    image: {
      src: "/storage/media/chat-interface.png",
      alt: "Chat Interface Preview",
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
    title: "Understanding Dutch Taxes Made Simple",
    description: "Navigating the Dutch tax system as an expat can be challenging. Questions about applicable deductions, the impact of tax treaties with your home country, and ensuring compliance are common. Our instant tax advice chat provides clear, personalized answers in seconds, eliminating jargon and long waits. Whether you seek guidance or prefer a professional to handle your return, we're here to assist.",
    buttonText: "Ask your question in chat",
    buttonSubtext: "Instant answer",
    buttonLink: "/en/chat/income-tax-return",
    imageSrc: "/storage/media/business-professional.jpeg",
    imageAlt: "Professional Tax Advisor",
  },
  stepsSection: {
    sectionTitle: "THIS IS HOW CAN WE HELP YOU",
    buttonText: "Ask your question in chat",
    buttonLink: "/en/chat/income-tax-return",
    buttonSubtext: "Instant answer",
    items: [
      {
        title: "1. Ask your question 24/7 and get an immediate answer",
        description: "Do you have a question about your taxes? At Jan de Belastingman, ask your question online and get a clear answer right away from our smart AI chatbot. It is directly connected to the most up-to-date tax data, so whether it's about deductions, VAT or your tax return, you will always get a quick and reliable solution, without waiting! We handle your data securely and in compliance with AVG requirements.",
        image: "/storage/media/chat-interface.png",
        alt: "Chat Interface"
      },
      {
        title: "2. Need more help? We will find a suitable advisor",
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
    name: "tax-return",
  },
};

export default async function IncomeTaxReturnPage() {
  return <AdsPage contentDict={dictionary} locale="en" />;
}
