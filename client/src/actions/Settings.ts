"use server";

import { createClient } from "@/utils/supabase/server";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateBankAccount = async (prevState: any, formData: FormData) => {
  const accountName = formData.get("account-name") as string;
  const bankName = formData.get("bank-name") as string;
  const accountNumber = formData.get("account-number") as string;
  const bankBranch = formData.get("bank-branch") as string;

  const supabase = createClient();

  const session = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bank_accounts")
    .upsert({
      user_id: session.data.user?.id,
      account_name: accountName,
      bank: bankName,
      account_number: accountNumber,
      branch: bankBranch,
      updated_at: new Date(),
    })
    .select();

  if (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Could not update bank account",
    };
  }

  revalidatePath("/dashboard/settings");

  return {
    status: 200,
    message: "Bank account updated successfully",
  };
};

export const updateGeneralInfo = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  const profilePic = formData.get("profile-picture") as File;

  const supabase = createClient();

  const session = await supabase.auth.getUser();

  let profilePicUrl = null;

  if (profilePic && profilePic.name && profilePic.size) {
    const file = profilePic;
    // Extract the file extension from the file name
    const fileExtension = file.name.split(".").pop();
    const uploadPath = `${session.data.user?.id}/profile.${fileExtension}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(uploadPath, file, {
        upsert: true,
      });

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update profile picture",
      };
    }

    profilePicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  }

  if (profilePicUrl) {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: session.data.user?.id,
        full_name: name,
        mobile: phone,
        avatar_url: profilePicUrl,
        updated_at: new Date(),
      })
      .select();

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update general info",
      };
    }
  } else {
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: session.data.user?.id,
        full_name: name,
        mobile: phone,
        updated_at: new Date(),
      })
      .select();

    if (error) {
      console.error("error", error);
      return {
        status: 400,
        message: "Could not update general info",
      };
    }
  }

  revalidatePath("/dashboard/settings");

  return {
    status: 200,
    message: "General info updated successfully",
  };
};

export const updateSecurityInfo = async (
  prevState: any,
  formData: FormData
) => {
  const newPassword = formData.get("new-password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  //validate using zod
  const SignUpSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const validation = SignUpSchema.safeParse({
    password: newPassword,
  });

  if (validation.error) {
    return {
      status: 400,
      message: validation.error.errors[0].message,
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      status: 400,
      message: "Passwords do not match",
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Could not update password",
    };
  }

  revalidatePath("/dashboard/settings");

  return {
    status: 200,
    message: "Password updated successfully",
  };
};

export const generateApiKey = async () => {
  const supabase = createClient();

  const newKey = randomBytes(32).toString("hex");

  try {
    const { data, error } = await supabase
      .from("api_keys")
      .insert({
        key: newKey,
      })
      .select();
    if (error) {

      console.error("error", error);
      return {
        status: 400,
        message: "Failed to generate and save the new API key.",
      };
    }

    revalidatePath("/dashboard/settings");

    return {
      status: 200,
      message: newKey,
    };
  } catch (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Failed to generate and save the new API key.",
    };
  }
};


export const deleteApiKey = async (key: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("api_keys")
    .delete()
    .eq("key", key)
    .select();

  if (error) {
    console.error("error", error);
    return {
      status: 400,
      message: "Failed to delete the API key.",
    };
  }
  revalidatePath("/dashboard/settings");
  return {
    status: 200,
    message: "API Key deleted successfully",
  };
}