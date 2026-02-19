"use client";

import { useChatStore } from "@/store/chat-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PanelLeft, BotMessageSquare } from "lucide-react";

interface Props {
  title?: string;
}

export function Header({ title }: Props) {
  const { sidebarOpen, setSidebarOpen } = useChatStore();

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(true)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
        <BotMessageSquare className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold truncate max-w-[200px]">
          {title ?? "AI Chatbot"}
        </span>
      </div>
      <ThemeToggle />
    </header>
  );
}
