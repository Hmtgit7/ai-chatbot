"use client";

import { cn } from "@/lib/utils";
import type { Message } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { BotMessageSquare, User } from "lucide-react";

interface Props {
  message: Message;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-2.5 items-end group",
        isUser && "flex-row-reverse",
      )}
    >
      {/* Avatar */}
      <Avatar className="h-7 w-7 shrink-0 mb-0.5">
        <AvatarFallback
          className={cn(
            "text-xs",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground",
          )}
        >
          {isUser ? (
            <User className="h-3.5 w-3.5" />
          ) : (
            <BotMessageSquare className="h-3.5 w-3.5" />
          )}
        </AvatarFallback>
      </Avatar>

      {/* Bubble + timestamp */}
      <div
        className={cn("flex flex-col gap-1 max-w-[78%]", isUser && "items-end")}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none border border-border/50",
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground px-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {format(new Date(message.createdAt), "h:mm a")}
        </span>
      </div>
    </div>
  );
}
