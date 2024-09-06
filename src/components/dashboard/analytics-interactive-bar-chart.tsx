"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  critical_count: {
    label: "Critical",
    color: "hsl(var(--chart-1))",
  },
  high_count: {
    label: "High",
    color: "hsl(var(--chart-2))",
  },
  medium_count: {
    label: "Medium",
    color: "hsl(var(--chart-3))",
  },
  null_count: {
    label: "Null",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function AnalyticsInteractiveBarChart({
  chartData,
  className,
}: {
  chartData: any[];
  className?: string;
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("critical_count");

  const total = React.useMemo(
    () => ({
      critical_count: chartData.reduce(
        (acc, curr) => acc + curr.critical_count,
        0
      ),
      high_count: chartData.reduce((acc, curr) => acc + curr.high_count, 0),
      medium_count: chartData.reduce((acc, curr) => acc + curr.medium_count, 0),
      null_count: chartData.reduce((acc, curr) => acc + curr.null_count, 0),
    }),
    []
  );

  return (
    <Card className="col-span-5 row-span-1">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>
            Severity distribution of vulnerabilities over time
          </CardDescription>
        </div>
        <div className="flex">
          {["critical_count", "high_count", "medium_count", "null_count"].map(
            (key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className={className}>
          <BarChart
            accessibilityLayer
            data={chartData}
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
