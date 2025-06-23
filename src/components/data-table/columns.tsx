"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export const paymentData: Payment[] = [
  {
    id: "pay_001",
    amount: 1999,
    status: "pending",
    email: "alice@example.com",
  },
  {
    id: "pay_002",
    amount: 4999,
    status: "processing",
    email: "bob@example.com",
  },
  {
    id: "pay_003",
    amount: 1099,
    status: "success",
    email: "charlie@example.com",
  },
  {
    id: "pay_004",
    amount: 299,
    status: "failed",
    email: "dave@example.com",
  },
  {
    id: "pay_005",
    amount: 1500,
    status: "success",
    email: "eve@example.com",
  },
];
