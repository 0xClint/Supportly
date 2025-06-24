"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthProvider";
import { WalletProvider } from "@/context/WalletContext";
import { SessionProvider } from "next-auth/react";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/wagmiConfig";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <AuthProvider>
              <WalletProvider>{children}</WalletProvider>
            </AuthProvider>
          </SessionProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
