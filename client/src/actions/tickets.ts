"use server";
import TicketConfirmation from "@/emails/TicketConfirmation";
import { Event } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient();
export const toggleAttendance = async (id: string, attendance: number) => {
  attendance = attendance === 1 ? 0 : 1;

  let arrival = null;
  if (attendance === 1) {
    arrival = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("tickets")
    .update({ attendance: attendance, arrival: arrival })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("An error occurred while updating attendance");
  }

  console.log(data);

  revalidatePath("/dashboard/tickets");
};

export const toggleRefreshments = async (id: string, refreshments: number) => {
  console.log("toggleRefreshments", id);

  refreshments = refreshments === 1 ? 0 : 1;

  const { data, error } = await supabase
    .from("tickets")
    .update({ refreshments: refreshments })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("An error occurred while updating refreshments");
  }

  revalidatePath("/dashboard/tickets");
};

export const toggleLunch = async (id: string, lunch: number) => {
  lunch = lunch === 1 ? 0 : 1;

  const { data, error } = await supabase
    .from("tickets")
    .update({ lunch: lunch })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("An error occurred while updating lunch");
  }

  revalidatePath("/dashboard/tickets");
};

export const activateTicket = async (id: string) => {
  const { data: ticketData, error } = await supabase
    .from("tickets")
    .update({ status: 1 })
    .eq("id", id)
    .select()
    .single();

  const { data: eventData, error: fetchError } = await supabase
    .from("events_anon_view")
    .select()
    .eq("id", ticketData.event_id)
    .single()
    .returns<Event[]>();

  if (fetchError && fetchError.code == "PGRST116") {
    throw new Error("Event not found");
  }

  if (fetchError) {
    console.error(fetchError);
    throw new Error("An error occurred while fetching event data");
  }

  const emailDetails = {
    username: ticketData.name,
    event: eventData.name,
    eventImage: eventData.image,
    date: new Date(eventData.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: new Date(`1970-01-01T${eventData.time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    location: eventData.location,
    ticketId: id,
    ticketUrl: `https://eventure.vercel.app/tickets/${id}`,
  };

  const { data, error: emailError } = await resend.emails.send({
    from: "NIBMTix <eventure@notifibm.com>",
    to: [ticketData.email],
    subject: `Your Ticket for ${eventData.name}`,
    react: TicketConfirmation(emailDetails),
  });

  if (emailError) {
    console.error(emailError);
    throw new Error("An error occurred while sending email");
  }

  if (error) {
    console.error(error);
    throw new Error("An error occurred while activating ticket");
  }

  revalidatePath("/dashboard/tickets");
};

export const refundTicket = async (id: string) => {
  const { data, error } = await supabase
    .from("tickets")
    .update({ status: 2 })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("An error occurred while refunding ticket");
  }

  revalidatePath("/dashboard/tickets");
};
