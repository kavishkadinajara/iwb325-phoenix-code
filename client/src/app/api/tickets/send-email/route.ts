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

    const supabase = createClient();

    const { data: eventData, error: fetchError } = await supabase
      .from("events_anon_view")
      .select()
      .eq("id", event_id)
      .single()
      .returns<Event[]>();

    if (fetchError && fetchError.code == "PGRST116") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const emaildetails = {
      username: name,
      event: event_name,
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

    const { data, error } = await resend.emails.send({
      from: "EVENTURE <eventure@notifibm.com>",
      to: [email],
      subject: `Your Ticket for ${event_name}`,
      react: TicketConfirmation(emaildetails),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}