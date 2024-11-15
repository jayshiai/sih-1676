"use client";

import * as React from "react";
import { Inbox, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MailDisplay } from "@/components/notifications/mail-display";
import { MailList } from "@/components/notifications/notification-list";
import { Nav } from "@/components/notifications/nav";
import { type Mail } from "@/types/notification";
import { useMail } from "./notification-provider";

interface MailProps {
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  severityData: any;
}

export function Mail({
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
  severityData,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedSeverity, setSelectedSeverity] = React.useState<string>("All");

  const { selected } = useMail();
  // Map severityData to a usable format
  const severityCounts = {
    Critical:
      severityData.find((item: any) => item.severity === "CRITICAL")?.count ||
      0,
    High:
      severityData.find((item: any) => item.severity === "HIGH")?.count || 0,
    Medium:
      severityData.find((item: any) => item.severity === "MEDIUM")?.count || 0,
    Unknown:
      severityData.find((item: any) => item.severity === null)?.count || 0,
  };

  // Function to filter mails based on selected severity
  const filteredMails = React.useMemo(() => {
    if (selectedSeverity === "All") {
      return mails;
    }
    return mails.filter((mail) => {
      if (selectedSeverity === "Unknown") {
        return mail.severity === "UNKNOWN";
      }
      return mail.severity?.toUpperCase() === selectedSeverity.toUpperCase();
    });
  }, [selectedSeverity, mails]);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[650px] items-stretch border"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          ></div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            selectedSeverity={selectedSeverity}
            onSelectSeverity={setSelectedSeverity}
            links={[
              {
                title: "All Notifications",
                label: `${mails.length}`,
                icon: <Inbox className="h-4 w-4" />,

                severity: "All",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            selectedSeverity={selectedSeverity}
            onSelectSeverity={setSelectedSeverity}
            links={[
              {
                title: "Critical",
                label: `${severityCounts.Critical}`,
                icon: <span className="h-4 w-4 bg-red-600 rounded-full" />,

                severity: "Critical",
              },
              {
                title: "High",
                label: `${severityCounts.High}`,
                icon: <span className="h-4 w-4 bg-orange-600 rounded-full" />,

                severity: "High",
              },
              {
                title: "Medium",
                label: `${severityCounts.Medium}`,
                icon: <span className="h-4 w-4 bg-blue-600 rounded-full" />,

                severity: "Medium",
              },
              {
                title: "Unknown",
                label: `${severityCounts.Unknown}`,
                icon: <span className="h-4 w-4 bg-gray-300 rounded-full " />,

                severity: "Unknown",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={filteredMails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={filteredMails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            mail={mails.find((item) => item.id === selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
