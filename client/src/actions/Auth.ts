/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { error as consoleError } from "console";
import { redirect } from "next/navigation";

export const signOut = async () => {
  console.log("signing out");
//   const supabase = createClient();
//   await supabase.auth.signOut();
  return redirect("/login");
};

export const deleteAccount = async () => {


};