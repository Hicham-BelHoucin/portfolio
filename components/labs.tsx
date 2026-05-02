'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Beaker, ArrowRight, Github } from 'lucide-react';

const labsContent = [
  {
    title: 'Self-Hosted Automation Engine (n8n)',
    description: 'A self-hosted n8n instance leveraging Docker and LLM integration to automate the end-to-end media lifecycle. The system manages video deployment across social platforms, using AI agents to dynamically generate SEO-optimized titles, metadata, and contextual hashtags.',
    tag: 'DevOps & AI & RSS FEED',
  },
  {
    title: 'Cloud-1',
    description: 'A cloud infrastructure project focused on automated deployment of scalable WordPress environments using AWS. Orchestrated via Ansible and Docker to manage domain routing and SSL certificate provisioning.',
    tag: 'DevOps & Cloud',
  },
  {
    title: 'ft_transcendence',
    description: 'An all-in-one SPA featuring a real-time Pong game, JWT/2FA security, and a sophisticated matchmaking system.',
    tag: 'Full-Stack',
  },
  {
    title: 'Inception-of-Things',
    description: 'Automated Kubernetes orchestration using K3s and K3d within virtualized Vagrant environments.',
    tag: 'DevOps',
  },
  {
    title: 'Websrv',
    description: 'A custom HTTP/1.1 server built from scratch in C++ to explore the low-level mechanics of network protocols.',
    tag: 'Systems',
  },
  {
    title: 'ft_containers',
    description: 'Re-implementing C++ Standard Template Library (STL) containers to master data structure memory management.',
    tag: 'C++',
  },
  {
    title: 'Cub3d',
    description: 'A dynamic 3D ray-casting engine inspired by 90s FPS games, exploring graphic rendering logic in C.',
    tag: 'Graphics',
  }
];

export default function Labs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="labs"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Beaker size={32} className="text-primary" />
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Labs & Experiments
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Technical side-interests, ongoing research, and proof-of-concept projects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {labsContent.map((lab, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-6 rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300 flex flex-col h-full cursor-default"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Beaker size={24} />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {lab.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors mt-auto">
                {lab.title}
              </h3>
              <p className="text-muted-foreground text-sm flex-grow">
                {lab.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Hicham-BelHoucin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
          >
            <Github size={20} />
            View Experiments on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
