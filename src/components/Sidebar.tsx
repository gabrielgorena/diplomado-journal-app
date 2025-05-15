"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  onClose: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  // TODO : Add recent chats
  const recentChats = [
    { id: 6, title: "Finance" },
    { id: 7, title: "Sports" },
    { id: 8, title: "Health" },
  ]

  return (
    <div className="w-64 h-full bg-zinc-800 border-r border-zinc-700 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-zinc-700">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
          </div>
          <span className="font-medium">My Chats</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">

          <div>
            <div className="flex items-center justify-between px-2 py-1 text-xs font-medium text-zinc-400 uppercase">
              <span>Chats</span>
            </div>

            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center px-2 py-2 text-sm hover:bg-zinc-700 rounded cursor-pointer"
              >
                <MessageSquare size={16} className="mr-2 text-zinc-400" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{chat.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

    </div>
  )
}
