"use client";
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
  const [evmAddress, setEvmAddress] = useState<string>("");
  const [accountId, setAccountId] = useState<string>();
  const [balances, setBalances] = useState<string>("0.00");

  const fetchEvmAddress = useCallback(async () => {
    console.log(session); 
    const res = await fetch("/api/account");
    if (res.ok) {
      const { address } = await res.json();
      console.log(address);
      setEvmAddress(address);

    }
  }, [session]);

  const getAccounts = async () => {
    let response = await cdpClient.evm.listAccounts();
    console.log(response);
  };

  const refreshBalance = useCallback(async () => {
    if (!evmAddress) return;

    const res = await fetch(`/api/account/balance`);
    if (res.ok) {
      const { balance } = await res.json();
      setBalances(String(balance));
    }
  }, [evmAddress]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchEvmAddress();
    }
  }, [status, fetchEvmAddress]);

  useEffect(() => {
    if (evmAddress) {
      refreshBalance();
    }
  }, [evmAddress, refreshBalance]);

  return {
    evmAddress,
    accountId,
    fetchEvmAddress,
    getAccounts,
    refreshBalance,
    balances,
  };
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
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
