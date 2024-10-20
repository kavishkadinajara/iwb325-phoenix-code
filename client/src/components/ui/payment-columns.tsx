"use client";

import { Button } from "@/components/ui/button";
import { PaymentColumns } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

/*
export type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  ticketsSold: number;
  default: boolean;
};
*/

export const paymentColumns: ColumnDef<PaymentColumns>[] = [
  {
    id: "id",
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    id: "name",
    accessorKey: "user_name",
    header: "Name",
  },
  {
    accessorKey: "to_be_paid",
    header: "Amount",
    cell: ({ row }) => {
      const payment = row.original;

      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
      }).format(payment.to_be_paid);
    },
  },
  {
    id: "pay",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Link href={`/admin/payments/${payment.user_id}`}>
          <Button variant="outline">Pay</Button>
        </Link>
      );
    },
  },
];