import { chatENToDictionaryKey, routes, topicENToDictionaryKey } from '@/lib/routes';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.jandebelastingman.nl';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add main pages
  const mainPages = [
    { key: 'home', nl: '', en: '' },
    { key: 'how-it-works', nl: routes['how-it-works'].nl, en: routes['how-it-works'].en },
    { key: 'blog', nl: routes['blog'].nl, en: routes['blog'].en },
    { key: 'about-us', nl: routes['about-us'].nl, en: routes['about-us'].en },
    { key: 'find-advisor', nl: routes['find-advisor'].nl, en: routes['find-advisor'].en },
  ];

  mainPages.forEach(({ key, nl, en }) => {
    sitemapEntries.push({
      url: `${BASE_URL}${nl ? `/${nl}` : ''}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: key === 'home' ? 1 : 0.8,
      alternates: {
        languages: {
          nl: `${BASE_URL}${nl ? `/${nl}` : ''}`,
          en: `${BASE_URL}/en${en ? `/${en}` : ''}`,
        },
      },
    });
  });

  // Add topic pages
  Object.entries(topicENToDictionaryKey).forEach(([topicKey, dictionaryKey]) => {
    if (routes[dictionaryKey] && routes['topics']) {
      sitemapEntries.push({
        url: `${BASE_URL}/${routes['topics'].nl}/${routes[dictionaryKey].nl}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: {
            nl: `${BASE_URL}/${routes['topics'].nl}/${routes[dictionaryKey].nl}`,
            en: `${BASE_URL}/en/${routes['topics'].en}/${routes[dictionaryKey].en}`,
          },
        },
      });
    }
  });

  // Add chat pages
  Object.entries(chatENToDictionaryKey).forEach(([chatKey, dictionaryKey]) => {
    if (routes[dictionaryKey] && routes['chat']) {
      sitemapEntries.push({
        url: `${BASE_URL}/${routes['chat'].nl}/${routes[dictionaryKey].nl}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
        alternates: {
          languages: {
            nl: `${BASE_URL}/${routes['chat'].nl}/${routes[dictionaryKey].nl}`,
            en: `${BASE_URL}/en/${routes['chat'].en}/${routes[dictionaryKey].en}`,
          },
        },
      });
    }
  });

  return sitemapEntries;
} 