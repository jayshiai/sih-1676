import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const vendors = [
  {
    value: "Microsoft",
    label: "Microsoft",
  },
  {
    value: "Cisco",
    label: "Cisco",
  },
];
export const severities = [
  {
    label: "Unknown",
    value: "Unknown",
    icon: <span className="mr-2 h-4 w-4 bg-gray-300 rounded-full " />,
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: <span className="mr-2 h-4 w-4 bg-blue-600 rounded-full" />,
  },
  {
    label: "High",
    value: "HIGH",
    icon: <span className="mr-2 h-4 w-4 bg-orange-600 rounded-full" />,
  },
  {
    label: "Critical",
    value: "CRITICAL",
    icon: <span className="mr-2 h-4 w-4 bg-red-600 rounded-full" />,
  },
];
