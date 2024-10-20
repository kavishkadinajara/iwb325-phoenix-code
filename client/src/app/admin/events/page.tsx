import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import Link from "next/link";
  
  import { Button } from "@/components/ui/button";
  import { EventTable } from "@/components/ui/event-table";
  import { Event } from "@/types";
  import { createClient } from "@/utils/supabase/server";
  import AdminMobileNav from "@/components/admin/AdminMobileNav";
  import AdminSheetNav from "@/components/admin/AdminSheetNav";
  import AccountOptions from "@/components/AccountOptions";
  import { adminEventColumns } from "@/components/ui/admin-event-columns";
  
  export default async function EventsPage() {
    const supabase = createClient();
  
    const { data: events, error } = await supabase
      .from("admin_events_view")
      .select();
  
    if (error) {
      console.error("Error fetching events:", error.message);
    }
  
    console.log(events);
  
    return (
      <div>
        <Breadcrumb className="hidden md:flex ml-6 -mt-12 z-40 absolute mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin" prefetch={false}>
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
          </div>
          <EventTable data={events} columns={adminEventColumns} />
        </main>
      </div>
    );
  }