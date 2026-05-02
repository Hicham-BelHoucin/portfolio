'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

const experience = [
  {
    role: 'Full-Stack Engineer',
    company: 'Disrupt',
    period: 'Nov 2024 - Present',
    description: 'Took full technical ownership of a large-scale online newspaper platform, focusing on high-availability and SEO optimization.',
    highlights: [
      'Engineered a custom CMS using NestJS and Prisma, enabling seamless management of articles, reels, and interactive content.',
      'Implemented Static Site Generation (SSG) with Next.js to deliver ultra-fast load times and maximize search engine visibility.',
      'Architected and managed end-to-end deployments on VPS environments using GitLab CI/CD pipelines for automated testing and delivery.',
    ],
  },
  {
    role: 'Front-End Developer & WordPress Specialist',
    company: 'Remote / Freelance',
    period: 'Jul 2024 - Oct 2024',
    description: 'Designed and modernized digital presence for non-profit organizations with a focus on engagement and performance.',
    highlights: [
      'Developed responsive landing pages incorporating donation systems and volunteer engagement features.',
      'Managed complex WordPress migrations, modernizing UI/UX while improving site stability and loading speeds.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'High Tech Vision',
    period: 'Nov 2023 - May 2024',
    description: 'Contributed to the development of secure administrative systems and media playback features.',
    highlights: [
      'Built a full administrative back-office for efficient platform monitoring and content management.',
      'Integrated support ticketing systems to streamline communication between technical teams and users.',
      'Developed secure authentication protocols to ensure a reliable and safe user experience.',
    ],
  },
  {
    role: 'Student & Developer',
    company: '1337 Coding School (42 Network)',
    period: '2021 - Expected 2027',
    description: 'Pursuing RNCP Level 6 in Application Development through an intensive, peer-driven pedagogical model.',
    highlights: [
      'Mastered low-level programming and system architecture using C and C++.',
      'Validated major full-stack projects involving distributed systems, web scraping, and microservices.',
      'Developed a strong foundation in DevOps, including Docker containerization and network configuration.',
    ],
  },
];

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            A timeline of my professional growth and technical achievements
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {experience.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-6 sm:-left-8 top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-4 border-background" />

              {/* Timeline line */}
              {index < experience.length - 1 && (
                <div className="absolute -left-4 sm:-left-6 top-10 w-0.5 h-32 bg-gradient-to-b from-primary to-primary/20" />
              )}

              <div className="ml-4 sm:ml-8 p-6 rounded-lg border border-border bg-card hover:bg-secondary transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-primary font-medium">{item.company}</p>
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{item.description}</p>

                <ul className="space-y-2">
                  {item.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-muted-foreground text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
