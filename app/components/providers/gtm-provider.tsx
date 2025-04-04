"use client";

import { useTracking } from "@/app/components/providers/tracking-provider";
import { pushLeadEvent } from "@/lib/events/tracking";
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

    pushLeadEvent(
      "tracking_initialized",
      {
        language: pathname.startsWith("/en") ? "en" : "nl",
        page_path: pathname,
        timestamp: trackingData.timestamp,
      },
      trackingData
    );
  }, [trackingData, pathname]);

  return <>{children}</>;
}
