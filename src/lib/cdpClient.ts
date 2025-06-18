import { CdpClient } from "@coinbase/cdp-sdk";

import { baseSepolia } from "viem/chains";
// import { publicClient } from "@/lib/viem";

export const cdpClient: CdpClient = new CdpClient({
  apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID,
  apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET,
  walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET,
});

// export async function requestFaucetFunds(params: RequestFaucetParams) {
//   const { transactionHash } = await cdpClient.evm.requestFaucet({
//     address: params.address,
//     network: baseSepolia.network,
//     token: params.tokenName,
//   });

//   await publicClient.waitForTransactionReceipt({
//     hash: transactionHash,
//   });
// }
