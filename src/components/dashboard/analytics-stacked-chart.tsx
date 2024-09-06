"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  critical_count: {
    label: "Critical",
    color: "hsl(var(--chart-5))",
  },
  high_count: {
    label: "High",
    color: "hsl(var(--chart-3))",
  },
  medium_count: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  null_count: {
    label: "Null",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const getMonthName = (dateString: string) => {
  const monthIndex = new Date(dateString).getMonth();
  return monthNames[monthIndex];
};
export function AnalyticsStackedChart({ data, className }: any) {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => getMonthName(value)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="critical_count"
          type="natural"
          fill="var(--color-critical_count)"
          fillOpacity={0.4}
          stroke="var(--color-critical_count)"
          stackId="a"
        />
        <Area
          dataKey="high_count"
          type="natural"
          fill="var(--color-high_count)"
          fillOpacity={0.4}
          stroke="var(--color-high_count)"
          stackId="a"
        />
        <Area
          dataKey="medium_count"
          type="natural"
          fill="var(--color-medium_count)"
          fillOpacity={0.4}
          stroke="var(--color-medium_count)"
          stackId="a"
        />
        <Area
          dataKey="null_count"
          type="natural"
          fill="var(--color-null_count)"
          fillOpacity={0.4}
          stroke="var(--color-null_count)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
