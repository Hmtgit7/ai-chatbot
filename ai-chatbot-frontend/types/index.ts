export interface Message {
  _id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface ChatSession {
  _id: string;
  sessionId: string;
  title: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Knowledge {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface SendMessagePayload {
  message: string;
  sessionId?: string;
}

export interface SendMessageResponse {
  success: boolean;
  sessionId: string;
  reply: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
