"use server";
import TicketConfirmation from "@/emails/TicketConfirmation";
import { Event } from "@/types";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const toggleAttendance = async (id: string, attendance: number) => {
  attendance = attendance === 1 ? 0 : 1;

  let arrival = null;
  if (attendance === 1) {
    arrival = new Date().toISOString();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/updateAttendance`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, attendance, arrival }),
    }
  );
  if (!res.ok) {
    throw new Error("An error occurred while updating attendance");
  }

  // console.log(data);
  console.log("toggleAttendance", id, attendance, arrival);

  revalidatePath("/dashboard/tickets");
  revalidatePath("/dashboard/participants");
};

export const toggleRefreshments = async (id: string, refreshments: number) => {
  console.log("toggleRefreshments", id);

  refreshments = refreshments === 1 ? 0 : 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/updateRefreshments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, refreshments }),
    }
  );
  if (!res.ok) {
    throw new Error("An error occurred while updating refreshments");
  }

  console.log("toggleRefreshments", id, refreshments);

  revalidatePath("/dashboard/tickets");
  revalidatePath("/dashboard/participants");
};

export const toggleLunch = async (id: string, lunch: number) => {
  lunch = lunch === 1 ? 0 : 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/updateLunch`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, lunch }),
    }
  );
  if (!res.ok) {
    throw new Error("An error occurred while updating lunch");
  }

  console.log("toggleLunch", id, lunch);

  revalidatePath("/dashboard/tickets");
  revalidatePath("/dashboard/participants");
};

export const activateTicket = async (id: string) => {
  // const { data: ticketData, error } = await supabase
  //   .from("tickets")
  //   .update({ status: 1 })
  //   .eq("id", id)
  //   .select()
  //   .single();

  // const { data: eventData, error: fetchError } = await supabase
  //   .from("events_anon_view")
  //   .select()
  //   .eq("id", ticketData.event_id)
  //   .single()
  //   .returns<Event[]>();

  // if (fetchError && fetchError.code == "PGRST116") {
  //   throw new Error("Event not found");
  // }

  // if (fetchError) {
  //   console.error(fetchError);
  //   throw new Error("An error occurred while fetching event data");
  // }

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
    from: "EVENTURE <eventure@notifibm.com>",
    to: [ticketData.email],
    subject: `Your Ticket for ${eventData.name}`,
    react: TicketConfirmation(emailDetails),
  });

  // if (emailError) {
  //   console.error(emailError);
  //   throw new Error("An error occurred while sending email");
  // }

  // if (error) {
  //   console.error(error);
  //   throw new Error("An error occurred while activating ticket");
  // }

  console.log("activateTicket", id);

  revalidatePath("/dashboard/tickets");
};

export const refundTicket = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/refundTicket`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  if (!res.ok) {
    throw new Error("An error occurred while refunding ticket");
  }

  console.log("refundTicket", id);

  revalidatePath("/dashboard/tickets");
  revalidatePath("/dashboard/participants");
};
