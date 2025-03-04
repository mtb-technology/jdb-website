import { default as DefaultShowItWorks } from "../../hoe-werkt-het/page";



export default async function LocalizedPage() {
  return <DefaultShowItWorks params={{ locale: 'en' }} />;
} 