"use server";

import { revalidatePath } from "next/cache";
const clearCachesByServerAction = async (path: string) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
      revalidatePath("/[lang]");
    }
  } catch (error) {
    console.error("clearCachesByServerAction=> ", error);
  }
};
<<<<<<< HEAD
export default clearCachesByServerAction;
=======
export default clearCachesByServerAction;
>>>>>>> 607c20575f8732ed9b9920bc36bb93156efe865f
