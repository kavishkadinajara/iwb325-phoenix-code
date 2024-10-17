import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import asgardeoLogo from "../../../../public/images/asgardeo-icon.svg";
import Image from "next/image";

export default async function LoginPage() {
  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-primary">Eventure</span>
        </h1>
        <p className="text-balance text-muted-foreground">
          Sign in to your account using Asgardeo
        </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("asgardeo", { redirectTo: "/dashboard" });
        }}
      >
        <Button className="w-full max-w-sm text-lg" type="submit">
          Sign in with Asgardeo
          <Image
            src={asgardeoLogo}
            alt="Asgardeo logo"
            className="w-8 h-8 ml-2"
          />
        </Button>
      </form>
    </div>
  );
}
