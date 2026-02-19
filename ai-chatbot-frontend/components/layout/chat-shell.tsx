"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function ChatShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <Header title={title} />
        {children}
      </div>
    </div>
  );
}
