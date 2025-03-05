import VindEenAdviseurPage from "@/app/vind-een-adviseur/page";
import { generatePageMetadata } from "@/lib/metadata";

export const generateMetadata = generatePageMetadata;

export default async function LocalizedPage() {
  return <VindEenAdviseurPage params={{ locale: "en" }} />;
}
