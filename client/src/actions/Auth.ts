"use server";

// import { createClient } from "@/utils/supabase/server";
// import { supabase as supabaseAdmin } from "@/utils/supabase/serviceUser";
import { redirect } from "next/navigation";

export const signOut = async () => {
  console.log("signing out");
//   const supabase = createClient();
//   await supabase.auth.signOut();
  return redirect("/login");
};

export const deleteAccount = async () => {
//   const supabase = createClient();
//   const session = await supabase.auth.getUser();
//   const userId = session.data.user?.id;
  if (!userId) {
    console.error("No user id found");
    return;
  }
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error deleting user", error.message);
    return;
  }
  return redirect("/login");
};