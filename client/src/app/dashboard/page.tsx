import { auth, signIn } from "@/auth";
import Logout from "@/components/Logout";

const DashboardPage = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex flex-col gap-4">
      DashboardPage
      <form
      action={async () => {
        "use server"
        await signIn("asgardeo", { callbackUrl: "/dashboard" });
      }}
    >
      <button type="submit">Signing with asgardeo</button>
    </form>
      <h1> {session?.user?.id}</h1>
      <h1>{session?.user?.email}</h1>
      <Logout />
    </div>
  );
};
export default DashboardPage;
