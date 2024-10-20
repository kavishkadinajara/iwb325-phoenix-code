"use client";

import { changeEventStatus } from "@/actions/Admin";
import { markEventAsDefault } from "@/actions/events";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event, PaymentColumns } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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