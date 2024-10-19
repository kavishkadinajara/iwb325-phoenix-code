/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import Link from "next/link";
  
  import MobileNav from "@/components/MobileNav";
  import SheetNav from "@/components/SheetNav";
  
  import AccountOptions from "@/components/AccountOptions";
  import ParticipantDetails from "@/components/ParticipantDetails";
  
  export default async function ParticipantsPage() {
    const data: string | any[] = []; // Define the data variable with an empty array or fetch data as needed
    
    return (
      <div className="flex min-h-screen w-full ">
        <MobileNav active="Participants" />
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SheetNav active="Participants" />
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard" prefetch={false}>
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="#" prefetch={false}>
                      Participants
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <AccountOptions />
          </header>
          <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
            <div className="pb-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Participants View
              </h2>
              {data.length !== 0 && (
                <p className="text-muted-foreground">
                  Here&apos;s the participants list for {data[0].event_name}
                </p>
              )}
            </div>
            <ParticipantDetails data={data} />
          </main>
        </div>
      </div>
    );
  }