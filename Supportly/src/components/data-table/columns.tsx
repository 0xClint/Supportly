"use client";

import { Project } from "@/lib/db/db.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CardSim, CodeXml, SquareArrowOutUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <Button variant="link">{row.original.name}</Button>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <Button variant="ghost">{row.original.model}</Button>,
  },
  {
    accessorKey: "data_url",
    header: "Data file",
    cell: ({ row }) => (
      <Link href={`#`}>
        <Button variant="ghost">
          <CardSim /> File
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "embedded_url",
    header: "Link",
    cell: ({ row }) => (
      <Link href={`#`}>
        <Button
          variant="ghost"
          onClick={async () =>
            await navigator.clipboard.writeText(row.original.embedded_url)
          }
        >
          <CodeXml />
          Embed
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Avatar className="rounded-lg w-10 h-10">
          <AvatarImage src={row.original.logo_url} />
          <AvatarFallback>{getInitials(row.original.name)}</AvatarFallback>
        </Avatar>
      </div>
    ),

    // <Button variant="link">{row.original.logo_url}</Button>,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => (
      <Link href={`/dashboard/services/${row.original.id}`}>
        <Button variant="link" className="w-4">
          Link
          <SquareArrowOutUpRightIcon />
        </Button>
      </Link>
    ),
  },
];
