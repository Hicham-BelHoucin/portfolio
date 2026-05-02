'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const contactLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Hicham-BelHoucin',
    color: 'hover:text-foreground',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hicham-bel-houcin/',
    color: 'hover:text-primary',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'belhoucin.hicham@gmail.com',
    color: 'hover:text-primary',
  },
];

export default function Contact() {
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
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new projects and opportunities. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row justify-center gap-8 items-center mb-16"
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                variants={itemVariants}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300 ${link.color}`}
              >
                <Icon size={20} className="transition-transform group-hover:scale-110" />
                <span className="font-medium">{link.label}</span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"
                />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-sm">
            © 2026 Hicham Bel Houcin. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
