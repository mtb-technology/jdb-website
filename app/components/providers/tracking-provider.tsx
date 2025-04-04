"use client";

import { TrackingData } from "@/lib/types/tracking";
import { createContext, useContext, useEffect, useState } from "react";

interface TrackingContextType {
  trackingData: TrackingData | undefined;
}

const TrackingContext = createContext<TrackingContextType>({
  trackingData: undefined,
});

function getHotjarUserIdFromCookies() {
  const match = document.cookie.match(/_hjUserId=([^;]+)/);
  return match ? match[1] : null;
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingData | undefined>(
    undefined
  );

  useEffect(() => {
    // Initialize tracking data from URL parameters or other sources
    const params = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string | null> = {
      source: params.get("utm_source"),
      medium: params.get("utm_medium"),
      campaign: params.get("utm_campaign"),
      term: params.get("utm_term"),
      content: params.get("utm_content"),
    };

    const data: TrackingData = {
      trackingId: params.get("tracking_id"),
      leadSource: params.get("lead_source"),
      utmParams,
      hotjarUserId: params.get("hotjar_user_id"),
      gadSource: params.get("gad_source"),
      gclid: params.get("gclid"),
      fbclid: params.get("fbclid"),
      timestamp: new Date().toISOString(),
    };

    setTrackingData(data);
  }, []);

  return (
    <TrackingContext.Provider value={{ trackingData }}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
}
