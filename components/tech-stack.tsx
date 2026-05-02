'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const technologies = [
  'TypeScript',
  'Next.js (SSG/ISR)',
  'NestJS',
  'Node.js',
  'Python',
  'Docker',
  'PostgreSQL',
  'GitLab CI/CD',
  'VPS Management',
  'Ansible',
  'n8n',
  'Redis',
  'Prisma',
  'Shell Scripting',
  'Linux',
  'Remotion',
];

export default function TechStack() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-center mb-4">
            Tech Stack
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech}
              variants={itemVariants}
              className="group relative"
            >
              <div className="p-4 rounded-lg border border-border bg-card hover:bg-secondary transition-colors duration-300 text-center cursor-default">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {tech}
                </p>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
