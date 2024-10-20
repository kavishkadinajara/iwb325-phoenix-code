import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
  } from "@/components/ui/breadcrumb";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import Link from "next/link";
  
  import AccountOptions from "@/components/AccountOptions";
  import EventSummary from "@/components/EventSummary";
  import Loader from "@/components/Loader";
  
  import PaymentsPieChart from "@/components/PaymentsPieChart";
  import RevenueLineChart from "@/components/RevenueLineChart";
  import SalesBarChart from "@/components/SalesBarChart";
  
  import {
    CalendarIcon,
    DollarSignIcon,
    TicketIcon,
    UsersIcon,
  } from "@/components/ui/Icons";
  import { createClient } from "@/utils/supabase/server";
  import { CalendarClock, CreditCard } from "lucide-react";
  import { Suspense } from "react";
  import AdminMobileNav from "@/components/admin/AdminMobileNav";
  import AdminSheetNav from "@/components//admin/AdminSheetNav";
  
  export default async function AdminDashboardPage() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("event_dashboard")
      .select("*")
      .single();
  
    if (error) {
      console.error(error);
      throw new Error("An error occurred while fetching data");
    }
    const dashboardData = data.event_dashboard;
  
    return (
      <div className="flex min-h-screen w-full">
        <AdminMobileNav active="Dashboard" />
  
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <AdminSheetNav active="Dashboard" />
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tickets Sold
                  </CardTitle>
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.total_ticket_sales}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.tickets_available} tickets available
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }).format(dashboardData.total_revenue)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    from {dashboardData.total_ticket_sales} tickets sold
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unpaid Tickets
                  </CardTitle>
                  <CalendarClock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.total_unpaid_tickets}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }).format(
                      dashboardData.total_unpaid_tickets *
                        dashboardData.ticket_price
                    )}{" "}
                    unpaid
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Attended People
                  </CardTitle>
                  <UsersIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.attended_people}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData.total_ticket_sales > 0
                      ? (
                          (dashboardData.attended_people /
                            dashboardData.total_ticket_sales) *
                          100
                        ).toFixed(2)
                      : 0}
                    % of total tickets sold
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Ticket Sales by Event
                  </CardTitle>
                  <TicketIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <SalesBarChart
                    className="aspect-square py-6"
                    data={dashboardData.tickets_by_day}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Revenue by Month
                  </CardTitle>
                  <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <RevenueLineChart
                    className="aspect-[9/4] py-6"
                    data={dashboardData.tickets_by_day}
                    ticketPrice={dashboardData.ticket_price}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Payment Types
                  </CardTitle>
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <PaymentsPieChart
                    className="aspect-square py-6"
                    data={dashboardData.payment_methods}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Upcoming Events
                  </CardTitle>
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<Loader />}>
                    <EventSummary />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }