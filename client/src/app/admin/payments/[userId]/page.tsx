import PaymentForm from "@/components/admin/PaymentForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { supabase } from "@/utils/supabase/serviceUser";
import Link from "next/link";
import { notFound } from "next/navigation";

const PaymentDetailsPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const { data: payments, error } = await supabase
    .from("bank_accounts_view")
    .select()
    .eq("user_id", params.userId)
    .single();

  if (error && (error.code == "PGRST116" || error.code == "22P02")) {
    notFound();
  }

  if (error) {
    console.error("Error fetching events:", error.message);
    throw new Error("Error fetching events");
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
              <Link href="/admin/payments" prefetch={false}>
                Payments
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#" prefetch={false}>
                {payments.user_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
        <div className="pb-6">
          <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Payment for {payments.user_name}
          </p>
        </div>
        <PaymentForm data={payments} />
      </main>
    </div>
  );
};
export default PaymentDetailsPage;