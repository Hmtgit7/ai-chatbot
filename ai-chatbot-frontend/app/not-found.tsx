import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BotMessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center p-6">
      <BotMessageSquare className="h-12 w-12 text-muted-foreground" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
      <Button asChild>
        <Link href="/chat">Back to Chat</Link>
      </Button>
    </div>
  );
}
