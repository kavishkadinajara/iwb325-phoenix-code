/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const PaymentsPieChart = (props: any) => {
  // Prepare data
  const preparedData = props.data.map((item: any) => {
    const method =
      item.method == 1 ? "Cash" : item.method == 2 ? "Card" : "Other";

    const fill =
      method === "Cash"
        ? "var(--color-cash)"
        : method === "Card"
        ? "var(--color-card)"
        : "var(--color-other)";

    return {
      ...item,
      method,
      fill,
    };
  });

  return (
    <div {...props}>
      <ChartContainer
        config={{
          count: {
            label: "Count",
          },
          cash: {
            label: "Cash",
            color: "hsl(var(--chart-4))",
          },
          card: {
            label: "Card",
            color: "hsl(var(--chart-3))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={preparedData} dataKey="count" nameKey="method" />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default PaymentsPieChart;