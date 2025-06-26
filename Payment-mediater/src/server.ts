import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { CdpClient } from "@coinbase/cdp-sdk";
import { toAccount } from "viem/accounts";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";

import axios from "axios";
import cors from "cors";
import { TABLE_NAME } from "./libs/dbClient";
import { addPromptSessions } from "./libs/dynamoDB";

dotenv.config();

// Load from env
const {
  CDP_API_KEY_ID,
  CDP_API_KEY_SECRET,
  CDP_WALLET_SECRET,
  RESOURCE_SERVER_URL,
  ENDPOINT_PATH,
} = process.env;

if (
  !CDP_API_KEY_ID ||
  !CDP_API_KEY_SECRET ||
  !CDP_WALLET_SECRET ||
  !RESOURCE_SERVER_URL ||
  !ENDPOINT_PATH
) {
  console.error("Missing required environment variables");
  process.exit(1);
}
const PORT = process.env.PORT || 4020;
const cdpClient = new CdpClient({
  apiKeyId: CDP_API_KEY_ID,
  apiKeySecret: CDP_API_KEY_SECRET,
  walletSecret: CDP_WALLET_SECRET,
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/prompt", async (req: Request, res: Response) => {
  const { userId, prompt, projectId, dataUrl } = req.body;
  console.log(userId, prompt, projectId, dataUrl);

  if (!userId || !projectId || !prompt || !dataUrl) {
    res.status(400).json({
      error: "All userId, projectId, prompt and dataUrl are required!",
    });
  }

  try {
    const account = toAccount(
      await cdpClient.evm.getOrCreateAccount({
        name: userId,
      })
    );

    const paidApi = withPaymentInterceptor(
      axios.create({
        baseURL: RESOURCE_SERVER_URL,
      }),
      account
    );
    const response = await paidApi.post(RESOURCE_SERVER_URL + ENDPOINT_PATH, {
      prompt,
      dataUrl,
    });
    console.log(response.data.reply);
    const paymentResponse = decodeXPaymentResponse(
      response.headers["x-payment-response"]
    );
    console.log("[paymentRes]:", paymentResponse);

    if (response.data && response.data.reply)
      await addPromptSessions(
        userId,
        projectId,
        prompt,
        response.data.reply,
        paymentResponse.transaction
      );

    res.status(200).json({
      success: true,
      reply: response.data?.reply,
      payment: paymentResponse,
    });
  } catch (err: any) {
    console.error("[server error]", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// GET /test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).json({ message: "✅ Server is running fine!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
