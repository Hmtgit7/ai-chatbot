import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  knowledgeApi,
  type CreateKnowledgePayload,
} from "@/lib/api/knowledge.api";
import { toast } from "sonner";

export const KNOWLEDGE_KEYS = {
  all: ["knowledge"] as const,
};

export function useKnowledge() {
  return useQuery({
    queryKey: KNOWLEDGE_KEYS.all,
    queryFn: knowledgeApi.getAll,
    staleTime: 60_000,
  });
}

export function useCreateKnowledge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateKnowledgePayload) =>
      knowledgeApi.create(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: KNOWLEDGE_KEYS.all });
      toast.success(`Knowledge "${data.title}" added!`);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
