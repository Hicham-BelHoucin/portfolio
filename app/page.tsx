'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import TechStack from '@/components/tech-stack';
import Projects from '@/components/projects';
import Labs from '@/components/labs';
import Experience from '@/components/experience';
import Contact from '@/components/contact';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
      <Labs />
      <Experience />
      <Contact />
    </main>
  );
}
