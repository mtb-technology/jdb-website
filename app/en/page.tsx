import { default as DefaultHome } from "../page";



export default async function LocalizedPage() {
  return <DefaultHome params={{ locale: 'en' }} />;
} 