"use client";
import { columns } from "@/components/data-table/columns";
import { ServiceTable } from "@/components/data-table/service-table";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/context/UserContext";
import { Plus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function BotServices() {
  const { projects } = useUserData();
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 px-20 pt-0">
      <div className="flex items-center justify-between gap-2 mt-5">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Running Services
        </h3>
        <Button onClick={() => router.push("/dashboard/create")}>
          <Plus /> Create New
        </Button>
      </div>
      <div className="container mx-auto ">
        <ServiceTable columns={columns} data={projects} />
      </div>
    </div>
  );
}
