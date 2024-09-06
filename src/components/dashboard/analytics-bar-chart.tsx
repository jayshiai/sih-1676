"use client";

import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Count",
  },
  CRITICAL: {
    label: "Critical",
    color: "hsl(var(--chart-5))",
  },
  HIGH: {
    label: "High",
    color: "hsl(var(--chart-3))",
  },
  MEDIUM: {
    label: "Medium",
    color: "hsl(var(--chart-2))",
  },
  null: {
    label: "Null",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Define the custom order
const severityOrder = ["CRITICAL", "HIGH", "MEDIUM", null];

const AnalyticsBarChart = ({ data }: any) => {
  // Function to get the fill color based on severity
  const getFillColor = (severity: string) => {
    const config = chartConfig[severity as keyof typeof chartConfig];
    //@ts-ignore
    return config?.color || "gray"; // Default to gray if severity is not found
  };

  // Adding fill color to each data point
  const dataWithFill = data.map((item: any) => ({
    ...item,
    fill: getFillColor(item.severity),
  }));

  // Sort data based on custom order
  //@ts-ignore
  const sortedData = dataWithFill.sort((a, b) => {
    return (
      severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
    );
  });

  return (
    <ChartContainer config={chartConfig} className="">
      <BarChart
        accessibilityLayer
        data={sortedData}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey="severity"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            value
              ? chartConfig[value as keyof typeof chartConfig]?.label
              : "N/A"
          }
        />
        <XAxis dataKey="count" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="count" layout="vertical" radius={5}>
          {sortedData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

export default AnalyticsBarChart;
