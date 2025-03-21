"use client";

import { cookieUtils, parseReferrer, TrackingData } from "@/app/lib/tracking";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface TrackingContextType {
  trackingData: TrackingData | null;
  setLeadSource: (source: string) => void;
}

const TrackingContext = createContext<TrackingContextType>({
  trackingData: null,
  setLeadSource: () => {},
});

function getHotjarUserIdFromCookies() {
  const match = document.cookie.match(/_hjUserId=([^;]+)/);
  return match ? match[1] : null;
}

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  useEffect(() => {
    const initializeTracking = () => {
      try {
        // Get or create tracking ID
        const existingTrackingId = cookieUtils.getTrackingCookie();
        const trackingId = existingTrackingId || uuidv4();

        if (!existingTrackingId) {
          cookieUtils.setTrackingCookie(trackingId);
        }

        // Get or set lead source from referrer
        const existingLeadSource = cookieUtils.getLeadSourceCookie();
        console.log("existingLeadSource", existingLeadSource);
        console.log("document.referrer", document.referrer);
        const leadSource =
          existingLeadSource || parseReferrer(document.referrer);

        if (!existingLeadSource) {
          cookieUtils.setLeadSourceCookie(leadSource);
        }

        // Parse UTM parameters from URL
        const url = new URL(window.location.href);
        const utmParams = Object.fromEntries(
          Array.from(url.searchParams.entries())
            .filter(([key]) => key.startsWith("utm_"))
            .map(([key, value]) => [key.replace("utm_", ""), value])
        );

        // Set UTM cookies if present
        Object.entries(utmParams).forEach(([param, value]) => {
          cookieUtils.setUtmCookie(param, value);
        });

        // Get Hotjar User ID
        const hotjarUserId = getHotjarUserIdFromCookies();

        setTrackingData({
          trackingId,
          leadSource,
          utmParams,
          hotjarUserId,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Failed to initialize tracking:", error);
        // Ensure we still set some tracking data even if something fails
        setTrackingData({
          trackingId: uuidv4(),
          leadSource: "unknown",
          utmParams: {},
          hotjarUserId: null,
          timestamp: Date.now(),
        });
      }
    };

    initializeTracking();
  }, []);

  const setLeadSource = (source: string) => {
    cookieUtils.setLeadSourceCookie(source);
    setTrackingData((prev) => (prev ? { ...prev, leadSource: source } : null));
  };

  return (
    <TrackingContext.Provider value={{ trackingData, setLeadSource }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error("useTracking must be used within a TrackingProvider");
  }
  return context;
};
