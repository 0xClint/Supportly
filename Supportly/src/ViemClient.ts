import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

export const viemClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});
