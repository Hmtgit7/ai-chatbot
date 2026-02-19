import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "@/lib/api/chat.api";
import { toast } from "sonner";

export const SESSION_KEYS = {
  all: ["sessions"] as const,
  messages: (sessionId: string) => ["sessions", sessionId, "messages"] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: SESSION_KEYS.all,
    queryFn: chatApi.getSessions,
    staleTime: 30_000,
  });
}

export function useSessionMessages(sessionId: string | null) {
  return useQuery({
    queryKey: SESSION_KEYS.messages(sessionId ?? ""),
    queryFn: () => chatApi.getSessionMessages(sessionId!),
    enabled: !!sessionId,
    staleTime: 0,
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatApi.deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.all });
      toast.success("Chat deleted");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
