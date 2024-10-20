import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import AccountOptions from "@/components/AccountOptions";
import MobileNav from "@/components/MobileNav";
import SheetNav from "@/components/SheetNav";

const NoDataDashboard = () => {
  return (
    <div className="flex min-h-screen w-full">
      <MobileNav active="Dashboard" />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SheetNav active="Dashboard" />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <AccountOptions />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <h1 className="text-3xl font-bold text-center">
              No data available
            </h1>
              
            <p className="text-gray-500 text-center">
            You haven&apos;t created any events yet or there are no default event to display.
            <br />
            Create an event or
              Mark an event as default to see data here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};
export default NoDataDashboard;
