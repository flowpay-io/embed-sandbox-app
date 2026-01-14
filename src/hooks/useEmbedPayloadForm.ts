import { useCallback, useMemo, useState } from "react";
import { type FlowpayLaunchPayload } from "@flowpay-io/shared/types";
import { type EmbedFormData } from "../types/EmbedPayloadForm.types";
import { DEFAULT_PAYLOAD } from "../const";
import { copySavedFormUrl } from "../utils/url-helpers";
import { useToast } from "./useToast";

export interface IUseEmbedPayloadFormReturn {
  initialFormValues: EmbedFormData;
  launchPayload: FlowpayLaunchPayload;
  handleCopySavedFormUrl: (payload: FlowpayLaunchPayload) => void;
  handleSetData: (payload: FlowpayLaunchPayload) => void;
}

export function useEmbedPayloadForm(): IUseEmbedPayloadFormReturn {
  const { showToast } = useToast();
  const [launchPayload, setLaunchPayload] =
    useState<FlowpayLaunchPayload>(DEFAULT_PAYLOAD);

  const initialFormData = useMemo(() => {
    const params = new URLSearchParams(window.location.search);

    const partnerCode = params.get("partner") || "Sandbox";
    const urlPayloadParam = params.get("payload");

    let formValues: EmbedFormData = {
      ...DEFAULT_PAYLOAD,
      partnerCode,
      tenants: [],
    };

    if (urlPayloadParam) {
      try {
        const savedFormData = JSON.parse(atob(urlPayloadParam));
        formValues = {
          ...formValues,
          ...savedFormData,
        };
      } catch (error) {
        console.warn("Failed to parse payload from URL:", error);
      }
    }

    return { formValues };
  }, []);

  const { formValues: initialFormValues } = initialFormData;

  const handleSetData = useCallback(
    (payload: FlowpayLaunchPayload) => {
      setLaunchPayload(payload);
    },
    [setLaunchPayload]
  );

  const handleCopySavedFormUrl = useCallback(
    (payload: FlowpayLaunchPayload) => {
      try {
        copySavedFormUrl(payload);
        showToast("Form URL copied to clipboard", "success");
      } catch (error) {
        console.error("Failed to copy saved form URL:", error);
        showToast("Failed to copy form URL to clipboard", "error");
      }
    },
    [showToast]
  );

  return {
    initialFormValues,
    launchPayload,
    handleCopySavedFormUrl,
    handleSetData,
  };
}
