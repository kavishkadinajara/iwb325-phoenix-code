/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format, startOfWeek, addDays, getDay, parseISO, Day } from "date-fns";

interface SalesBarChartProps {
  data: { date: string; tickets_sold: number }[];
}

const SalesBarChart = (props: SalesBarChartProps) => {
  // Prepare data
  const rawData = props.data;

  let weekData: any[];

  if (!rawData || rawData.length === 0) {
    // Create a default weekData array with 0 tickets sold for all days
    const today = new Date();
    const weekStartsOn = getDay(today) as Day;
    const startDate = startOfWeek(today, { weekStartsOn });

    weekData = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i);
      return {
        date: date.toISOString(),
        day: format(date, "EEE"),
        tickets_sold: 0,
      };
    });
  } else {
    // Parse the first date and determine the day of the week
    const firstDate = parseISO(rawData[0].date);
    const weekStartsOn = getDay(firstDate) as Day;
    console.log(weekStartsOn);

    // Get the start of the week based on the first date's day
    const startDate = startOfWeek(firstDate, { weekStartsOn });

    // Create an array for the entire week with default sales of 0
    weekData = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i);
      return {
        date: date.toISOString(),
        day: format(date, "EEE"),
        tickets_sold: 0,
      };
    });

    // Fill in the actual sales data
    rawData.forEach((item: { date: string; tickets_sold: number }) => {
      const date = parseISO(item.date);
      const dayIndex = getDay(date);
      const weekDayIndex = (dayIndex - weekStartsOn + 7) % 7; // Adjust index based on week start day
      weekData[weekDayIndex].tickets_sold = item.tickets_sold;
    });
  }

  return (
    <div {...props}>
      <ChartContainer
        config={{
          tickets_sold: {
            label: "Tickets Sold",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[200px]"
      >
        <BarChart accessibilityLayer data={weekData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="tickets_sold" fill="hsl(var(--chart-1))" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default SalesBarChart;