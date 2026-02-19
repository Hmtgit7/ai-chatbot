"use client";

import { useRouter, useParams } from "next/navigation";
import { useSessions, useDeleteSession } from "@/hooks/use-sessions";
import { useChatStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  MessageSquarePlus,
  MoreVertical,
  Trash2,
  BotMessageSquare,
  PanelLeftClose,
  BookOpen,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { KnowledgePanel } from "@/components/knowledge/knowledge-panel";

export function Sidebar() {
  const router = useRouter();
  const params = useParams();
  const activeSessionId = params?.sessionId as string | undefined;
  const { sidebarOpen, setSidebarOpen } = useChatStore();
  const { data: sessions, isLoading } = useSessions();
  const { mutate: deleteSession } = useDeleteSession();
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  const handleNewChat = () => router.push("/chat");

  if (!sidebarOpen) return null;

  return (
    <>
      <aside className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <BotMessageSquare className="h-5 w-5 text-primary" />
            AI Chatbot
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSidebarOpen(false)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            className="w-full justify-start gap-2"
            variant="outline"
            onClick={handleNewChat}
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        <Separator />

        {/* Session List */}
        <ScrollArea className="flex-1 px-2 py-2">
          {isLoading ? (
            <div className="space-y-1.5 px-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>
          ) : sessions?.length === 0 ? (
            <p className="px-3 py-4 text-xs text-muted-foreground text-center">
              No chats yet. Start one above!
            </p>
          ) : (
            <div className="space-y-0.5">
              {sessions?.map((session) => (
                <div
                  key={session.sessionId}
                  className={cn(
                    "group flex items-center gap-1 rounded-md px-2 py-2 cursor-pointer hover:bg-accent transition-colors",
                    activeSessionId === session.sessionId && "bg-accent",
                  )}
                  onClick={() => router.push(`/chat/${session.sessionId}`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium leading-tight">
                      {session.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(session.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.sessionId);
                          if (activeSessionId === session.sessionId) {
                            router.push("/chat");
                          }
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        {/* Knowledge Base Button */}
        <div className="p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setKnowledgeOpen(true)}
          >
            <BookOpen className="h-4 w-4" />
            Knowledge Base
          </Button>
        </div>
      </aside>

      <KnowledgePanel
        open={knowledgeOpen}
        onClose={() => setKnowledgeOpen(false)}
      />
    </>
  );
}
