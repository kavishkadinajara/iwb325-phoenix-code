import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { EventListCmb } from "./EventListCmb";
import { auth } from "@/auth";
import { Event } from "@/types";

async function AccountOptions() {
  const session = await auth();
  const user = {
    full_name: session?.user.name,
    avatar_url: session?.user.image,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/userowned`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  const eventData: Event[] = await response.json();

  return (
    <div className="ml-auto flex items-center gap-10">
      <EventListCmb eventList={eventData} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user.avatar_url ?? undefined} alt="User profile picture" />
            <AvatarFallback>
              {(user.full_name ?? "User")
                .split(" ")
                .map((name: string) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/dashboard/settings" prefetch={false}>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </Link>
          <Link href="/support" prefetch={false}>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <form action="">
            <DropdownMenuItem>
              <button>Logout</button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AccountOptions;
