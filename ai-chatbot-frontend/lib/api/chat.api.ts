import api from "@/lib/api";
import type {
  ApiResponse,
  ChatSession,
  Message,
  SendMessagePayload,
  SendMessageResponse,
} from "@/types";

export const chatApi = {
  sendMessage: async (
    payload: SendMessagePayload,
  ): Promise<SendMessageResponse> => {
    const { data } = await api.post<SendMessageResponse>(
      "/api/messages",
      payload,
    );
    return data;
  },

  getSessions: async (): Promise<ChatSession[]> => {
    const { data } = await api.get<ApiResponse<ChatSession[]>>("/api/sessions");
    return data.data;
  },

  getSessionMessages: async (sessionId: string): Promise<Message[]> => {
    const { data } = await api.get<ApiResponse<Message[]>>(
      `/api/sessions/${sessionId}/messages`,
    );
    return data.data;
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await api.delete(`/api/sessions/${sessionId}`);
  },
};
