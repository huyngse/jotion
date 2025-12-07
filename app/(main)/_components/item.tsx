"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LucideIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { toast } from "sonner";

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
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const ChevronIcon = expanded ? ChevronDownIcon : ChevronRightIcon;

  const handleArchive: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!id) return;
    const promise = archive({ id });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  const handleCreate: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!id) return;
    const promise = create({
      title: "Untitled",
      parentDocument: id,
    }).then((documentId) => {
      if (!expanded) {
        onExpand?.();
        router.push(`/documents/${documentId}`);
      }
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const handleExpand: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onExpand?.();
  };

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
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
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
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}
      {id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontalIcon className="size-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem
                onClick={handleArchive}
                className="cursor-pointer"
              >
                <TrashIcon className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Latest edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={handleCreate}
          >
            <PlusIcon className="size-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}

interface ItemSkeletonProps {
  level?: number;
}

Item.Skeleton = function ItemSkeleton({ level }: ItemSkeletonProps) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="size-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
