import express from "express";
import cors from "cors";
import { generateSignature } from "@flowpay-io/embed-auth/server";

const PORT = process.env.SERVER_PORT || 3003;
const ENDPOINT_URL = "/api/sign-payload";

// Validate required environment variables before starting the server
const PARTNER_SHARED_SECRET = process.env.PARTNER_SHARED_SECRET;

if (!PARTNER_SHARED_SECRET || PARTNER_SHARED_SECRET.trim() === "") {
  console.error(
    "ERROR: PARTNER_SHARED_SECRET environment variable is required but not set."
  );
  console.error(
    "Please set PARTNER_SHARED_SECRET in your .env file or environment variables."
  );
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

/**
 * POST /api/sign-payload
 * Signs a canonical payload using HMAC-SHA256
 *
 * Request body:
 * {
 *   payload: string (base64url-encoded canonical payload string)
 * }
 *
 * Response:
 * {
 *   signature: string (base64url-encoded signature)
 * }
 */
app.post(ENDPOINT_URL, async (req, res) => {
  try {
    const { payload: canonicalPayload } = req.body;

    if (!canonicalPayload || typeof canonicalPayload !== "string") {
      return res.status(400).json({
        error:
          "Invalid request: 'payload' field is required and must be a string",
      });
    }

    const signature = await generateSignature(
      canonicalPayload,
      async () => PARTNER_SHARED_SECRET!
    );

    // debug - log the payload and signature
    console.debug("Payload received:", canonicalPayload);
    console.debug("Signature generated:", signature);

    return res.json({ signature });
  } catch (error) {
    console.error("Error signing payload:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "flowpay-auth-signing-server" });
});

app.listen(PORT, () => {
  console.log(`Auth signing server running on http://localhost:${PORT}`);
  console.log(`Endpoint: POST http://localhost:${PORT}${ENDPOINT_URL}`);
  console.log(`PARTNER_SHARED_SECRET: configured`);
});
