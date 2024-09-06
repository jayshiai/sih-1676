import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

import { supabase } from "@/config/supabaseClient";
import OverviewChart from "@/components/dashboard/overview-chart";
import AnalyticsPieChart from "@/components/dashboard/analtyics-pie-chart";
import AnalyticsBarChart from "@/components/dashboard/analytics-bar-chart";
import { AnalyticsStackedChart } from "@/components/dashboard/analytics-stacked-chart";

import NotificationPage from "@/components/notifications/notification-wrapper";

export default async function Home() {
  // Fetching data directly in the component
  const { data: vulnerabilities, error } = await supabase
    .from("vulnerabilities")
    .select(
      `
      cve,
      severity,
      base_score,
      advisories (
        title,
        publication_date,
        vendors (name)
      )
    `
    )
    .order("publication_date", { foreignTable: "advisories", ascending: false })
    .limit(20);

  const { count: totalCount, error: totalError } = await supabase
    .from("vulnerabilities")
    .select("*", { count: "exact" });

  const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  const { count: todayCount, error: todayError } = await supabase
    .from("advisories")
    .select("*", { count: "exact" })
    .eq("publication_date", today);

  const { data: monthData, error: monthError } = await supabase.rpc(
    "get_monthly_advisory_counts"
  );

  const { data: vendorData, error: vendorError } = await supabase.rpc(
    "get_advisories_per_vendor"
  );

  const { data: severityData, error: severityError } = await supabase.rpc(
    "get_vulnerabilities_by_severity"
  );

  const { data: severityMonthData, error: severityMonthError } =
    await supabase.rpc("count_severity_by_month");

  const { data: notificationData, error: notificationError } =
    await supabase.rpc("get_advisories_with_vulnerabilities_and_vendors");
  if (severityError) {
    console.error("Error:", severityError);
  }

  if (notificationError) {
    console.error("Error:", notificationError);
  }
  if (severityMonthError) {
    console.error("Error:", severityMonthError);
  }
  if (error) {
    console.error(error);
  }
  if (totalError) {
    console.error(totalError);
  }
  if (todayError) {
    console.error(todayError);
  }

  if (monthError) {
    console.error("Month Error: ", monthError);
  }

  if (vendorError) {
    console.error("VENDOR AGGREGATION ERROR: ", vendorError);
  }

  const lastEntry = monthData[monthData.length - 2];
  const secondLastEntry = monthData[monthData.length - 3];

  const difference = lastEntry.count - secondLastEntry.count;
  const percentageChange = ((difference / secondLastEntry.count) * 100).toFixed(
    2
  );
  const formattedPercentageChange =
    difference >= 0 ? `+${percentageChange}` : `${percentageChange}`;
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>

            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Vulnerabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {formattedPercentageChange}% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Vulnerabilities Reported Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {todayCount != null && todayCount > 0 ? "+" : ""}
                    {todayCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from yesterday
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2 ">
                  <OverviewChart data={monthData} />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Vulnerabilities</CardTitle>
                  <CardDescription>
                    265 new vulnerabilities reported
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80 w-full px-4 rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">CVE</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Vendor</TableHead>
                          <TableHead>Publication Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vulnerabilities?.map((vul, index) => (
                          <TableRow key={index}>
                            <TableCell>{vul.cve}</TableCell>
                            <TableCell>{vul.severity || "N/A"}</TableCell>
                            <TableCell>{vul.base_score || "N/A"}</TableCell>
                            {/* @ts-ignore */}
                            <TableCell>{vul.advisories.vendors.name}</TableCell>
                            <TableCell>
                              {new Date(
                                // @ts-ignore
                                vul.advisories.publication_date
                              ).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-7 grid-rows-2 gap-6">
              <div className="col-span-2 row-span-2 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor's Share</CardTitle>
                    <CardDescription>
                      Represents vulnerabilities contributed by each vendor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <AnalyticsPieChart data={vendorData} />
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                      Distribution of vulnerabilities by vendor
                    </div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Severity</CardTitle>
                    <CardDescription>
                      Count of vulnerabilities based on severity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <AnalyticsBarChart data={severityData} />
                  </CardContent>
                </Card>
              </div>

              <Card className="col-span-5 row-span-1">
                <CardHeader>
                  <CardTitle>Monthly Severity</CardTitle>
                  <CardDescription>
                    Severity comparison over the last months.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0 min-h-[100px]">
                  <AnalyticsStackedChart data={severityMonthData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="flex-col flex h-fit">
              <NotificationPage
                mails={notificationData}
                severityData={severityData}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
