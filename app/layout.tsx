import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarLayout from "../components/SidebarLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Jan de Belastingman",
  description: "Belasting advies via AI",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const locale = params?.lang || "nl";
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <SidebarLayout >
          {children}
        </SidebarLayout>
      </body>
    </html>
  );
}
