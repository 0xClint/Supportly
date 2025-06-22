"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { WalletProvider } from "@/context/WalletContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <SessionProvider>
            <WalletProvider>{children}</WalletProvider>
          </SessionProvider>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
