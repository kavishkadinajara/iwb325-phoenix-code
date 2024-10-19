"use client";

import {
  toggleAttendance,
  toggleLunch,
  toggleRefreshments,
} from "@/actions/tickets";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCheckIcon,
  CircleAlert,
  CircleCheckBig,
  ClockIcon,
  MoreHorizontal
} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Participant = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  meal_type: number;
  refreshments: number;
  lunch: number;
  attendance: number;
  arrival: string;
};

export const participantColumns: ColumnDef<Participant>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "Participant ID",
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
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "meal_type",
    header: "Meal Type",
    cell: ({ row }) => {
      //row.original.meal_type 1 - NON VEG, 2 - VEG 3 - FISH
      return row.original.meal_type === 3 ? (
        <span>Fish</span>
      ) : row.original.meal_type === 2 ? (
        <span>Veg</span>
      ) : row.original.meal_type === 1 ? (
        <span>Non-Veg</span>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "refreshments",
    header: "Refreshments",
    cell: ({ row }) => {
      //row.original.lunch
      return row.original.refreshments === 1 ? (
        <span className="text-green-600 flex gap-1">
          collected
          <CircleCheckBig className="h-4 w-4 my-auto" />
        </span>
      ) : (
        <span className="text-yellow-600 flex gap-1">
          pending
          <CircleAlert className="h-4 w-4 my-auto" />
        </span>
      );
    },
  },
  {
    accessorKey: "lunch",
    header: "Lunch",
    cell: ({ row }) => {
      //row.original.lunch
      return row.original.lunch === 1 ? (
        <span className="text-green-600 flex gap-1">
          collected
          <CircleCheckBig className="h-4 w-4 my-auto" />
        </span>
      ) : (
        <span className="text-yellow-600 flex gap-1">
          pending
          <CircleAlert className="h-4 w-4 my-auto" />
        </span>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      //row.original.lunch
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
  },
  {
    accessorKey: "arrival",
    header: "Arrival",
    cell: ({ row }) => {
      //row.original.lunch
      return row.original.attendance === 1 ? (
        <span className="text-green-600 flex gap-1">
          {new Date(row.original.arrival).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          <ClockIcon className="h-4 w-4 my-auto" />
        </span>
      ) : (
        <span className="text-yellow-600 flex gap-1">-</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const participant = row.original;

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
              onClick={() => navigator.clipboard.writeText(participant.id)}
            >
              Copy participant ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () =>
                await toggleAttendance(participant.id, participant.attendance)
              }
            >
              Mark as {participant.attendance === 1 ? "pending" : "arrived"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () =>
                await toggleRefreshments(
                  participant.id,
                  participant.refreshments
                )
              }
            >
              Mark as refr...{" "}
              {participant.refreshments === 1 ? "pending" : "collected"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () =>
                await toggleLunch(participant.id, participant.lunch)
              }
            >
              Mark as lunch {participant.lunch === 1 ? "pending" : "collected"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
