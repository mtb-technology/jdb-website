import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import SidebarLayout from "../components/SidebarLayout";
import { GTMProvider } from "./components/providers/gtm-provider";
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
      <head>
        <Script id="taggrs-tracking" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://belastingaangifte.jandebelastingman.nl/zFKzwItWma.js?tg='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','NJX83RS');`}
        </Script>
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2146019,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      </head>
      <body className={avenirNext.className}>
        <noscript>
          <iframe
            src="https://belastingaangifte.jandebelastingman.nl/zFKzwItWma.html?tg=NJX83RS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <TrackingProvider>
          <GTMProvider>
            <SidebarLayout>{children}</SidebarLayout>
          </GTMProvider>
        </TrackingProvider>
      </body>
    </html>
  );
}
