"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const markEventAsDefault = async (id: string) => {
  const session = await auth();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/markDefault`,
    {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        event_id: id,
      }),
    }
  );

  if (!response.ok) {
    console.error("Error marking event as default");
    return;
  }

  console.log("Event successfully marked as default" + id);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard/tickets");
  revalidatePath("/dashboard/participants");
};
