import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat.api";
import { useChatStore } from "@/store/chat-store";
import { SESSION_KEYS } from "./use-sessions";
import type { Message } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useChat(sessionId: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { addOptimisticMessage, clearOptimisticMessages } = useChatStore();

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);

    // Optimistic user message
    const tempUserMsg: Message = {
      _id: `temp-user-${Date.now()}`,
      sessionId: sessionId ?? "new",
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    const currentSessionId = sessionId ?? "new";
    addOptimisticMessage(currentSessionId, tempUserMsg);

    try {
      const response = await chatApi.sendMessage({
        message: content,
        sessionId: sessionId ?? undefined,
      });

      // Clear optimistic messages — real data will come from query
      clearOptimisticMessages(currentSessionId);

      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: SESSION_KEYS.all });
      await queryClient.invalidateQueries({
        queryKey: SESSION_KEYS.messages(response.sessionId),
      });

      // Navigate to session if newly created
      if (!sessionId) {
        router.push(`/chat/${response.sessionId}`);
      }
    } catch (err) {
      clearOptimisticMessages(currentSessionId);
      toast.error((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}
