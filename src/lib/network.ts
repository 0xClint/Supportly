import { NetworkConfig } from "@/app/types/network";
import { base, baseSepolia } from "viem/chains";

export const getNetworkConfig = (): NetworkConfig => {
  return baseSepoliaNetworkConfig;
};

const baseSepoliaNetworkConfig: NetworkConfig = {
  chain: baseSepolia,
  network: "base-sepolia",
  explorerUrl: "https://sepolia.basescan.org",
  rpcUrl: "https://sepolia.base.org",
};

const baseNetworkConfig: NetworkConfig = {
  chain: base,
  network: "base",
  explorerUrl: "https://basescan.org",
};
