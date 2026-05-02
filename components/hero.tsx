'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div
        className="text-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl sm:text-7xl font-bold text-foreground mb-6 text-balance">
            Hicham Bel Houcin
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 text-balance">
            Full-Stack Engineer based in Casablanca
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-12 text-balance">
            I am a results-oriented Full-Stack Engineer who bridges the gap between complex backend architecture and high-performance frontend delivery. Currently a student at 1337 Coding School, I specialize in building SEO-driven platforms with Next.js and scalable microservices with NestJS. My approach emphasizes full product ownership, from configuring secure VPS environments to automating deployment workflows via CI/CD.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-muted-foreground" size={24} />
      </motion.div>
    </section>
  );
}
