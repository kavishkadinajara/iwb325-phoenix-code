import { DataTable } from "@/components/ui/data-table";
import {
  Participant,
  participantColumns,
} from "@/components/ui/participant-columns";
import {
  BadgeInfo,
  CircleAlert,
  CircleCheckBig,
  Coffee,
  Cookie,
  Drumstick,
  Fish,
  LeafIcon,
  Utensils,
  UtensilsCrossed,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ParticipantDetails({ data }: { data: Participant[] }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="bg-muted/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase">
              Attendance
            </CardTitle>
            <CircleCheckBig className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div className="flex gap-3">
                <CircleCheckBig className="w-4 h-4 my-auto" />
                Arrived:{" "}
                <span className="font-extrabold">
                  {data.filter((p) => p.attendance === 1).length}
                </span>{" "}
                / {data.length}
              </div>
              <div className="flex gap-3">
                <CircleAlert className="w-4 h-4 my-auto" />
                Pending:{" "}
                <span className="">
                  {data.filter((p) => p.attendance === 0).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium uppercase">
              dietary requirements
            </CardTitle>
            <Utensils className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div className="flex gap-3">
                <LeafIcon className="w-4 h-4 my-auto" />
                Veg: <span>{data.filter((p) => p.meal_type === 2).length}</span>
              </div>
              <div className="flex gap-3">
                <Drumstick className="w-4 h-4 my-auto" />
                Non-Veg:{" "}
                <span>{data.filter((p) => p.meal_type === 1).length}</span>
              </div>
              <div className="flex gap-3">
                <Fish className="w-4 h-4 my-auto" />
                Fish:{" "}
                <span>{data.filter((p) => p.meal_type === 3).length}</span>
              </div>
              {data.filter((p) => p.meal_type === null).length > 0 ? (
                <div className="flex gap-3">
                  <BadgeInfo className="w-4 h-4 my-auto" />
                  Unknown:{" "}
                  <span>{data.filter((p) => p.meal_type === null).length}</span>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Meals & Refreshments
            </CardTitle>
            <Cookie className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              <div className="flex gap-3">
                <UtensilsCrossed className="w-4 h-4 my-auto" />
                Lunch: <span>{data.filter((p) => p.lunch === 1).length}</span>
              </div>
              <div className="flex gap-3">
                <Coffee className="w-4 h-4 my-auto" />
                Refreshments:{" "}
                <span>{data.filter((p) => p.refreshments === 1).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DataTable columns={participantColumns} data={data} />
    </div>
  );
}

export default ParticipantDetails;
