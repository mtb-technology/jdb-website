import type { Metadata } from "next";
import localFont from "next/font/local";
import SidebarLayout from "../components/SidebarLayout";
import { TrackingProvider } from "./components/providers/tracking-provider";
import "./globals.css";

const avenirNext = localFont({
  src: [
    {
      path: "../public/fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-avenir-next",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

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
      <body className={avenirNext.className}>
        <TrackingProvider>
          <SidebarLayout>{children}</SidebarLayout>
        </TrackingProvider>
      </body>
    </html>
  );
}
