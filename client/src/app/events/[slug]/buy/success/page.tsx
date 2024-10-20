import SuccessAnimation from "@/components/SuccessAnimation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCloudIcon } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

const SuccessPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams: { ticket: string };
}) => {
  if (!searchParams.ticket) {
    notFound();
  }
  // curl --location 'http://localhost:8080/events/ticket_details?ticketId=069acca2-bdd1-4371-9352-3c70ec93de58'
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/ticket_details?ticketId=${searchParams.ticket}`
  );

  const ticket = await res.json();

  console.log(ticket);
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="justify-center relative my-4 z-10 w-full">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[100vw] w-full flex flex-col items-center justify-center">
          <Card className="bg-muted/60 md:w-[70vw] mt-6 px-4">
            <CardHeader className="mx-auto items-center">
              <SuccessAnimation />
              <CardTitle className="text-center">
                Thank you
                <br />
                for your purchase!
              </CardTitle>
              <div className="text-center bg-black/40 text-white mt-8 font-mono z-10 py-2 px-4 rounded">
                <p className="text-center">{searchParams.ticket}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 px-4 flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="grid gap-2 text-center justify-center md:justify-normal md:text-left w-[40%]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Name:</span>
                    <span>{ticket.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{ticket.email}</span>
                  </div>
                  {ticket.payment_method && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Payment Method:</span>
                      <span>
                        {ticket.payment_method === 1 ? "Cash" : "Card"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>
                    <span>{ticket.status !== 1 ? "Pending" : "Activated"}</span>
                  </div>
                </div>
                <p className="text-lg text-center">
                  See you on{" "}
                  {new Date(ticket.event.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(
                    `1970-01-01T${ticket.event.time}`
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              {ticket.status === 1 && (
                <a
                  href={`/tickets/${searchParams.ticket}`}
                  download={`${ticket.name.replace(/\s/g, "-")}-${
                    ticket.event.name
                  }-ticket.pdf`}
                  className="w-full justify-center text-center mx-auto"
                >
                  <Button
                    title={`Download Your Ticket for ${ticket.event.name}`}
                    className="w-fit justify-center text-center mx-auto"
                  >
                    <DownloadCloudIcon className="mr-2" />
                    Download Your Ticket
                  </Button>
                </a>
              )}

              {ticket.status !== 1 && (
                <div className="max-w-md mx-auto bg-white/80 shadow-lg rounded-lg p-6 -mt-2">
                  <div className="text-center p-4 bg-yellow-100/80 rounded-md border border-yellow-300">
                    <h2 className="text-lg font-semibold text-yellow-700">
                      Payment Pending
                    </h2>
                    <p className="text-gray-700 mt-2">
                      Please pay the amount of{" "}
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(ticket.event.ticket_price)}{" "}
                      directly to the event organizer.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Once your payment is confirmed, your ticket will be
                      activated and sent to your email.
                    </p>
                    <p className="text-gray-600 text-sm mt-4">
                      If you have any questions or need assistance, please
                      contact the event organizer.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 p-4 rounded-md text-center space-y-2">
                <p className="text-gray-200 text-sm font-medium">
                  Please remember to bring your ticket on the day of the event,
                  either digitally or printed.
                </p>
                <p className="text-gray-300 text-xs italic">
                  This will be your proof of entry.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SuccessPage;
