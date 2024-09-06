import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/types/notification";
import { useMail } from "./notification-provider";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const { selected, setSelected } = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selected === item.id && "bg-muted"
            )}
            onClick={() => setSelected(item.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.publication_date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.vendor}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.cves.join(", ")}
            </div>

            <div className="flex items-center gap-2">
              <Badge
                key={item.severity}
                variant={getBadgeVariantFromLabel(item.severity)}
              >
                {item.severity}
              </Badge>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["critical"].includes(label.toLowerCase())) {
    return "destructive";
  }

  if (["high"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["medium"].includes(label.toLowerCase())) {
    return "secondary";
  }
  return "outline";
}
