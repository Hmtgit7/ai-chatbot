"use client";

import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import type { Message } from "@/types";
import { BotMessageSquare } from "lucide-react";

interface Props {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
}

export function ChatWindow({ messages, isLoading, isTyping }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  if (isLoading) {
    return (
      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {[64, 48, 72, 56].map((w, i) => (
          <div
            key={i}
            className={`flex gap-3 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <Skeleton
              className={`h-12 rounded-2xl w-${w === 64 ? "64" : w === 48 ? "48" : w === 72 ? "72" : "56"}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex flex-col gap-4 px-4 py-6 max-w-3xl mx-auto w-full min-h-full">
        {messages.length === 0 && !isTyping && (
          <div className="flex flex-col items-center justify-center flex-1 py-24 text-center gap-3">
            <BotMessageSquare className="h-10 w-10 text-muted-foreground/40" />
            <p className="text-muted-foreground text-sm">
              No messages yet — say hello!
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
