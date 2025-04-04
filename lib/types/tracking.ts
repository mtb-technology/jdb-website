export interface UTMParams {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
}

export interface TrackingData {
  trackingId?: string | null;
  leadSource?: string | null;
  utmParams?: Record<string, string | null>;
  hotjarUserId?: string | null;
  gadSource?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  timestamp?: string;
} 