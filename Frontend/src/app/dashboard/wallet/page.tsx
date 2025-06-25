"use client";
import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";

import { columns } from "@/components/data-table/columns";
import { SectionCards } from "@/components/section-cards";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { TopupWalletDialog } from "@/components/topup-wallet-dialog";
import { DialogDemo } from "@/components/tempDialog";

export default function Wallet() {
  const { getAccounts, balances } = useWallet();

  const fetchAddreses = async () => {
    // await refreshBalance();
  };
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
        <SectionCards />

        <div className="container mx-auto">
          <h3 className="scroll-m-20 text-xl mb-4 font-semibold tracking-tight">
            Transaction History
          </h3>
          {/* <Button onClick={fetchAddreses}>Click</Button> */}
          {/* <DataTable columns={columns} data={paymentData} /> */}
        </div>
      </div>
    </>
  );
}
