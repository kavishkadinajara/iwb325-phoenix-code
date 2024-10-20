import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  import { TicketIcon } from "@/components/ui/Icons";
  import { adminDashboardNavItems } from "@/data";
  import { cn } from "@/lib/utils";
  import Link from "next/link";
  
  function AdminMobileNav({ active }: { active: string }) {
    return (
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <TicketIcon className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">NIBMTix</span>
            </Link>
            {adminDashboardNavItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                      active === item.name
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
    );
  }
  
  export default AdminMobileNav;