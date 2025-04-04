import { TrackingData } from "@/lib/types/tracking";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export interface LeadEventData {
  form_handle?: string;
  tool_name?: string;
  tool_result?: any;
  language: string;
  page_path?: string;
  timestamp?: string;
  transaction_id?: string;
  lead_source?: string;
  utm_params?: any;
  hotjar_user_id?: string;
  gad_source?: string;
  gclid?: string;
  fbclid?: string;
}

export type LeadEventType = "form_submission" | "tool_call" | "tracking_initialized";

export function pushLeadEvent(
  type: LeadEventType,
  data: LeadEventData,
  trackingData?: TrackingData
) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const eventData = {
    event: "lead",
    type,
    ecommerce: {
      ...data,
      transaction_id: trackingData?.trackingId,
      lead_source: trackingData?.leadSource,
      utm_params: trackingData?.utmParams,
      hotjar_user_id: trackingData?.hotjarUserId,
      gad_source: trackingData?.gadSource,
      gclid: trackingData?.gclid,
      fbclid: trackingData?.fbclid,
    },
  };

  window.dataLayer.push(eventData);
}

export function pushFormSubmissionEvent(
  formHandle: string,
  language: string,
  trackingData?: TrackingData
) {
  pushLeadEvent("form_submission", { form_handle: formHandle, language }, trackingData);
}

export function pushToolCallEvent(
  toolName: string,
  toolResult: any,
  language: string,
  trackingData?: TrackingData
) {
  pushLeadEvent(
    "tool_call",
    { tool_name: toolName, tool_result: toolResult, language },
    trackingData
  );
} 