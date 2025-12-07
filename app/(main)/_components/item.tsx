"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, LucideIcon } from "lucide-react";

interface ItemProps {
  onClick: () => void;
  label: string;
  icon: LucideIcon;

  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

function Item({
  icon: Icon,
  label,
  onClick,
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) {
  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;

  const handleExpand = () => {};

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: `${(level + 1) * 12}px`,
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium cursor-pointer",
        active && "bg-primary/5 text-primary"
      )}
    >
      {id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="size-4 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]"></div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {
        isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">CTRL</span>K
          </kbd>
        )
      }
    </div>
  );
}

export default Item;
