"use client";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  advisory_count: {
    label: "Vendor",
  },
} satisfies ChartConfig;

interface DataItem {
  advisory_count: number;
  vendor_name: string;
}

interface AnalyticsPieChartProps {
  data: DataItem[];
}

const AnalyticsPieChart: React.FC<AnalyticsPieChartProps> = ({ data }) => {
  // Generate a color array based on the number of data items
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#4BC0C0",
    "#FFCE56",
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie data={data} dataKey="advisory_count" nameKey="vendor_name">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default AnalyticsPieChart;
