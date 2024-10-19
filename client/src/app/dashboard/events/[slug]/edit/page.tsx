/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import clearCachesByServerAction from "@/lib/revalidate";
import { Event } from "@/types";
// import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const EventDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  availableTickets: z.number().min(1, "At least one ticket must be available"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase alphabets, numbers and hyphens"
    ),
  mealProvided: z.boolean(),
  ticketPrice: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
});

export default function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [eventData, setEventData] = useState<Event | null>(null);

  const form = useForm({
    resolver: zodResolver(EventDetailsSchema),
    defaultValues: {
      name: eventData?.name || "", // Field for event name
      date: eventData?.date || "", // Field for event date
      time: eventData?.time || "", // Field for event time
      location: eventData?.location || "", // Field for event location
      availableTickets: eventData?.available_tickets || 0, // Field for available tickets
      slug: eventData?.slug || "", // Field for event slug
      mealProvided: eventData?.meal_provides || false, // Field for meal provided (boolean)
      ticketPrice: eventData?.ticket_price || 0, // Field for ticket price
      description: eventData?.description || "", // Field for event description
      image: undefined, // Field for event image (can be URL or file)
    },
  });

//   useEffect(() => {
//     const fetchData = async () => {
//       const supabase = createClient();
//       const { data: eventData, error } = await supabase
//         .from("events_view")
//         .select()
//         .eq("slug", params.slug)
//         .single()
//         .returns<Event[]>();

//       if (error && error.code === "PGRST116") {
//         router.push("/dashboard/events");
//       }

//       if (error) {
//         console.error(error.message);
//         return <div>ERROR</div>;
//       }

//       console.log(eventData);
//       setEventData(eventData);

//       form.reset({
//         name: eventData?.name || "", // Field for event name
//         date: eventData?.date || "", // Field for event date
//         time: eventData?.time || "", // Field for event time
//         location: eventData?.location || "", // Field for event location
//         availableTickets: eventData?.available_tickets || 0, // Field for available tickets
//         slug: eventData?.slug || "", // Field for event slug
//         mealProvided: eventData?.meal_provided || false, // Field for meal provided (boolean)
//         ticketPrice: eventData?.ticket_price || 0, // Field for ticket price
//         description: eventData?.description || "", // Field for event description
//         image: undefined, // Field for event image (can be URL or file)
//       });

//       setSlug(eventData?.slug || "");
//     };

//     fetchData();
//   }, [form, params.slug]);

  const [slug, setSlug] = useState("");
  const [isSlugAvailable, setIsSlugAvailable] = useState(false);
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string>("");

  const [isUploading, setIsUploading] = useState(false);

  const debouncedSlug = useDebounce({ value: slug, delay: 2000 });

//   const checkSlugAvailability = useCallback(
//     async (slug: string) => {
//       setIsSlugChecking(true);
//       if (slug) {
//         // const isAvailable: boolean = !slug.includes("taken");
//         // setIsSlugAvailable(isAvailable);

//         if (slug === eventData?.slug) {
//           setIsSlugAvailable(true);
//           setIsSlugChecking(false);
//           return;
//         }

//         try {
//           const supabase = createClient();
//           // Query Supabase to check if the slug already exists
//           const { data, error } = await supabase
//             .from("events")
//             .select("slug")
//             .eq("slug", slug)
//             .single();

//           if (error && error.code !== "PGRST116") {
//             // Ignore the "no rows" error
//             console.error("Error checking slug availability:", error.message);
//             setIsSlugAvailable(false);
//           } else {
//             const isAvailable = data === null; // If no data is returned, slug is available
//             setIsSlugAvailable(isAvailable);
//           }
//         } catch (err) {
//           console.error("Unexpected error:", err);
//           setIsSlugAvailable(false);
//         }
//       }
//       setIsSlugChecking(false);
//     },
//     [eventData?.slug]
//   );

//   useEffect(() => {
//     checkSlugAvailability(debouncedSlug);
//   }, [debouncedSlug, checkSlugAvailability]);

//   function generateSlug(name: string) {
//     //add the current year too with a hypen
//     const slug =
//       name
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9-]/g, "") +
//       "-" +
//       new Date().getFullYear();
//     setSlug(slug);
//     form.setValue("slug", slug);
//   }

//   const handleSlugChange = (e: any) => {
//     const newSlug = e.target.value
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//     setSlug(newSlug);
//     setIsSlugChecking(true);
//   };

async function onsubmit() {


}

