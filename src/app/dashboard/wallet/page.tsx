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
import { DataTable } from "@/components/data-table/data-table";
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
      <header className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 px-4">
          <TopupWalletDialog />
        </div>
      </header>
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
