"use client";

import { Project } from "@/lib/db/db.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CardSim, CodeXml } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },
// ];
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
        <Button variant="ghost">
          <CodeXml />
          Embed
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "logo_url",
    header: "Logo",
    cell: ({ row }) => <Button variant="link">{row.original.logo_url}</Button>,
  },
];

// export const paymentData: Project[] = [
//   {
//     id: "pay_001",
//     amount: 1999,
//     status: "pending",
//     email: "alice@example.com",
//   },
//   {
//     id: "pay_002",
//     amount: 4999,
//     status: "processing",
//     email: "bob@example.com",
//   },
//   {
//     id: "pay_003",
//     amount: 1099,
//     status: "success",
//     email: "charlie@example.com",
//   },
//   {
//     id: "pay_004",
//     amount: 299,
//     status: "failed",
//     email: "dave@example.com",
//   },
//   {
//     id: "pay_005",
//     amount: 1500,
//     status: "success",
//     email: "eve@example.com",
//   },
// ];
