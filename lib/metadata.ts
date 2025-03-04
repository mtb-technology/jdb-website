import { getDictionary } from "@/app/dictionaries";
import { Metadata, Viewport } from "next";
import { routes } from "./routes";
import { BaseMetadata, PageSpecificMetadata, SupportedLocale } from "./types";

// Create a type for all possible route keys
export type RouteKey = keyof typeof routes;

interface GenerateMetadataProps {
  params: {
    locale: SupportedLocale;
  };
  page?: RouteKey;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Default metadata configuration
export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://jandebelastingman.nl"),
  applicationName: "Jan de Belastingman",
  authors: [{ name: "Jan de Belastingman" }],
  creator: "Jan de Belastingman",
  publisher: "Jan de Belastingman",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
} satisfies Metadata;

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "light dark",
};

function generateOgImageUrl(title: string, description: string, locale: SupportedLocale): string {
  const params = new URLSearchParams({
    title,
    description,
    locale,
  });
  return `/api/og?${params.toString()}`;
}

function getLocalizedUrl(
  locale: SupportedLocale,
  page: RouteKey,
  localizedPath: string
): string {
  const basePath = locale === "nl" ? "" : `/${locale}`;
  return `${basePath}${localizedPath ? `/${localizedPath}` : ""}`;
}

export async function generatePageMetadata({
  params,
  page = "home",
}: Omit<GenerateMetadataProps, 'searchParams'>): Promise<Metadata> {
  const locale = params.locale ?? "nl";
  const dict = await getDictionary(locale);
  
  // Create the base metadata structure from the root metadata
  const baseMetadata: BaseMetadata = {
    title: dict.metadata.title,
    description: dict.metadata.description,
    ogTitle: dict.metadata.ogTitle,
    ogDescription: dict.metadata.ogDescription,
    ogImageAlt: dict.metadata.ogImageAlt,
    twitterTitle: dict.metadata.twitterTitle,
    twitterDescription: dict.metadata.twitterDescription,
  };

  // Get page-specific metadata from the correct location in the dictionary
  let pageMetadata: PageSpecificMetadata;
  
  if (page === "home") {
    // For home page, use the base metadata
    pageMetadata = {
      title: dict.metadata.title,
      description: dict.metadata.description,
      ogTitle: dict.metadata.ogTitle,
      ogDescription: dict.metadata.ogDescription,
    };
  } else {
    // For other pages, try to get from pages[routeName].metadata, fallback to base metadata
    const pageData = dict.pages && typeof page === 'string' ? (dict.pages as Record<string, { metadata?: PageSpecificMetadata }>)[page] : undefined;
    if (pageData?.metadata) {
      pageMetadata = pageData.metadata;
    } else {
      // Fallback to base metadata if page metadata doesn't exist
      pageMetadata = {
        title: dict.metadata.title,
        description: dict.metadata.description,
        ogTitle: dict.metadata.ogTitle,
        ogDescription: dict.metadata.ogDescription,
      };
    }
  }

  // Get the localized route path
  const localizedPath = routes[page]?.[locale] || "";
  const localizedUrl = getLocalizedUrl(locale, page, localizedPath);

  // Generate dynamic OG image URL
  const ogImageUrl = generateOgImageUrl(
    pageMetadata.ogTitle,
    pageMetadata.ogDescription,
    locale
  );

  // Ensure base URL is always available
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jandebelastingman.nl';

  // Construct absolute URLs safely
  const absoluteUrl = new URL(localizedUrl, baseUrl).toString();
  const absoluteOgImageUrl = new URL(ogImageUrl, baseUrl).toString();

  return {
    ...defaultMetadata,
    title: {
      template: '%s | Jan de Belastingman',
      default: pageMetadata.title,
    },
    description: pageMetadata.description,
    openGraph: {
      type: "website",
      locale: locale,
      url: absoluteUrl,
      title: {
        template: '%s | Jan de Belastingman',
        default: pageMetadata.ogTitle,
      },
      description: pageMetadata.ogDescription,
      siteName: "Jan de Belastingman",
      images: [
        {
          url: absoluteOgImageUrl,
          width: 1200,
          height: 630,
          alt: baseMetadata.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageMetadata.ogTitle,
      description: pageMetadata.ogDescription,
      images: [absoluteOgImageUrl],
      creator: "@jandebelastingman",
    },
    alternates: {
      canonical: absoluteUrl,
      languages: {
        "nl": new URL(getLocalizedUrl("nl", page, localizedPath), baseUrl).toString(),
        "en": new URL(getLocalizedUrl("en", page, localizedPath), baseUrl).toString(),
      },
    },
    verification: {
      google: "your-google-site-verification",
    },
  };
} 