//   async function onSubmit(values: z.infer<typeof EventDetailsSchema>) {
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//     setIsUploading(true);

//     const supabase = createClient();

//     const session = await supabase.auth.getSession();

//     const userId = session.data.session?.user.id;

//     let imageURL = eventData?.image;

//     if (values.image) {
//       // Extract the file extension from the file name
//       const fileExtension = values.image.name.split(".").pop();

//       // Construct the upload path with the file extension
//       const uploadPath = `${userId}/${values.slug}.${fileExtension}`;

//       const { data: imageData, error: imageError } = await supabase.storage
//         .from("events")
//         .upload(uploadPath, values.image, {
//           upsert: true,
//         });

//       if (imageError) {
//         // Show error toast
//         toast({
//           title: "Error",
//           description: "Failed to upload image",
//           type: "foreground",
//         });
//         setIsUploading(false);

//         return;
//       }

//       imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageData.fullPath}`;
//     }

//     //Adding the Event

//     const newEvent = {
//       name: values.name,
//       date: values.date,
//       time: values.time,
//       location: values.location,
//       available_tickets: values.availableTickets,
//       ticket_price: values.ticketPrice,
//       slug: values.slug,
//       image: imageURL,
//       meal_provides: values.mealProvided,
//       description: values.description,
//       default: false,
//     };

//     const { data: createdEvent, error: insertError } = await supabase
//       .from("events")
//       .update([newEvent])
//       .eq("slug", params.slug)
//       .select();

//     if (insertError) {
//       console.error("Error adding event:", insertError.message);
//       // Show error toast
//       toast({
//         title: "Error",
//         description: "Failed to create event",
//         type: "foreground",
//       });
//     }

//     setIsUploading(false);

//     // Show success toast
//     toast({
//       title: "Event Updated",
//       description: "Event has been updated successfully",
//       type: "foreground",
//     });

//     clearCachesByServerAction(`/dashboard/events/${values.slug}`);
//     router.push("/dashboard/events");
//   }

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

    function generateSlug(value: string) {
        throw new Error("Function not implemented.");
    }

    function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
        throw new Error("Function not implemented.");
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>edit</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full px-7">
        <div className="pb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Edit Event: {params.slug}
          </h2>
          <p className="text-muted-foreground">
            Fill in the details to update the event
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Swara Mansala '24"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          generateSlug(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} min={getTodayDate()} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="NIBM Galle Campus" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="availableTickets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Tickets</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Total tickets available for the event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="event-slug"
                          {...field}
                          value={slug}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            handleSlugChange(e);
                          }}
                        />
                      </FormControl>
                      <FormDescription className="flex flex-col gap-1">
                        A unique slug for the event. Slug can only contain
                        lowercase alphabets, numbers and hyphens
                      </FormDescription>
                      <div>
                        {slug &&
                          (isSlugChecking ? (
                            <Badge
                              variant="outline"
                              className="text-yellow-500 border-yellow-500"
                            >
                              Checking...
                            </Badge>
                          ) : isSlugAvailable ? (
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-500"
                            >
                              Available
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-red-500 border-red-500"
                            >
                              Taken
                            </Badge>
                          ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="ticketPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Price per ticket. Set to 0 if free
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="A brief description about the event"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Image</FormLabel>
                      <FormControl>
                        <Input
                          id="image"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          value={fileInputValue}
                          onChange={(e) => {
                            const file = e.target?.files?.[0];
                            if (file) {
                              if (file.size > MAX_FILE_SIZE) {
                                alert("File size exceeds the 5MB limit.");
                                setEventImage(null);
                                setFileInputValue("");
                              } else {
                                field.onChange(file);
                                setEventImage(file);
                                setFileInputValue(e.target.value);
                              }
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {eventImage && (
                  <div className="flex items-center gap-4 pt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(eventImage)}
                      alt="Event Image"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEventImage(null);
                        setFileInputValue("");
                        form.setValue("image", undefined);
                      }}
                    >
                      Remove Image
                    </Button>
                  </div>
                )}

                {eventData?.image && !eventImage && (
                  <div className="flex items-center gap-4 pt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={eventData.image}
                      alt="Event Image"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="mealProvided"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 z-40">
                      <FormLabel className="my-auto flex items-center gap-2">
                        <FormControl className="my-auto">
                          <Checkbox
                            className="my-auto"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        Meals Provided
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                type="submit"
                className="w-fit sm:w-auto"
                disabled={isUploading || !isSlugAvailable}
              >
                {isUploading ? "Updating..." : "Update Event"}
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
}