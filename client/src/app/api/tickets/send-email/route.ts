/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import TicketConfirmation from "@/emails/TicketConfirmation";
// import { createClient } from "@/utils/supabase/server";
import { Event } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      mobile,
      status,
      event_id,
      ticket_id,
      event_name,
      event_image,
      payment_method,
      key,
    } = await req.json();

    console.log(key);
    console.log(status);

    if (key !== process.env.EMAIL_VALIDATION_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (status != 1) {
      return NextResponse.json({ error: "Ticket not paid" }, { status: 400 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BAL_URL}/events/activateTicket`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticket_id }),
      }
    );
    if (!res.ok) {
      throw new Error("An error occurred while updating lunch");
    }

    const tres = await fetch(
      `${process.env.NEXT_PUBLIC_BAL_URL}/events/ticket_details?ticketId=${ticket_id}`
    );

    const ticket = await tres.json();

    console.log(ticket);
    console.log(ticket.email);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BAL_URL}/events/event_by_id?id=${ticket.event.id}`
    );
    const eventData = await response.json();
    console.log(eventData);
    if (!eventData) {
      throw new Error("An error occurred while fetching event data");
    }
    const emailDetails = {
      username: ticket.name,
      event: eventData.name,
      eventImage: eventData.image,
      date: new Date(eventData.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: new Date(`1970-01-01T${eventData.time}`).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      ),
      location: eventData.location,
      ticketId: ticket_id,
      ticketUrl: `https://eventure.vercel.app/tickets/${ticket_id}`,
    };

    const { data, error: emailError } = await resend.emails.send({
      from: "Eventure <eventure@notifibm.com>",
      to: [ticket.email],
      subject: `Your Ticket for ${eventData.name}`,
      react: TicketConfirmation(emailDetails),
    });

    if (emailError) {
      console.error(emailError);
      throw new Error("An error occurred while sending email");
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
