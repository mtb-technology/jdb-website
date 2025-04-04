# Event Tracking System

## Overview
The event tracking system is built on top of Google Tag Manager (GTM) and provides a structured way to track user interactions and form submissions across the application.

## Core Components

### 1. Tracking Provider
- Located in `app/components/providers/tracking-provider.tsx`
- Manages tracking data state (trackingId, leadSource, UTM params, etc.)
- Provides tracking context to the application

### 2. GTM Provider
- Located in `app/components/providers/gtm-provider.tsx`
- Initializes the dataLayer
- Pushes initial tracking data on page load

### 3. Event Types

#### Lead Events
Lead events track user interactions that indicate potential business opportunities.

##### Form Submission
```typescript
{
  event: "lead",
  type: "form_submission",
  ecommerce: {
    form_handle: string,
    language: string,
    transaction_id: string,
    lead_source: string,
    utm_params: object,
    hotjar_user_id: string,
    gad_source: string,
    gclid: string,
    fbclid: string
  }
}
```

##### Tool Call
```typescript
{
  event: "lead",
  type: "tool_call",
  ecommerce: {
    tool_name: string,
    tool_result: object,
    language: string,
    transaction_id: string,
    lead_source: string,
    utm_params: object,
    hotjar_user_id: string,
    gad_source: string,
    gclid: string,
    fbclid: string
  }
}
```

## Implementation Guidelines

1. **Event Structure**
   - All lead-related events should use the `lead` event type
   - Use the `type` field to distinguish between different lead interactions
   - Include all relevant tracking data in the `ecommerce` object

2. **Data Consistency**
   - Always include the full set of tracking parameters
   - Use consistent naming across all events
   - Maintain the same structure for similar event types

3. **Usage**
   ```typescript
   window.dataLayer.push({
     event: "lead",
     type: "form_submission", // or "tool_call"
     ecommerce: {
       // ... tracking data
     }
   });
   ```

## Best Practices

1. **Data Layer Management**
   - Initialize dataLayer at the application root
   - Push events consistently using the defined structure
   - Include all relevant tracking parameters

2. **Error Handling**
   - Ensure dataLayer exists before pushing events
   - Handle missing tracking data gracefully
   - Log errors for debugging purposes

3. **Performance**
   - Minimize the number of events pushed
   - Keep event payloads concise
   - Use consistent event naming

## Example Usage

```typescript
// Form submission
window.dataLayer.push({
  event: "lead",
  type: "form_submission",
  ecommerce: {
    form_handle: "advisor-request",
    language: "nl",
    transaction_id: trackingData?.trackingId,
    lead_source: trackingData?.leadSource,
    utm_params: trackingData?.utmParams,
    hotjar_user_id: trackingData?.hotjarUserId,
    gad_source: trackingData?.gadSource,
    gclid: trackingData?.gclid,
    fbclid: trackingData?.fbclid
  }
});

// Tool call
window.dataLayer.push({
  event: "lead",
  type: "tool_call",
  ecommerce: {
    tool_name: "submitQuote",
    tool_result: result,
    language: "nl",
    transaction_id: trackingData?.trackingId,
    lead_source: trackingData?.leadSource,
    utm_params: trackingData?.utmParams,
    hotjar_user_id: trackingData?.hotjarUserId,
    gad_source: trackingData?.gadSource,
    gclid: trackingData?.gclid,
    fbclid: trackingData?.fbclid
  }
});
``` 