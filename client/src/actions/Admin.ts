"use server";

import { supabase } from "@/utils/supabase/serviceUser";
import { revalidatePath } from "next/cache";

export const changeEventStatus = async (id: string, status: number) => {
  const { data, error } = await supabase
    .from("events")
    .update({ status: status })
    .eq("id", id);

  if (error) {
    console.error(`Error marking event as ${status}`, error);
    return;
  }
  console.log(`Event successfully marked as ${status}`);
  revalidatePath("/dashboard/events");
};

export const submitPayment = async (prevState: any, formData: FormData) => {
  const user_id = formData.get("user-id") as string;
  const amount = formData.get("amount") as string;
  const receipt = formData.get("receipt") as File | null;

  if (!receipt || !receipt.name || !receipt.size) {
    return {
      status: 400,
      message: "Receipt is required",
    };
  }

  const fileExtension = receipt.name.split(".").pop();

  const date = new Date().toISOString();

  const {data, error} = await supabase.storage
    .from("receipts")
    .upload(`receipts/${user_id}/${date}.${fileExtension}`, receipt);

  if (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Could not upload receipt",
    };
  }

  const receiptUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

  const { data: paymentData, error: paymentInsertError } = await supabase.rpc(
    "process_payout",
    {
      p_user_id: user_id,
      p_receipt_url: receiptUrl,
      p_amount: amount,
    }
  );

  if (paymentInsertError) {
    console.error("error", paymentInsertError);
    return {
      status: 400,
      message: "Could not process payment",
    };
  }

  revalidatePath("/admin/payments");

  return {
    status: 200,
    message: "Payment processed successfully",
  };
};