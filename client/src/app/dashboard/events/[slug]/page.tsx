import { auth } from "@/auth";
import EventDetails from "@/components/EventDetails";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  
  const session = await auth();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/details?slug=${params.slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );
  const eventData: Event[] = await response.json();

  if (!eventData) {
    return notFound();
  }

  // const { data: participantData, error: participantFetchError } = await supabase
  //   .from("view_tickets_for_a_event")
  //   .select(
  //     "id,name,email,mobile,attendance,arrival,meal_type,refreshments,lunch,status,event_name"
  //   )
  //   .eq("event_slug", params.slug);

  // if (participantFetchError) {
  //   console.error(participantFetchError);
  //   throw new Error("An error occurred while fetching tickets");
  // }

  console.log(eventData);

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
              <Link href="/dashboard/events" prefetch={false}>
                Events
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/events/${params.slug}`} prefetch={false}>
                {params.slug}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full px-7">
        <div className="pb-6 mt-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {eventData[0].name}
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s the details for {params.slug}
          </p>

          <div className="mt-6 flex justify-end">
            <Link href={`/dashboard/events/${params.slug}/edit`}>
              <Button color="primary" size="lg">
                <Pencil2Icon className="h-6 w-6 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        </div>
        <EventDetails event={eventData[0]} />

        {/* <ParticipantDetails data={participantData} /> */}
      </main>
    </div>
  );
}
