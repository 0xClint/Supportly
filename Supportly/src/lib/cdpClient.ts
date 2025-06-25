import { CdpClient } from "@coinbase/cdp-sdk";

export const cdpClient: CdpClient = new CdpClient({
  apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID,
  apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET,
  walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET,
});
