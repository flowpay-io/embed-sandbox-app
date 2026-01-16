import { IsoCountryCode } from "@flowpay-io/shared/types";
import { InputLaunchPayload } from "@flowpay-io/embed-core";

export const DEFAULT_EMBED_URL: string =
  import.meta.env.VITE_DEFAULT_EMBED_URL || "https://my.flowpay.io";

export const DEFAULT_PAYLOAD: InputLaunchPayload = {
  country: IsoCountryCode.CZ,
  email: "user@example.com",
  merchantId: "sandbox-fp1",
  partnerCode: "Sandbox",
  phone: "+420123456789",
  regNum: "09770747",
  userId: "sandbox-user-1",
};
