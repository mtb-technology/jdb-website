import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const TRACKING_COOKIE_NAME = 'jdb_tracking_id';
const LEAD_SOURCE_COOKIE_NAME = 'jdb_lead_source';
const UTM_COOKIE_PREFIX = 'jdb_utm_';

export async function getTrackingId(): Promise<string> {
  const cookieStore = await cookies();
  let trackingId = cookieStore.get(TRACKING_COOKIE_NAME)?.value;

  if (!trackingId) {
    trackingId = uuidv4();
  }

  return trackingId;
}

export async function getLeadSource(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(LEAD_SOURCE_COOKIE_NAME)?.value || null;
}

export async function getUtmParams(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const utmParams: Record<string, string> = {};
  
  cookieStore.getAll().forEach((cookie: { name: string; value: string }) => {
    if (cookie.name.startsWith(UTM_COOKIE_PREFIX)) {
      const param = cookie.name.replace(UTM_COOKIE_PREFIX, '');
      utmParams[param] = cookie.value;
    }
  });

  return utmParams;
} 