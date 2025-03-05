import { generatePageMetadata } from "@/lib/metadata";
import { default as DefaultShowItWorks } from "../../hoe-werkt-het/page";

export const generateMetadata = generatePageMetadata;

export default async function LocalizedPage() {
  return <DefaultShowItWorks params={{ locale: 'en' }} />;
} 