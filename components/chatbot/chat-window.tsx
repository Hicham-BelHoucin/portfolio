'use client';

import React, { useEffect, useRef } from 'react';
import { MessageBubble, TypingIndicator } from './message-bubble';
import type { Message } from './message-bubble';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  streamingId: string | null;
  onStreamDone: () => void;
}

export function ChatWindow({ messages, isTyping, streamingId, onStreamDone }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="chat-window" id="chat-window">
      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onStreamDone={msg.id === streamingId ? onStreamDone : undefined}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
