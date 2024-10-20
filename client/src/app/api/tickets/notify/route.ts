/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { Event } from "@/types";
import EventPass from "@/emails/EventPass";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      Timestamp,
      "Full Name": fullName,
      Email,
      "Mobile No": mobileNo,
      Batch,
      "Index No.": indexNo,
      row_number,
      key,
      event_id,
      event_name,
    } = await req.json();

    const { data: valid, error: validateError } = await supabaseAdmin.rpc(
      "validate_api_key",
      {
        api_key: key,
        event_id: event_id,
      }
    );

    if (validateError) {
      return NextResponse.json({ error: validateError }, { status: 401 });
    }

    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // const supabase = createClient();

    const { data: eventData, error: fetchError } = await supabase
      .from("events_anon_view")
      .select()
      .eq("id", event_id)
      .eq("status", 1)
      .single()
      .returns<Event[]>();

    if (fetchError && fetchError.code == "PGRST116") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    const ticketId = uuidv4();

    const newPass = {
      _ticket_id: ticketId,
      _name: fullName,
      _email: Email,
      _mobile: mobileNo,
      _meal_type: null,
      _payment_method: null,
      _status: 1,
      _event_id: eventData.id,
      _event_name: event_name,
      _event_image: eventData.image,
      _row_no: row_number,
    };

    const { data: ticketData, error: insertError } = await supabase.rpc(
      "process_pass_issue",
      newPass
    );

    if (insertError) {
      return NextResponse.json({ error: insertError }, { status: 500 });
    }

    const emaildetails = {
      username: fullName,
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
      verificationCode: row_number,
      passUrl: `https://eventure.vercel.app/tickets/${ticketId}`,
    };

    const { data, error } = await resend.emails.send({
      from: "EVENTURE <eventure@notifibm.com>",
      to: [Email],
      subject: `Your Pass for ${event_name}`,
      react: EventPass(emaildetails),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}