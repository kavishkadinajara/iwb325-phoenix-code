import EventDetails from "@/components/EventDetails";
import ParticipantDetails from "@/components/ParticipantDetails";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Event } from "@/types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: eventData, error } = await supabase
    .from("admin_events_view")
    .select()
    .eq("slug", params.slug)
    .single()
    .returns<Event[]>();

  if (error && error.code == "PGRST116") {
    notFound();
  }

  if (error) {
    console.error(error.message);
    return <div>ERROR</div>;
  }

  const { data: participantData, error: participantFetchError } = await supabase
    .from("view_tickets_for_a_event")
    .select(
      "id,name,email,mobile,attendance,arrival,meal_type,refreshments,lunch,status,event_name"
    )
    .eq("event_slug", params.slug);

  if (participantFetchError) {
    console.error(participantFetchError);
    throw new Error("An error occurred while fetching tickets");
  }

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
              <Link href="/admin/events" prefetch={false}>
                Events
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/admin/events/${params.slug}`} prefetch={false}>
                {params.slug}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full px-7">
        <div className="pb-6 mt-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {eventData.name}
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s the details for {params.slug}
          </p>
        </div>
        <EventDetails event={eventData} />

        <ParticipantDetails data={participantData} />
      </main>
    </div>
  );
}