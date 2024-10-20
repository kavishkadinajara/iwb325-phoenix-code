/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateBankAccount = async (prevState: any, formData: FormData) => {
  const accountName = formData.get("account-name") as string;
  const bankName = formData.get("bank-name") as string;
  const accountNumber = formData.get("account-number") as string;
  const bankBranch = formData.get("bank-branch") as string;

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

  revalidatePath("/dashboard/settings");

  return {
    status: 200,
    message: "Password updated successfully",
  };
};

export const generateApiKey = async () => {
  const newKey = randomBytes(32).toString("hex");

  try {
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
  revalidatePath("/dashboard/settings");
  return {
    status: 200,
    message: "API Key deleted successfully",
  };
};
