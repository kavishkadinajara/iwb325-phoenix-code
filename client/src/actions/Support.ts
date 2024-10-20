/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SupportInquiry } from "@/emails/SupportInquiry";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const contactSupport = async (prevState: any, formData: FormData) => {
  try {
    const userEmail = formData.get("email") as string;
    const userName = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const emailDetails = {
      userName,
      subject,
      message,
    };

    const { data, error: emailError } = await resend.emails.send({
      from: "Eventure <eventure@notifibm.com>",
      to: "Eventure Support <contact@supunsathsara.com>",
      replyTo: userEmail,
      subject: `Support Inquiry: ${subject}`,
      react: SupportInquiry(emailDetails),
    });

    if (emailError) {
      console.error(emailError);
      throw new Error("An error occurred while sending email");
    }

    console.log(data);

    return {
      status: 200,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "An error occurred while sending message",
    };
  }
};