import { FlowpayLaunchPayload } from "@flowpay-io/shared/types";

/**
 * Copies the saved form URL to clipboard
 * @param payload - The launch payload
 */
export function copySavedFormUrl(payload: FlowpayLaunchPayload): void {
  const savedUrl = new URL(window.location.href);
  const base64formData = btoa(JSON.stringify(payload));
  savedUrl.searchParams.set("payload", base64formData);

  if (payload.partnerCode && payload.partnerCode !== "Sandbox") {
    savedUrl.searchParams.set("partner", payload.partnerCode);
  }

  navigator.clipboard.writeText(savedUrl.toString());
}
