import type { FlowpayLaunchPayload } from "@flowpay-io/shared/types";
export interface TenantInput {
  id: string;
  name: string;
}

export interface EmbedFormData extends Omit<FlowpayLaunchPayload, "tenants"> {
  tenants: TenantInput[];
}

export interface EmbedPayloadFormProps {
  onSubmit: (payload: FlowpayLaunchPayload) => void;
  initialValues?: EmbedFormData;
  onCopySavedFormUrl: (payload: FlowpayLaunchPayload) => void;
}
