"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  isCollapsed: boolean;
  selectedSeverity: string;
  links: {
    title: string;
    label?: string;
    icon: ReactNode;

    severity: string; // Add severity to distinguish between the options
  }[];
  onSelectSeverity: (severity: string) => void; // Handler for severity selection
}

export function Nav({
  links,
  isCollapsed,
  onSelectSeverity,
  selectedSeverity,
}: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelectSeverity(link.severity)} // Handle severity selection
                  className={cn(
                    buttonVariants({
                      variant:
                        selectedSeverity == link.severity ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9"
                  )}
                >
                  {link.icon}
                  <span className="sr-only">{link.title}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              key={index}
              onClick={() => onSelectSeverity(link.severity)} // Handle severity selection
              className={cn(
                buttonVariants({
                  variant:
                    selectedSeverity == link.severity ? "default" : "ghost",
                  size: "sm",
                }),

                "justify-start w-full text-left" // Ensures the button takes the full width
              )}
            >
              {link.icon}
              <p className="ml-2">{link.title}</p>
              {link.label && (
                <span className={cn("ml-auto")}>{link.label}</span>
              )}
            </button>
          )
        )}
      </nav>
    </div>
  );
}
