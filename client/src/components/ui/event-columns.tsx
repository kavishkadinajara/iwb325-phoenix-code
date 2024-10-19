"use client";

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
import { Event } from "@/types";
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

export const eventColumns: ColumnDef<Event>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Event ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <span className="flex items-center gap-2">
          <span>{row.original.name}</span>
          {row.original.default && (
            <Badge
              variant="outline"
              className="text-green-500 border-green-500"
            >
              Default
            </Badge>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span>
          {new Date(row.original.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <span>
          {new Date(`1970-01-01T${row.original.time}`).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "tickets_sold",
    header: "Tickets Sold",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const event = row.original;

      let statusColor = "yellow";
      let statusText = "Pending";

      if (event.status === 1) {
        statusColor = "green";
        statusText = "Active";
      } else if (event.status === 2) {
        statusColor = "red";
        statusText = "Rejected";
      } else if (event.status === 3) {
        statusColor = "gray";
        statusText = "Archived";
      }

      return (
        <Badge variant="outline" className={`text-${statusColor}-500 text-end`}>
          {statusText}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://nibmtix.vercel.app/events/${event.slug}`
                )
              }
            >
              Copy Event Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/events/${event.slug}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/events/${event.slug}/edit`}>
              <DropdownMenuItem>Edit Event</DropdownMenuItem>
            </Link>
            {!event.default && (
              <DropdownMenuItem
                onClick={async () => await markEventAsDefault(event.id)}
              >
                Mark as default
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
