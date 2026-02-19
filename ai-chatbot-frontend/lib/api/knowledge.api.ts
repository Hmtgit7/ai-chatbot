import api from "@/lib/api";
import type { ApiResponse, Knowledge } from "@/types";

export interface CreateKnowledgePayload {
  title: string;
  content: string;
}

export const knowledgeApi = {
  create: async (payload: CreateKnowledgePayload): Promise<Knowledge> => {
    const { data } = await api.post<ApiResponse<Knowledge>>(
      "/api/knowledge",
      payload,
    );
    return data.data;
  },

  getAll: async (): Promise<Knowledge[]> => {
    const { data } = await api.get<ApiResponse<Knowledge[]>>("/api/knowledge");
    return data.data;
  },
};
