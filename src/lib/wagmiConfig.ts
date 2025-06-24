import { http, createConfig, injected } from "wagmi";
import { baseSepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
