import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { MenuIcon, TicketIcon } from "@/components/ui/Icons";
import { adminDashboardNavItems } from "@/data";
import { cn } from "@/lib/utils";

function AdminSheetNav({ active }: { active: string }) {
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
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            prefetch={false}
          >
            <TicketIcon className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">EVENTURE</span>
          </Link>
          {adminDashboardNavItems.map((item) => (
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

export default AdminSheetNav;