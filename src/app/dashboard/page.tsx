"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { AppSidebar } from "@/components/app-sidebar";
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

import { CreateServiceDialog } from "@/components/add-service-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/context/UserContext";
import { TopupWalletDialog } from "@/components/topup-wallet-dialog";

export default function ModeToggle() {
  const { setTheme } = useTheme();
  const { projects } = useUserData();
  const router = useRouter();

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
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 px-4">
          <TopupWalletDialog />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>

        <div className="flex items-end justify-end gap-2">
          {/* <CreateServiceDialog /> */}
          <Button onClick={() => router.push("/dashboard/create")}>
            <Plus /> Add
          </Button>
        </div>

        <div className="container mx-auto ">
          <DataTable columns={columns} data={projects} />
        </div>
      </div>
    </>
  );
}
