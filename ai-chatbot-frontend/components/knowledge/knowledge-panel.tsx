"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useKnowledge } from "@/hooks/use-knowledge";
import { KnowledgeForm } from "./knowledge-form";
import { format } from "date-fns";
import { BookOpen } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function KnowledgePanel({ open, onClose }: Props) {
  const { data: entries, isLoading } = useKnowledge();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[420px] sm:w-[480px] flex flex-col p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Knowledge Base
          </SheetTitle>
          <SheetDescription>
            Add information that the AI will use to answer questions.
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {/* Add Knowledge Form */}
        <div className="px-6 py-4">
          <KnowledgeForm />
        </div>

        <Separator />

        {/* Entries List */}
        <div className="px-6 py-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Stored Entries ({entries?.length ?? 0})
          </p>
        </div>

        <ScrollArea className="flex-1 px-6">
          {isLoading ? (
            <div className="space-y-3 pb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : entries?.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No entries yet. Add some knowledge above!
            </p>
          ) : (
            <div className="space-y-2 pb-6">
              {entries?.map((entry) => (
                <div
                  key={entry._id}
                  className="rounded-lg border border-border bg-muted/30 p-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {entry.title}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground ml-auto">
                      {format(new Date(entry.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
