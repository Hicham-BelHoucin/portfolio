'use client';

import { useEffect, useState } from 'react';
import ChatbotPortfolio from '@/components/chatbot/chatbot-portfolio';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Labs from '@/components/labs';
import Experience from '@/components/experience';
import TechStack from '@/components/tech-stack';
import Contact from '@/components/contact';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'static'>('chat');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen">
      {viewMode === 'chat' ? (
        <ChatbotPortfolio />
      ) : (
        <div className="relative bg-background text-foreground scroll-smooth pb-20">
          <Navbar />
          <Hero />
          <Projects />
          <Labs />
          <Experience />
          <TechStack />
          <Contact />
        </div>
      )}

      {/* Floating View Switcher Button visible at all times */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => setViewMode(prev => prev === 'chat' ? 'static' : 'chat')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/85 backdrop-blur-md border border-violet-500/30 text-violet-300 font-semibold text-sm shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:border-violet-500/60 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
          aria-label="Switch portfolio view"
        >
          {viewMode === 'chat' ? (
            <>
              <span className="text-base">📄</span>
              <span>Classic View</span>
            </>
          ) : (
            <>
              <span className="text-base">🤖</span>
              <span>AI Agent View</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
