"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Type a message… (Enter to send, Shift+Enter for new line)"
          disabled={disabled}
          rows={1}
          className={cn(
            "resize-none min-h-[44px] max-h-40 flex-1 rounded-xl",
            "scrollbar-thin transition-all duration-150",
          )}
        />
        <Button
          size="icon"
          className="h-11 w-11 rounded-xl shrink-0"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-center text-[10px] text-muted-foreground mt-2">
        AI can make mistakes. Use knowledge base for accurate answers.
      </p>
    </div>
  );
}
