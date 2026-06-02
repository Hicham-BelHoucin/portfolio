'use client';

import { useEffect, useState } from 'react';
import ChatbotPortfolio from '@/components/chatbot/chatbot-portfolio';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ChatbotPortfolio />;
}
