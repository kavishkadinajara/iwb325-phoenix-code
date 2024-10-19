import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { eventColumns } from "@/components/ui/event-columns";
import { EventTable } from "@/components/ui/event-table";
import { Event } from "@/types";
import { auth } from "@/auth";

export default async function EventsPage() {
  const session = await auth();
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
  const events: Event[] = await response.json();

  console.log(events);

  return (
    <div>
      <Breadcrumb className="hidden md:flex ml-6 -mt-12 z-40 absolute mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" prefetch={false}>
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#" prefetch={false}>
                Events
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
        <div className="pb-6">
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">Here&apos;s the events list</p>
          <div className="mt-6 flex justify-end">
            <Link href="/dashboard/events/new">
              <Button color="primary" size="lg">
                Create Event
              </Button>
            </Link>
          </div>
        </div>
        <EventTable data={events} columns={eventColumns} />
      </main>
    </div>
  );
}
