import { cdpClient } from "@/lib/cdpClient";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProviderFn = () => {
  const { status, data: session } = useSession();
  const [evmAddress, setEvmAddress] = useState<string>();
  const [accountId, setAccountId] = useState<string>();
  //   const [balances, setBalances] = useState<Partial<Record<TokenKey, string>>>(
  //     {}
  //   );

  const fetchEvmAddress = async () => {
    const res = await fetch("/api/account");
    if (res.ok) {
      const { address } = await res.json();
      console.log(address);
      setEvmAddress(address);
      // setAccountId(accountId);
    }
  };

  //   const refreshBalance = useCallback(
  //     async (token: TokenKey = activeToken) => {
  //       if (!evmAddress) return;

  //       const query = token !== "eth" ? `?token=${token}` : "";
  //       const res = await fetch(`/api/account/balance${query}`);
  //       if (res.ok) {
  //         const { balance } = await res.json();
  //         setBalances((prev) => ({ ...prev, [token]: balance }));
  //       }
  //     },
  //     [evmAddress, activeToken]
  //   );

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvmAddress();
    }
  }, [status]);

  //   useEffect(() => {
  //     if (evmAddress) {
  //       refreshBalance("eth");
  //     }
  //   }, [evmAddress, refreshBalance]);
  return { evmAddress, accountId, fetchEvmAddress };
};

type WalletContextProps = ReturnType<typeof WalletProviderFn>;

const WalletContext = createContext<WalletContextProps | null>(null);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WalletContext.Provider value={WalletProviderFn()}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useAVSBuider must be used within a AVSProvider");
  }
  return context;
};
