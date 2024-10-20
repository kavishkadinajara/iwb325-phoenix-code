import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import Link from "next/link";
  
  import { paymentColumns } from "@/components/ui/payment-columns";
  import { PaymentTable } from "@/components/ui/payment-table";
  import { supabase } from "@/utils/supabase/serviceUser";
  
  export default async function PaymentsPage() {
    const { data: payments, error } = await supabase
      .from("bank_accounts_view")
      .select();
  
    if (error) {
      console.error("Error fetching events:", error.message);
    }
  
    return (
      <div>
        <Breadcrumb className="hidden md:flex ml-6 -mt-12 z-40 absolute mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" prefetch={false}>
                  Payments
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
          <div className="pb-6">
            <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
            <p className="text-muted-foreground">
              Here&apos;s the list of pending payments
            </p>
          </div>
          <PaymentTable data={payments} columns={paymentColumns} />
        </main>
      </div>
    );
  }