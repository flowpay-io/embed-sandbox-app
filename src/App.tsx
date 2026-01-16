import { FlowpayModal, useFlowpayEmbed } from "@flowpay-io/embed-react";
import {
  createSignedLogin,
  createRemoteSigner,
} from "@flowpay-io/embed-auth/client";
import { EmbedPayloadForm } from "./components/EmbedPayloadForm";
import { Layout } from "./components/Layout";
import { OverlayLoader } from "./components/OverlayLoader";
import { useEmbedPayloadForm } from "./hooks/useEmbedPayloadForm";
import "@flowpay-io/embed-react/assets/modal.css";
import { useToast } from "./hooks/useToast";

import "./style.css";
import { DEFAULT_EMBED_URL } from "./const";

const SIGNING_ENDPOINT_URL =
  import.meta.env.VITE_SIGNING_ENDPOINT_URL ||
  "http://localhost:3003/api/sign-payload";

function App() {
  const { showToast } = useToast();

  /**
   * Related only to Sandbox Financing example form
   */
  const {
    initialFormValues,
    launchPayload,
    handleCopySavedFormUrl,
    handleSetData,
  } = useEmbedPayloadForm();

  /**
   * Flowpay embed client initialization
   */
  const flowpay = useFlowpayEmbed({
    embedOrigin: DEFAULT_EMBED_URL,
    getLaunchPayload: () => launchPayload,
    logger: {
      debug: (...args) => console.debug("[Embed Client]", ...args),
      warn: (...args) => console.warn("[Embed Client]", ...args),
      error: (...args) => console.error("[Embed Client]", ...args),
    },
    signatureProvider: {
      signPayload: async (payload) =>
        await createSignedLogin(
          payload,
          createRemoteSigner(SIGNING_ENDPOINT_URL)
        ),
    },
  });

  return (
    <>
      <Layout>
        <EmbedPayloadForm
          initialValues={initialFormValues}
          onSubmit={(payload) => {
            handleSetData(payload);
            flowpay.open();
          }}
          onCopySavedFormUrl={handleCopySavedFormUrl}
        />
      </Layout>

      <OverlayLoader isLoading={flowpay.isLoading} />

      <FlowpayModal
        client={flowpay.client}
        {...flowpay.modalProps}
        title="Sandbox Financing"
        simulationToolbar
        closeTooltip="Logout and close"
        showReloadButton
        onError={console.error}
        onLoadFailed={(error) => {
          console.error(error);
          showToast("Failed to load Sandbox Financing", "error");
          flowpay.close();
        }}
        visible={flowpay.isActive}
      />
    </>
  );
}

export default App;
