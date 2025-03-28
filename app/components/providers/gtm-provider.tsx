"use client";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function GTMProvider({ children }: { children: React.ReactNode }) {
  const { trackingData } = useTracking();
  const pathname = usePathname();

  useEffect(() => {
    if (!trackingData) return;
    console.log("trackingData", trackingData);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Push initial tracking data
    window.dataLayer.push({
      event: "tracking_initialized",
      transaction_id: trackingData.trackingId,
      lead_source: trackingData.leadSource,
      utm_params: trackingData.utmParams,
      hotjar_user_id: trackingData.hotjarUserId,
      gad_source: trackingData.gadSource,
      gclid: trackingData.gclid,
      fbclid: trackingData.fbclid,
      page_path: pathname,
      timestamp: trackingData.timestamp,
    });
  }, [trackingData, pathname]);

  return <>{children}</>;
}
