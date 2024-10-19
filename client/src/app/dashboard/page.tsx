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
import MobileNav from "@/components/MobileNav";
import PaymentsPieChart from "@/components/PaymentsPieChart";
import RevenueLineChart from "@/components/RevenueLineChart";
import SalesBarChart from "@/components/SalesBarChart";
import SheetNav from "@/components/SheetNav";
import {
  CalendarIcon,
  DollarSignIcon,
  TicketIcon,
  UsersIcon,
} from "@/components/ui/Icons";
import { CalendarClock, CreditCard } from "lucide-react";
import { Suspense } from "react";

export default async function DashboardPage() {
  const dashboardData = {
    total_ticket_sales: 100,
    tickets_available: 50,
    total_revenue: 50000,
    payment_methods: [
      { method: 1, count: 30 },
      { method: 2, count: 20 },
    ],
    ticket_price: 1000,
    total_unpaid_tickets: 10,
    attended_people: 80,
    total_paid_tickets: 90,
    tickets_by_day: [],
    total_refunded_tickets: 5,
  };


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
                <p className="text-xs text-muted-foreground gap-4">
                  <span className="mr-5">
                    Cash:{" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }).format(
                      (dashboardData.payment_methods.find(
                        (method: { method: number }) => method.method === 1
                      )?.count ?? 0) * dashboardData.ticket_price
                    )}
                  </span>
                  <span>
                    Card:{" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }).format(
                      (dashboardData.payment_methods.find(
                        (method: { method: number }) => method.method === 2
                      )?.count ?? 0) * dashboardData.ticket_price
                    )}
                  </span>
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
                          dashboardData.total_paid_tickets) *
                        100
                      ).toFixed(2)
                    : 0}
                  % of total paid tickets sold
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket Sales by Day
                </CardTitle>
                <TicketIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SalesBarChart
                  data={dashboardData.tickets_by_day}
                />
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Total Tickets Sold:{" "}
                    <span className="font-bold ml-1">
                      {dashboardData.total_ticket_sales}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Available Tickets:{" "}
                    <span className="font-bold ml-1">
                      {dashboardData.tickets_available}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Revenue:{" "}
                    <span className="font-bold ml-1">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(dashboardData.total_revenue)}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue by Day
                </CardTitle>
                <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <RevenueLineChart
                  className="aspect-[9/4] py-6"
                  data={dashboardData.tickets_by_day}
                  ticketPrice={dashboardData.ticket_price}
                />
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Ticket Price:{" "}
                    <span className="font-bold ml-1">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(dashboardData.ticket_price)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Paid Ticket Revenue:{" "}
                    <span className="font-bold ml-1">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(
                        dashboardData.total_paid_tickets *
                          dashboardData.ticket_price
                      )}
                    </span>
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Unpaid Ticket Revenue:{" "}
                    <span className="font-bold ml-1">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(
                        dashboardData.total_unpaid_tickets *
                          dashboardData.ticket_price
                      )}
                    </span>
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Refunded Ticket Revenue:{" "}
                    <span className="font-bold ml-1">
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(
                        dashboardData.total_refunded_tickets *
                          dashboardData.ticket_price
                      )}
                    </span>
                  </p>
                </div>
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
                  className="py-6"
                  data={dashboardData.payment_methods}
                />
                {dashboardData.ticket_price > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground">
                      Cash Payments:{" "}
                      <span className="font-bold ml-1">
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "LKR",
                        }).format(
                          dashboardData.payment_methods.find(
                            (method: { method: number }) => method.method === 1
                          )?.count ?? 0 * dashboardData.ticket_price
                        )}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Card Payments:{" "}
                      <span className="font-bold ml-1">
                        {Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "LKR",
                        }).format(
                          dashboardData.payment_methods.find(
                            (method: { method: number }) => method.method === 2
                          )?.count ?? 0 * dashboardData.ticket_price
                        )}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Events Summary
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