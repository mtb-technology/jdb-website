import { routes } from '@/lib/routes';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.jandebelastingman.nl';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add main pages
  const mainPages = [
    { key: 'home', nl: routes['home'].nl, en: routes['home'].en },
    { key: 'how-it-works', nl: routes['how-it-works'].nl, en: routes['how-it-works'].en },
    { key: 'blog', nl: routes['blog'].nl, en: routes['blog'].en },
    { key: 'about-us', nl: routes['about-us'].nl, en: routes['about-us'].en },
    { key: 'find-advisor', nl: routes['find-advisor'].nl, en: routes['find-advisor'].en },
    { key: 'topics', nl: routes['topics'].nl, en: routes['topics'].en },
    { key: 'chat', nl: routes['chat'].nl, en: routes['chat'].en },
  ];

  // Add main pages to sitemap
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
  Object.keys(routes).filter(key => key.startsWith('topics/')).forEach((topicKey) => {
    const { nl, en } = routes[topicKey];
    sitemapEntries.push({
      url: `${BASE_URL}/${nl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          nl: `${BASE_URL}/${nl}`,
          en: `${BASE_URL}/en/${en}`,
        },
      },
    });
  });

  // Add chat pages
  Object.keys(routes).filter(key => key.startsWith('chat/')).forEach((chatKey) => {
    const { nl, en } = routes[chatKey];
    sitemapEntries.push({
      url: `${BASE_URL}/${nl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          nl: `${BASE_URL}/${nl}`,
          en: `${BASE_URL}/en/${en}`,
        },
      },
    });
  });

  return sitemapEntries;
} 