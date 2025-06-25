"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cdp_sdk_1 = require("@coinbase/cdp-sdk");
const accounts_1 = require("viem/accounts");
const x402_axios_1 = require("x402-axios");
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dynamoDB_1 = require("./libs/dynamoDB");
dotenv_1.default.config();
// Load from env
const { CDP_API_KEY_ID, CDP_API_KEY_SECRET, CDP_WALLET_SECRET, RESOURCE_SERVER_URL, ENDPOINT_PATH, } = process.env;
if (!CDP_API_KEY_ID ||
    !CDP_API_KEY_SECRET ||
    !CDP_WALLET_SECRET ||
    !RESOURCE_SERVER_URL ||
    !ENDPOINT_PATH) {
    console.error("Missing required environment variables");
    process.exit(1);
}
const PORT = process.env.PORT || 4020;
const cdpClient = new cdp_sdk_1.CdpClient({
    apiKeyId: CDP_API_KEY_ID,
    apiKeySecret: CDP_API_KEY_SECRET,
    walletSecret: CDP_WALLET_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.post("/prompt", async (req, res) => {
    const { userId, prompt, projectId, dataUrl } = req.body;
    console.log(userId, prompt, projectId, dataUrl);
    if (!userId || !projectId || !prompt || !dataUrl) {
        res.status(400).json({
            error: "All userId, projectId, prompt and dataUrl are required!",
        });
    }
    try {
        const account = (0, accounts_1.toAccount)(await cdpClient.evm.getOrCreateAccount({
            name: userId,
        }));
        const paidApi = (0, x402_axios_1.withPaymentInterceptor)(axios_1.default.create({
            baseURL: RESOURCE_SERVER_URL,
        }), account);
        const response = await paidApi.post(RESOURCE_SERVER_URL + ENDPOINT_PATH, {
            prompt,
            dataUrl,
        });
        console.log(response.data.reply);
        const paymentResponse = (0, x402_axios_1.decodeXPaymentResponse)(response.headers["x-payment-response"]);
        console.log("[paymentRes]:", paymentResponse);
        if (response.data && response.data.reply)
            await (0, dynamoDB_1.addPromptSessions)(userId, projectId, prompt, response.data.reply, paymentResponse.transaction);
        res.status(200).json({
            success: true,
            reply: response.data?.reply,
            payment: paymentResponse,
        });
    }
    catch (err) {
        console.error("[server error]", err.response?.data || err.message);
        res.status(500).json({ error: err.response?.data || err.message });
    }
});
app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
