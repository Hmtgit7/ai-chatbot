"use client";

import { ChatShell } from "@/components/layout/chat-shell";
import { ChatWindow } from "./chat-window";
import { ChatInput } from "./chat-input";
import { useChat } from "@/hooks/use-chat";
import { useSessionMessages, useSessions } from "@/hooks/use-sessions";
import { useChatStore } from "@/store/chat-store";

interface Props {
  sessionId: string;
}

export function ChatPageClient({ sessionId }: Props) {
  const { data: messages, isLoading } = useSessionMessages(sessionId);
  const { data: sessions } = useSessions();
  const { sendMessage, isLoading: isSending } = useChat(sessionId);
  const { optimisticMessages } = useChatStore();

  const optimistic = optimisticMessages[sessionId] ?? [];
  const allMessages = [...(messages ?? []), ...optimistic];

  const session = sessions?.find((s) => s.sessionId === sessionId);

  return (
    <ChatShell title={session?.title ?? "Chat"}>
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <ChatWindow
          messages={allMessages}
          isLoading={isLoading}
          isTyping={isSending}
        />
        <ChatInput onSend={sendMessage} disabled={isSending} />
      </div>
    </ChatShell>
  );
}
