'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Play } from 'lucide-react';

const videoContent = [
  {
    title: 'DevOps Fundamentals',
    description: 'Complete guide to modern DevOps practices and tools',
    views: '12.5K',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
  },
  {
    title: 'Kubernetes in Production',
    description: 'Deep dive into deploying and managing Kubernetes clusters',
    views: '8.3K',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=500&h=300&fit=crop',
  },
  {
    title: 'Infrastructure as Code',
    description: 'Best practices for managing infrastructure with code',
    views: '6.8K',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
  },
];

export default function CreativeContent() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      id="creative"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Youtube size={32} className="text-primary" />
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Creative Side
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Educational content exploring DevOps, cloud infrastructure, and software engineering
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {videoContent.map((video, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-xs font-medium text-foreground">
                  {video.views} views
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-muted-foreground text-sm">{video.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
          >
            <Youtube size={20} />
            Subscribe to Channel
          </a>
        </motion.div>
      </div>
    </section>
  );
}
