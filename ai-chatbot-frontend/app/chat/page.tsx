// src/app/chat/page.tsx  (CLEAN VERSION — use this)
"use client";

import { ChatShell } from "@/components/layout/chat-shell";
import { ChatInput } from "@/components/chat/chat-input";
import { useChat } from "@/hooks/use-chat";
import { BotMessageSquare, Sparkles, BookOpen, Zap } from "lucide-react";

const SUGGESTIONS = [
  { icon: Sparkles, text: "What are your pricing plans?" },
  { icon: BookOpen, text: "Tell me about your services." },
  { icon: Zap, text: "How do I get started?" },
];

export default function ChatIndexPage() {
  const { sendMessage, isLoading } = useChat(null);

  return (
    <ChatShell>
      <div className="flex flex-1 flex-col min-h-0">
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
            <BotMessageSquare className="h-10 w-10 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
            <p className="text-muted-foreground text-sm max-w-md">
              Ask me anything. I'm powered by GPT-4o-mini and can use your
              custom knowledge base to give accurate answers.
            </p>
          </div>

          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 justify-center max-w-lg">
            {SUGGESTIONS.map(({ icon: Icon, text }) => (
              <button
                key={text}
                onClick={() => sendMessage(text)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-muted/50 hover:bg-accent text-sm transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                {text}
              </button>
            ))}
          </div>
        </div>

        {/* Input pinned at bottom */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </ChatShell>
  );
}
