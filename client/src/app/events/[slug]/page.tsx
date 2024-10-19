import CountDown from "@/components/CountDown";
import MagicButton from "@/components/MagicButton";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaBan, FaLocationArrow } from "react-icons/fa6";

const EventLandingPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = createClient();

  const { data: eventData, error } = await supabase
    .from("events_anon_view")
    .select()
    .eq("slug", params.slug)
    .eq("status", 1)
    .single()
    .returns<Event[]>();

  if (error && error.code == "PGRST116") {
    notFound();
  }

  if (error) {
    console.error(error.message);
    return <div>ERROR</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex justify-center relative my-4 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <h1
            className={`text-3xl md:text-4xl lg:text-7xl font-bold text-center dark:text-white text-black mt-2 tracking-widest uppercase`}
          >
            {eventData.name}
          </h1>
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            {eventData.description}
          </p>
          <div className="flex flex-col gap-4 mt-10 text-center md:tracking-wider mb-4 text-xs md:text-md lg:text-xl">
            <div className="flex mx-auto my-auto">
              <MapPin size={24} className="my-auto" />
              <span className="ml-2 my-auto">{eventData.location}</span>
            </div>
            <div className="flex mx-auto my-auto">
              <Clock size={24} />
              <span className="ml-2 my-auto">
                {/* 26th August 2024, 9.00 AM */}
                {new Date(eventData.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                {", "}
                {new Date(`1970-01-01T${eventData.time}`).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <CountDown
              targetDate={new Date(`${eventData.date}T${eventData.time}`)}
            />
          </div>

          {eventData.available_tickets > 0 && (
            <Link href={`/events/${params.slug}/buy`} className="mt-10 md:mt-6">
              <MagicButton
                title="Buy Tickets Now"
                icon={<FaLocationArrow />}
                position="right"
              />
            </Link>
          )}

          {eventData.available_tickets <= 0 && (
            <div className="mt-10 md:mt-6">
              <MagicButton
                title="Tickets Sold Out"
                icon={<FaBan />}
                position="right"
                disabled
              />
            </div>
          )}
        </div>
      </div>
      <div className="relative w-3/4 mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={eventData.image}
          alt="hero"
          className="max-w-screen-sm z-10 fade-edges mx-auto"
        />
      </div>
    </div>
  );
};
export default EventLandingPage;