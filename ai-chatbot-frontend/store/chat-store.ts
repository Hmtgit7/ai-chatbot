import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Message, ChatSession } from "@/types";

interface ChatStore {
  // Active session
  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;

  // Optimistic messages (before server confirms)
  optimisticMessages: Record<string, Message[]>;
  addOptimisticMessage: (sessionId: string, message: Message) => void;
  clearOptimisticMessages: (sessionId: string) => void;

  // Session list cache
  sessions: ChatSession[];
  setSessions: (sessions: ChatSession[]) => void;

  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      activeSessionId: null,
      setActiveSessionId: (id) => set({ activeSessionId: id }),

      optimisticMessages: {},
      addOptimisticMessage: (sessionId, message) =>
        set((state) => ({
          optimisticMessages: {
            ...state.optimisticMessages,
            [sessionId]: [
              ...(state.optimisticMessages[sessionId] ?? []),
              message,
            ],
          },
        })),
      clearOptimisticMessages: (sessionId) =>
        set((state) => {
          const updated = { ...state.optimisticMessages };
          delete updated[sessionId];
          return { optimisticMessages: updated };
        }),

      sessions: [],
      setSessions: (sessions) => set({ sessions }),

      sidebarOpen: true,
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: "chat-store",
      partialize: (s) => ({ activeSessionId: s.activeSessionId }),
    },
  ),
);
