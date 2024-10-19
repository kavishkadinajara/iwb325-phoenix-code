/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { addDays, Day, format, getDay, parseISO, startOfWeek } from "date-fns";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const RevenueLineChart = (props: any) => {
  // Prepare data
  const rawData = props.data;

   const ticketPrice = props.ticketPrice;
  
  let weekData: any[];
  
  if (!rawData || rawData.length === 0) {
    // Create a default weekData array with 0 revenue for all days
    const today = new Date();
    const weekStartsOn = getDay(today) as Day;
    const startDate = startOfWeek(today, { weekStartsOn });
  
    weekData = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i);
      return {
        date: date.toISOString(),
        day: format(date, "EEE"),
        revenue: 0,
      };
    });
  } else {
    // Parse the first date and determine the day of the week
    const firstDate = parseISO(rawData[0].date);
    const weekStartsOn = getDay(firstDate) as Day;
  
    // Get the start of the week based on the first date's day
    const startDate = startOfWeek(firstDate, { weekStartsOn });
  
    // Create an array for the entire week with default revenue of 0
    weekData = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i);
      return {
        date: date.toISOString(),
        day: format(date, "EEE"),
        revenue: 0,
      };
    });
  
    // Fill in the actual revenue data
    rawData.forEach((item: { date: string; tickets_sold: number }) => {
      const date = parseISO(item.date);
      const dayIndex = getDay(date);
      const weekDayIndex = (dayIndex - weekStartsOn + 7) % 7; // Adjust index based on week start day
      weekData[weekDayIndex].revenue = item.tickets_sold * ticketPrice;
    });
  }

  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Revenue",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={weekData}
          margin={{
            top: 12,
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="revenue"
            type="natural"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default RevenueLineChart;