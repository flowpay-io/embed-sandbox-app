import type {
  InputLaunchPayload,
  InputMerchantLaunchPayload,
} from "@flowpay-io/embed-core";

export interface TenantInput {
  id: string;
  name: string;
}

export interface EmbedFormData extends Omit<
  InputMerchantLaunchPayload,
  "tenants"
> {
  tenants: TenantInput[];
}

export interface EmbedPayloadFormProps {
  onSubmit: (payload: InputLaunchPayload) => void;
  initialValues?: EmbedFormData;
  onCopySavedFormUrl: (payload: InputLaunchPayload) => void;
}
