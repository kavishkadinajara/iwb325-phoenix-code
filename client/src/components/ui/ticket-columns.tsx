"use client";

import { activateTicket, refundTicket } from "@/actions/tickets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCheckIcon, CircleAlert, MoreHorizontal } from "lucide-react";

/*
export type Ticket = {
  id: string;
  name: string;
  email: string;
  attendance: number; // 0 = not-attended, 1 = attended
  arrival: string;
  paymentMethod: 1 | 2; // 1 = Cash, 2 = Card
  status: 0 | 1 | 2 | 3; // 0 = not-paid, 1 = paid, 2 = refunded
};
*/

export const TicketColumns: ColumnDef<Ticket>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Ticket ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => {
      return row.original.payment_method === 1 ? (
        <Badge variant="outline">Cash</Badge>
      ) : row.original.payment_method === 2 ? (
        <Badge variant="outline">Card</Badge>
      ) : (
        <Badge variant="outline">Free</Badge>
      );
    },
    filterFn: (rows, id, filterValue) => {
      return filterValue.includes(rows.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const ticket = row.original;

      //return ticket.status.toString();

      if (ticket.status === 0) {
        return (
          <Badge variant="outline" className="text-red-500">
            Not Paid
          </Badge>
        );
      }

      if (ticket.status === 1) {
        return (
          <Badge variant="outline" className="text-green-500">
            Paid
          </Badge>
        );
      }

      if (ticket.status === 2) {
        return (
          <Badge variant="outline" className="">
            Refunded
          </Badge>
        );
      }

      return (
        <Badge variant="outline" className="text-blue-400">
          Unknown
        </Badge>
      );
    },
    filterFn: (rows, id, filterValue) => {
      return filterValue.includes(rows.getValue(id));
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      return row.original.attendance === 1 ? (
        <span className="text-green-600 flex gap-1">
          arrived
          <CheckCheckIcon className="h-4 w-4 my-auto" />
        </span>
      ) : (
        <span className="text-yellow-600 flex gap-1">
          pending
          <CircleAlert className="h-4 w-4 my-auto" />
        </span>
      );
    },
    filterFn: (rows, id, filterValue) => {
      return filterValue.includes(rows.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(ticket.id)}
            >
              Copy Ticket ID
            </DropdownMenuItem>
            {ticket.status != 1 && (
              <DropdownMenuItem
                onClick={async () => await activateTicket(ticket.id)}
              >
                Activate Ticket
              </DropdownMenuItem>
            )}

            {ticket.status == 1 && (
              <DropdownMenuItem
                onClick={async () => await refundTicket(ticket.id)}
              >
                Refund Ticket
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
