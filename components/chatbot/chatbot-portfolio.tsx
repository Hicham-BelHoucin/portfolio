'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Menu, Bot, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { Sidebar } from '@/components/chatbot/sidebar';
import { ChatWindow } from '@/components/chatbot/chat-window';
import { InputBar } from '@/components/chatbot/input-bar';
import { generateResponse, STARTER_SUGGESTIONS } from '@/lib/bot-engine';
import type { ConversationContext } from '@/lib/bot-engine';
import type { Message } from '@/components/chatbot/message-bubble';

interface ChatAPIMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ONBOARDING_SUGGESTIONS = [
  '💼 I am a Recruiter',
  '🛠️ I am a Developer / Tech Lead',
  '👋 Just exploring',
];

const WELCOME_RESPONSE = {
  type: 'text' as const,
  text: "Hey! 👋 I'm **Hicham Bel Houcin** — a Full-Stack Engineer based in Casablanca.\n\nThink of this as an interactive agent representing my career. To tailor your experience, what brings you here today?",
  suggestions: ONBOARDING_SUGGESTIONS,
};

// ─── Stream reader ────────────────────────────────────────────────────────────

async function readAIStream(
  response: Response,
  onChunk: (text: string) => void
): Promise<{ fullText: string; suggestions: string[] }> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let fullText = '';
  let suggestions: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    for (const line of decoder.decode(value, { stream: true }).split('\n')) {
      if (line.startsWith('0:')) {
        try {
          const text = JSON.parse(line.slice(2));
          if (typeof text === 'string') { fullText += text; onChunk(text); }
        } catch { /* skip */ }
      } else if (line.startsWith('s:')) {
        try {
          const parsed = JSON.parse(line.slice(2));
          if (Array.isArray(parsed)) suggestions = parsed;
        } catch { /* skip */ }
      }
    }
  }

  return { fullText, suggestions };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatbotPortfolio() {
  const [messages, setMessages] = useState<Message[]>([{
    id: 'welcome', role: 'bot', response: WELCOME_RESPONSE, isStreaming: true,
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>('welcome');
  const [suggestions, setSuggestions] = useState<string[]>(ONBOARDING_SUGGESTIONS);
  const [context, setContext] = useState<ConversationContext>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [aiMode, setAiMode] = useState<'ai' | 'local' | 'unknown'>('unknown');
  const historyRef = useRef<ChatAPIMessage[]>([]);

  const handleStreamDone = useCallback(() => setStreamingId(null), []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || streamingId !== null || isTyping) return;

    setHasStarted(true);
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    setMessages(prev => [...prev, { id: userMsgId, role: 'user', userText: text }]);
    setSuggestions([]);
    setIsTyping(true);
    historyRef.current.push({ role: 'user', content: text });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyRef.current }),
      });
      if (res.status === 429) {
        throw new Error('RATE_LIMIT');
      }
      if (!res.ok) throw new Error(`API error ${res.status}`);

      setAiMode('ai');
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: botMsgId, role: 'bot',
        response: { type: 'text', text: '', suggestions: [] },
        isStreaming: false,
      }]);
      setStreamingId(botMsgId);

      let fullText = '';
      const { fullText: streamed, suggestions: aiSuggestions } = await readAIStream(res, chunk => {
        fullText += chunk;
        setMessages(prev => prev.map(m =>
          m.id === botMsgId
            ? { ...m, response: { type: 'text', text: fullText, suggestions: [] } }
            : m
        ));
      });

      historyRef.current.push({ role: 'assistant', content: streamed });
      setSuggestions(aiSuggestions.length > 0 ? aiSuggestions : STARTER_SUGGESTIONS);
      setStreamingId(null);
    } catch (err) {
      if (err instanceof Error && err.message === 'RATE_LIMIT') {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: botMsgId,
          role: 'bot',
          response: {
            type: 'text',
            text: "⚠️ **Rate Limit Exceeded:** OpenAI API tokens don't grow on trees! 🌳 Please wait a minute before trying again.",
            suggestions: ["How can I contact you?", "What's your tech stack?"]
          },
          isStreaming: false
        }]);
        setSuggestions(["How can I contact you?", "What's your tech stack?"]);
        setStreamingId(null);
        return;
      }

      console.warn('OpenAI unavailable, falling back:', err);
      setAiMode('local');
      const { response, updatedCtx } = generateResponse(text, context);
      setContext(updatedCtx);
      setIsTyping(false);
      setSuggestions(response.suggestions ?? []);
      historyRef.current.push({ role: 'assistant', content: response.text });
      setMessages(prev => [...prev, { id: botMsgId, role: 'bot', response, isStreaming: true }]);
      setStreamingId(botMsgId);
    }
  }, [context, isTyping, streamingId]);

  return (
    <div className="chatbot-root">
      <Sidebar onQuery={sendMessage} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="chatbot-main">
        <header className="chatbot-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu" id="menu-btn">
            <Menu size={20} />
          </button>
          <div className="header-brand">
            <div className="header-logo"><Bot size={18} /></div>
            <span className="header-title">Hicham AI</span>
            <span className="header-badge"><Sparkles size={10} /> GPT-4o-mini</span>
          </div>
          <div className="header-spacer" />
          {aiMode !== 'unknown' && (
            <div className={`ai-mode-badge ${aiMode === 'ai' ? 'ai-mode-live' : 'ai-mode-local'}`}>
              {aiMode === 'ai' ? <Wifi size={11} /> : <WifiOff size={11} />}
              {aiMode === 'ai' ? 'AI Live' : 'Offline Mode'}
            </div>
          )}
        </header>

        {!hasStarted && (
          <div className="landing-hero">
            <div className="landing-logo"><Bot size={32} /></div>
            <h1 className="landing-title">Hicham&apos;s Portfolio AI</h1>
            <p className="landing-subtitle">
              Powered by GPT-4o-mini — ask me anything about Hicham&apos;s projects, experience, tech stack, or how to hire him.
            </p>
          </div>
        )}

        <ChatWindow messages={messages} isTyping={isTyping} streamingId={streamingId} onStreamDone={handleStreamDone} />
        <InputBar onSend={sendMessage} suggestions={suggestions} disabled={streamingId !== null || isTyping} />
      </div>
    </div>
  );
}
