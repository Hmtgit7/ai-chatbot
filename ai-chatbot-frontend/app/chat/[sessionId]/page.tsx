import { ChatPageClient } from "@/components/chat/chat-page-client";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default async function ChatSessionPage({ params }: Props) {
  const { sessionId } = await params;
  return <ChatPageClient sessionId={sessionId} />;
}
