'use client';


const TRACKING_COOKIE_NAME = 'jdb_tracking_id';
const LEAD_SOURCE_COOKIE_NAME = 'jdb_lead_source';
const UTM_COOKIE_PREFIX = 'jdb_utm_';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// Common referrer patterns
const REFERRER_PATTERNS = [
  { pattern: /google\./i, source: 'google' },
  { pattern: /bing\./i, source: 'bing' },
  { pattern: /yahoo\./i, source: 'yahoo' },
  { pattern: /facebook\.com/i, source: 'facebook' },
  { pattern: /instagram\.com/i, source: 'instagram' },
  { pattern: /linkedin\.com/i, source: 'linkedin' },
  { pattern: /twitter\.com|x\.com/i, source: 'twitter' },
  { pattern: /youtube\.com/i, source: 'youtube' },
  // Add more patterns as needed
] as const;

export type LeadSource = typeof REFERRER_PATTERNS[number]['source'] | 'direct' | 'unknown' | string;

export interface TrackingData {
  trackingId: string;
  leadSource: LeadSource | null;
  utmParams: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  hotjarUserId: string | null;
  timestamp: number;
}

export function parseReferrer(referrer: string): LeadSource {
  if (!referrer) return 'direct';

  return referrer || 'unknown';
  
  // try {
  //   const url = new URL(referrer);
    
  //   // Check against known patterns
  //   for (const { pattern, source } of REFERRER_PATTERNS) {
  //     if (pattern.test(url.hostname)) {
  //       return source;
  //     }
  //   }
    
  //   // If no match, return the hostname without TLD
  //   const hostParts = url.hostname.split('.');
  //   if (hostParts.length >= 2) {
  //     return hostParts[hostParts.length - 2].toLowerCase();
  //   }
    
  //   return 'unknown';
  // } catch (e) {
  //   return 'unknown';
  // }
}

export function parseUtmParamsFromUrl(url: URL): Record<string, string> {
  const utmParams: Record<string, string> = {};
  const searchParams = new URLSearchParams(url.search);

  ['source', 'medium', 'campaign', 'term', 'content'].forEach((param) => {
    const value = searchParams.get(`utm_${param}`);
    if (value) {
      utmParams[param] = value;
    }
  });

  return utmParams;
}

// Cookie management functions for client-side
export const cookieUtils = {
  setTrackingCookie: (trackingId: string) => {
    document.cookie = `${TRACKING_COOKIE_NAME}=${trackingId}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  },

  setLeadSourceCookie: (source: string) => {
    document.cookie = `${LEAD_SOURCE_COOKIE_NAME}=${source}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  },

  setUtmCookie: (param: string, value: string) => {
    document.cookie = `${UTM_COOKIE_PREFIX}${param}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  },

  getTrackingCookie: (): string | undefined => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(TRACKING_COOKIE_NAME))
      ?.split('=')[1];
  },

  getLeadSourceCookie: (): string | undefined => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(LEAD_SOURCE_COOKIE_NAME))
      ?.split('=')[1];
  }
}; 