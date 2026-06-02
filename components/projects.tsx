'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import { title } from 'process';

const projects = [
  {
    title: 'Enterprise News Platform & Custom CMS',
    description:
      'Architected a high-performance news platform using Next.js with Static Site Generation (SSG) for optimal SEO and sub-second load times. Developed a custom NestJS backend that enables journalists to manage complex content types like reels and interactive games.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'GitLab CI/CD'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://lopinion.ma/fr',
  },
  {
    title: 'IG & Tiktok & YouTube Shorts Automation Suite',
    description:
      'Engineered a robust Python-based automation tool using Selenium to streamline content distribution. Implemented advanced techniques to bypass anti-bot measures and handle complex web-driver interactions for automated scheduling.',
    tags: ['Python', 'Selenium', 'Web Scraping', 'Automation'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://hicham-belhoucin.vercel.app',
  },
  {
    title: 'Valoris Website & CMS & Client Portal',
    description:
      'Architected a bilingual (FR/EN) financial platform focusing on secure data handling. Integrated 3D web-graphics for branding and developed a custom document management system with a focus on data integrity and RBAC.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Data Architecture', 'RBAC'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://valoris-management.vercel.app/',
  },
  {
    title: "eFootball Automation Suite",
    description: "Growth & Automation: Scaled a YouTube channel to 1,270+ subscribers by automating the multimedia pipeline.",
    tags: ['Python', 'Selenium', 'Web Scraping', 'Automation', 'ffmpeg', 'remotion'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://hicham-belhoucin.vercel.app',
  }
];

export default function Projects() {
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
      id="projects"
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
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of projects showcasing my technical expertise
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-6 rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github size={18} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View live"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm">Live</span>
                  </a>
                </div>
              </div>

              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
