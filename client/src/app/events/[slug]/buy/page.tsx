import BuyTicketForm from "@/components/BuyTicketForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createHash } from "crypto";
import {
  CalendarCheck,
  Clock10Icon,
  MapPinIcon,
  TicketCheckIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const TicketBuyPage = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BAL_URL}/events/public_view?slug=${params.slug}`
  );
  const eventData = await res.json();
  if (!eventData) {
    return notFound();
  }

  const ticketId = uuidv4();

  const hashedMerchantSecret = createHash("md5")
    .update(process.env.PAYHERE_MERCHANT_SECRET!)
    .digest("hex")
    .toUpperCase();
  const hash = createHash("md5")
    .update(
      process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID +
        ticketId +
        Number(eventData.ticket_price + eventData.ticket_price * 0.05).toFixed(
          2
        ) +
        "LKR" +
        hashedMerchantSecret
    )
    .digest("hex")
    .toUpperCase();

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="justify-center relative my-4 z-10 w-full">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[100vw] w-full flex flex-col items-center justify-center">
          <h1
            className={`text-lg md:text-2xl lg:text-4xl font-bold text-center dark:text-white text-black mt-2 tracking-widest uppercase`}
          >
            {eventData.name}
          </h1>
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            {eventData.description}
          </p>
          <Card className="bg-muted/60 md:w-[70vw] mt-6 px-4">
            <CardHeader>
              <CardTitle>
                Ticket Information
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4 flex items-center gap-3">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full">
                    {eventData.ticket_price === 0
                      ? "Free"
                      : Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "LKR",
                        }).format(eventData.ticket_price)}
                  </span>
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 flex flex-col md:flex-row gap-2">
              <div className="md:w-1/2">
                <BuyTicketForm
                  eventData={eventData}
                  hash={hash}
                  ticketId={ticketId}
                />
              </div>
              <div className="md:w-1/2 h-full mx-auto group/card mt-8">
                <div
                  className={cn(
                    "cursor-pointer overflow-hidden relative card rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4",
                    "bg-cover transform"
                  )}
                  style={{
                    backgroundImage: `url(${eventData.image})`,
                    width: "100%",
                    height: "auto",
                  }}
                >
                  <div className="absolute bg-black-100/50 w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-80"></div>
                  <div className="flex flex-row items-center space-x-4 z-10">
                    <div className="flex flex-col">
                      <p className="font-normal text-base text-gray-50 relative z-10">
                        {new Date(eventData.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-400">
                        {new Date(
                          `1970-01-01T${eventData.time}`
                        ).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                        {" Onwards"}
                      </p>
                    </div>
                  </div>
                  <div className="text content">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                      {eventData.name}
                    </h1>
                    <p className="font-normal text-sm text-gray-50 relative z-10 my-4 flex items-center gap-3">
                      <TicketCheckIcon className="w-6 h-6" />
                      <span className="bg-yellow-500 text-black px-3 py-1 rounded-full">
                        {eventData.ticket_price === 0
                          ? "Free"
                          : Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "LKR",
                            }).format(eventData.ticket_price)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mx-auto text-center w-full px-8 mt-10">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-6 h-6" />
                    <span>
                      {new Date(eventData.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock10Icon className="w-6 h-6" />
                    <span>
                      {new Date(
                        `1970-01-01T${eventData.time}`
                      ).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {" Onwards"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-6 h-6" />
                    <span>{eventData.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default TicketBuyPage;
