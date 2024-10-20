import { Button } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/Icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { dashboardNavItems } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function SheetNav({ active }: { active: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base"
            prefetch={false}
          >
            {/* <TicketIcon className="h-5 w-5 transition-all group-hover:scale-110" /> */}
            <Image src="/E-logo.png" alt="Eventure" width={40} height={40} />
            <span className="sr-only">Eventure</span>
          </Link>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {dashboardNavItems.map((item:any) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-2.5",
                active === item.name
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              prefetch={false}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default SheetNav;
