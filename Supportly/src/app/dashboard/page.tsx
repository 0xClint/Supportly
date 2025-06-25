"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { ServiceTable } from "@/components/data-table/service-table";
import { columns } from "@/components/data-table/columns";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/context/UserContext";
import { SectionCards } from "@/components/section-cards";

export default function ModeToggle() {
  const { setTheme } = useTheme();
  const { projects } = useUserData();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
        <SectionCards />

        <div className="flex items-center justify-between gap-2">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Running Services
          </h3>
          <Button onClick={() => router.push("/dashboard/create")}>
            <Plus /> Add
          </Button>
        </div>

        <div className="container mx-auto ">
          <ServiceTable columns={columns} data={projects} />
        </div>
      </div>
    </>
  );
}
