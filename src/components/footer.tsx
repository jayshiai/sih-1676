import * as React from "react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between mx-auto gap-4 py-10 md:h-12 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://3dubs.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              3Dubs
            </a>
            . Using{" "}
            <a
              href="https://ui.3dubs.in"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              DubsUI
            </a>
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
