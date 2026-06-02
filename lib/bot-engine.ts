// ─── Data ────────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: 'news-platform',
    title: 'Enterprise News Platform & Custom CMS',
    description:
      'Architected a high-performance news platform using Next.js with Static Site Generation (SSG) for optimal SEO and sub-second load times. Developed a custom NestJS backend enabling journalists to manage complex content types like reels and interactive games.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'GitLab CI/CD'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://lopinion.ma/fr',
  },
  {
    id: 'social-automation',
    title: 'IG & TikTok & YouTube Shorts Automation Suite',
    description:
      'Engineered a robust Python-based automation tool using Selenium to streamline content distribution across social platforms. Implemented advanced techniques to bypass anti-bot measures and handle complex web-driver interactions for automated scheduling.',
    tags: ['Python', 'Selenium', 'Web Scraping', 'Automation'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://hicham-belhoucin.vercel.app',
  },
  {
    id: 'valoris',
    title: 'Valoris Website & CMS & Client Portal',
    description:
      'Architected a bilingual (FR/EN) financial platform focusing on secure data handling. Integrated 3D web-graphics for branding and developed a custom document management system with RBAC.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Data Architecture', 'RBAC'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://valoris-management.vercel.app/',
  },
  {
    id: 'efootball',
    title: 'eFootball Automation Suite',
    description:
      'Scaled a YouTube channel to 1,270+ subscribers by automating the entire multimedia pipeline — from content generation to upload scheduling using Python and ffmpeg.',
    tags: ['Python', 'Selenium', 'Web Scraping', 'ffmpeg', 'Remotion'],
    github: 'https://github.com/Hicham-BelHoucin',
    live: 'https://hicham-belhoucin.vercel.app',
  },
];

export const EXPERIENCE = [
  {
    id: 'disrupt',
    role: 'Full-Stack Engineer',
    company: 'Disrupt',
    period: 'Nov 2024 – Present',
    description:
      'Took full technical ownership of a large-scale online newspaper platform, focusing on high-availability and SEO optimization.',
    highlights: [
      'Engineered a custom CMS using NestJS and Prisma for seamless management of articles, reels, and interactive content.',
      'Implemented Static Site Generation (SSG) with Next.js for ultra-fast load times and maximum search engine visibility.',
      'Architected end-to-end VPS deployments using GitLab CI/CD pipelines for automated testing and delivery.',
    ],
  },
  {
    id: 'freelance',
    role: 'Front-End Developer & WordPress Specialist',
    company: 'Remote / Freelance',
    period: 'Jul 2024 – Oct 2024',
    description:
      'Designed and modernized digital presence for non-profit organizations with a focus on engagement and performance.',
    highlights: [
      'Developed responsive landing pages with donation systems and volunteer engagement features.',
      'Managed complex WordPress migrations, modernizing UI/UX while improving site stability.',
    ],
  },
  {
    id: 'htv',
    role: 'Full Stack Developer Intern',
    company: 'High Tech Vision',
    period: 'Nov 2023 – May 2024',
    description:
      'Contributed to secure administrative systems and media playback features.',
    highlights: [
      'Built a full administrative back-office for platform monitoring and content management.',
      'Integrated support ticketing systems to streamline communication between teams and users.',
      'Developed secure authentication protocols for a reliable user experience.',
    ],
  },
  {
    id: '1337',
    role: 'Student & Developer',
    company: '1337 Coding School (42 Network)',
    period: '2021 – Expected 2027',
    description:
      'Pursuing RNCP Level 6 in Application Development through an intensive, peer-driven pedagogical model.',
    highlights: [
      'Mastered low-level programming and system architecture using C and C++.',
      'Validated major full-stack projects involving distributed systems, web scraping, and microservices.',
      'Developed a strong foundation in DevOps, including Docker containerization and network configuration.',
    ],
  },
];

export const TECH_STACK = [
  'TypeScript', 'Next.js (SSG/ISR)', 'NestJS', 'Node.js',
  'Python', 'Docker', 'PostgreSQL', 'GitLab CI/CD',
  'VPS Management', 'Ansible', 'n8n', 'Redis',
  'Prisma', 'Shell Scripting', 'Linux', 'Remotion',
];

export const LABS = [
  { title: 'Self-Hosted Automation Engine (n8n)', tag: 'DevOps & AI', description: 'Self-hosted n8n with Docker and LLM integration to automate the end-to-end media lifecycle across social platforms.' },
  { title: 'Cloud-1', tag: 'DevOps & Cloud', description: 'Automated deployment of scalable WordPress environments using AWS, Ansible, and Docker.' },
  { title: 'ft_transcendence', tag: 'Full-Stack', description: 'An all-in-one SPA featuring a real-time Pong game, JWT/2FA security, and a sophisticated matchmaking system.' },
  { title: 'Inception-of-Things', tag: 'DevOps', description: 'Automated Kubernetes orchestration using K3s and K3d within virtualized Vagrant environments.' },
  { title: 'Websrv', tag: 'Systems', description: 'A custom HTTP/1.1 server built from scratch in C++ to explore low-level network protocols.' },
  { title: 'ft_containers', tag: 'C++', description: 'Re-implementing C++ STL containers to master data structure memory management.' },
  { title: 'Cub3d', tag: 'Graphics', description: 'A dynamic 3D ray-casting engine inspired by 90s FPS games, built in C.' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type MessageContentType =
  | 'text'
  | 'projects'
  | 'single-project'
  | 'experience'
  | 'single-experience'
  | 'tech'
  | 'labs'
  | 'contact'
  | 'mixed';

export interface BotResponse {
  type: MessageContentType;
  text: string;
  payload?: unknown;
  suggestions?: string[];
}

export interface ConversationContext {
  lastTopic?: string;
  lastProjectsShown?: typeof PROJECTS;
  lastExperienceShown?: typeof EXPERIENCE;
  mentionedProjectIndex?: number;
  mentionedExperienceIndex?: number;
}

// ─── Intent Detection ─────────────────────────────────────────────────────────

type Intent =
  | 'recruiter-onboarding'
  | 'developer-onboarding'
  | 'visitor-onboarding'
  | 'greeting'
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'experience'
  | 'experience-detail'
  | 'tech'
  | 'labs'
  | 'contact'
  | 'ordinal-reference'
  | 'more-detail'
  | 'availability'
  | 'education'
  | 'location'
  | 'fallback';

function detectOrdinal(input: string): number | null {
  const patterns: [RegExp, number][] = [
    [/\b(first|1st|one|#1)\b/i, 0],
    [/\b(second|2nd|two|#2)\b/i, 1],
    [/\b(third|3rd|three|#3)\b/i, 2],
    [/\b(fourth|4th|four|#4)\b/i, 3],
    [/\b(fifth|5th|five|#5)\b/i, 4],
  ];
  for (const [pattern, index] of patterns) {
    if (pattern.test(input)) return index;
  }
  // number digit
  const numMatch = input.match(/\b(\d)\b/);
  if (numMatch) {
    const n = parseInt(numMatch[1]) - 1;
    if (n >= 0) return n;
  }
  return null;
}

function detectIntent(input: string, ctx: ConversationContext): Intent {
  const t = input.toLowerCase().trim();

  // Onboarding shortcuts
  if (t.includes('recruiter') || t.includes('hiring') || t.includes('💼')) {
    return 'recruiter-onboarding';
  }
  if (t.includes('developer') || t.includes('tech lead') || t.includes('🛠️')) {
    return 'developer-onboarding';
  }
  if (t.includes('exploring') || t.includes('just browsing') || t.includes('👋')) {
    return 'visitor-onboarding';
  }

  // Ordinal / follow-up reference
  const ordinal = detectOrdinal(t);
  if (ordinal !== null) {
    if (ctx.lastTopic === 'projects' && ctx.lastProjectsShown && ctx.lastProjectsShown[ordinal]) {
      return 'ordinal-reference';
    }
    if (ctx.lastTopic === 'experience' && ctx.lastExperienceShown && ctx.lastExperienceShown[ordinal]) {
      return 'ordinal-reference';
    }
  }

  // "tell me more" / "elaborate" follow-ups
  if (/\b(more|elaborate|detail|expand|tell me more|explain)\b/.test(t)) {
    return 'more-detail';
  }

  // Greeting
  if (/^(hi|hey|hello|sup|yo|howdy|greetings|good\s?(morning|afternoon|evening))/.test(t)) {
    return 'greeting';
  }

  // About
  if (/\b(who are you|about you|introduce|yourself|tell me about|bio|summary|overview)\b/.test(t)) {
    return 'about';
  }

  // Projects
  if (/\b(project|projects|work|portfolio|built|developed|created|show me)\b/.test(t)) {
    // Check for specific project name
    for (const p of PROJECTS) {
      if (t.includes(p.id) || t.includes(p.title.toLowerCase().substring(0, 10))) {
        return 'project-detail';
      }
    }
    return 'projects';
  }

  // Labs
  if (/\b(lab|labs|experiment|side.?project|research|proof.?of.?concept|42|1337)\b/.test(t)) {
    return 'labs';
  }

  // Experience
  if (/\b(experience|work history|career|job|company|companies|employer|employment|professional)\b/.test(t)) {
    return 'experience';
  }

  // Tech / Skills
  if (/\b(tech|stack|skill|skills|language|framework|tool|tools|technology|technologies|know|use|expertise)\b/.test(t)) {
    return 'tech';
  }

  // Contact
  if (/\b(contact|reach|email|github|linkedin|social|hire|connect|available|talk)\b/.test(t)) {
    return 'contact';
  }

  // Availability
  if (/\b(available|open to work|freelance|hire|opportunity|opportunities|looking)\b/.test(t)) {
    return 'availability';
  }

  // Education
  if (/\b(education|school|study|studies|degree|university|college|1337|42 network|rncp)\b/.test(t)) {
    return 'education';
  }

  // Location
  if (/\b(where|location|city|country|based|casablanca|morocco|remote)\b/.test(t)) {
    return 'location';
  }

  return 'fallback';
}

// ─── Response Generator ───────────────────────────────────────────────────────

export function generateResponse(
  userInput: string,
  ctx: ConversationContext
): { response: BotResponse; updatedCtx: ConversationContext } {
  const intent = detectIntent(userInput, ctx);
  let updatedCtx = { ...ctx };
  let response: BotResponse;

  switch (intent) {
    case 'recruiter-onboarding':
      response = {
        type: 'contact',
        text: "Welcome! 💼 Since you are hiring, let's cut to the chase:\n\n- **Role:** Full-Stack & DevOps Engineer (open to Remote / Casablanca roles)\n- **Education:** RNCP Level 6 application development @ 1337 Coding School (42 Network)\n- **Current Role:** Full-Stack Engineer at Disrupt (Next.js, NestJS, CI/CD)\n- **Resume:** [Download Hicham's Resume (PDF)](/hicham_belhoucin_resume.pdf)\n\nYou can book a direct interview, fill in the contact form below, or reach me at belhoucin.hicham@gmail.com. Let's build something great!",
        payload: {
          email: 'belhoucin.hicham@gmail.com',
          github: 'https://github.com/Hicham-BelHoucin',
          linkedin: 'https://www.linkedin.com/in/hicham-bel-houcin/',
        },
        suggestions: ['Show me your projects', 'What is your tech stack?', 'How can I contact you?'],
      };
      break;

    case 'developer-onboarding':
      response = {
        type: 'tech',
        text: "Hey fellow developer! 🛠️ If you're a Tech Lead or Developer, here's the tech-heavy summary:\n\n- Mastered low-level systems (C/C++) and Docker at **1337 Coding School** (42 network)\n- Core stack: Next.js (SSG/ISR), NestJS, Node.js, PostgreSQL, Docker, GitLab CI/CD\n- Passionate about VPS management, Ansible, and automated pipelines\n\nCheck out my tech stack pills below, explore my [Labs & Experiments](/api/chat?query=labs), or ask me about specific implementation details!",
        payload: TECH_STACK,
        suggestions: ['Show me your projects', 'Tell me about your experience', 'What are your Labs?'],
      };
      break;

    case 'visitor-onboarding':
      response = {
        type: 'text',
        text: "Thanks for dropping by! 👋 Think of me as a virtual portal to explore my work.\n\nFeel free to check out my projects, learn about my professional experience, or look at my experimental labs. What are you most interested in?",
        suggestions: ['Show me your projects', 'What\'s your experience?', 'What\'s your tech stack?'],
      };
      break;

    case 'greeting':
      response = {
        type: 'text',
        text: "Hey! 👋 I'm Hicham — a Full-Stack Engineer based in Casablanca. Think of me as a living portfolio you can actually talk to.\n\nAsk me anything — my projects, experience, tech stack, or how to get in touch. What are you curious about?",
        suggestions: ['Tell me about your projects', 'What\'s your experience?', 'What\'s your tech stack?', 'How can I contact you?'],
      };
      break;

    case 'about':
      response = {
        type: 'text',
        text: "I'm **Hicham Bel Houcin**, a results-oriented Full-Stack Engineer who bridges the gap between complex backend architecture and high-performance frontend delivery.\n\nCurrently a student at **1337 Coding School** (42 Network), I specialize in:\n- 🚀 **SEO-driven platforms** with Next.js (SSG/ISR)\n- ⚙️ **Scalable microservices** with NestJS\n- 🛠️ **Full DevOps ownership** — VPS setup, CI/CD pipelines, Docker\n- 🤖 **Automation** — Python, Selenium, n8n workflows\n\nI believe in owning products end-to-end, from writing the first line of code to managing production infrastructure.",
        suggestions: ['Show me your projects', 'What companies have you worked at?', 'What\'s your tech stack?'],
      };
      updatedCtx.lastTopic = 'about';
      break;

    case 'projects': {
      const shown = PROJECTS;
      updatedCtx.lastTopic = 'projects';
      updatedCtx.lastProjectsShown = shown;
      response = {
        type: 'projects',
        text: "Here are my featured projects 🚀 — ask me about any specific one for more details:",
        payload: shown,
        suggestions: ['Tell me about the first one', 'Tell me about the second one', 'Show me your experience instead'],
      };
      break;
    }

    case 'experience': {
      const shown = EXPERIENCE;
      updatedCtx.lastTopic = 'experience';
      updatedCtx.lastExperienceShown = shown;
      response = {
        type: 'experience',
        text: "Here's my professional journey 💼 — ask me to elaborate on any role:",
        payload: shown,
        suggestions: ['Tell me more about Disrupt', 'Tell me about the first job', 'What\'s your tech stack?'],
      };
      break;
    }

    case 'ordinal-reference': {
      const ordinal = detectOrdinal(userInput.toLowerCase()) as number;
      if (ctx.lastTopic === 'projects' && ctx.lastProjectsShown) {
        const proj = ctx.lastProjectsShown[ordinal];
        updatedCtx.lastTopic = 'project-detail';
        updatedCtx.mentionedProjectIndex = ordinal;
        response = {
          type: 'single-project',
          text: `Here's a deep dive into **${proj.title}**:`,
          payload: proj,
          suggestions: ['Show all projects', 'What technologies did you use?', 'Tell me about another project'],
        };
      } else if (ctx.lastTopic === 'experience' && ctx.lastExperienceShown) {
        const exp = ctx.lastExperienceShown[ordinal];
        updatedCtx.lastTopic = 'experience-detail';
        updatedCtx.mentionedExperienceIndex = ordinal;
        response = {
          type: 'single-experience',
          text: `Let me tell you about my time at **${exp.company}**:`,
          payload: exp,
          suggestions: ['Show all experience', 'What did you build there?', 'What\'s your current role?'],
        };
      } else {
        response = fallbackResponse();
      }
      break;
    }

    case 'more-detail': {
      if (ctx.lastTopic === 'projects' && ctx.lastProjectsShown) {
        const proj = ctx.lastProjectsShown[ctx.mentionedProjectIndex ?? 0];
        response = {
          type: 'single-project',
          text: `Sure! Here's more on **${proj.title}**:`,
          payload: proj,
          suggestions: ['Show all projects', 'What about your experience?'],
        };
      } else if (ctx.lastTopic === 'experience' && ctx.lastExperienceShown) {
        const exp = ctx.lastExperienceShown[ctx.mentionedExperienceIndex ?? 0];
        response = {
          type: 'single-experience',
          text: `Diving deeper into **${exp.company}**:`,
          payload: exp,
          suggestions: ['Show all experience', 'What projects did you build?'],
        };
      } else if (ctx.lastTopic === 'about') {
        response = {
          type: 'text',
          text: "I'm passionate about the intersection of **software engineering and DevOps**. My workflow is always about full ownership — I don't just write features, I deploy them, monitor them, and optimize them.\n\nOutside of coding, I run automation experiments, contribute to open-source, and push the boundaries of what self-hosted tools can do.",
          suggestions: ['Show me your projects', 'What\'s your tech stack?'],
        };
      } else {
        response = fallbackResponse();
      }
      break;
    }

    case 'tech':
      updatedCtx.lastTopic = 'tech';
      response = {
        type: 'tech',
        text: "My core tech stack — the tools I reach for when building production-ready systems:",
        payload: TECH_STACK,
        suggestions: ['Show me projects using these', 'Tell me about your experience', 'How can I hire you?'],
      };
      break;

    case 'labs':
      updatedCtx.lastTopic = 'labs';
      response = {
        type: 'labs',
        text: "Beyond client work, I run a personal lab of experiments and 42 School projects 🧪:",
        payload: LABS,
        suggestions: ['Tell me about your experience', 'Show me your main projects', 'What\'s your tech stack?'],
      };
      break;

    case 'contact':
      updatedCtx.lastTopic = 'contact';
      response = {
        type: 'contact',
        text: "I'm always open to interesting conversations, new projects, or opportunities. Here's where you can find me 📬:",
        payload: {
          email: 'belhoucin.hicham@gmail.com',
          github: 'https://github.com/Hicham-BelHoucin',
          linkedin: 'https://www.linkedin.com/in/hicham-bel-houcin/',
        },
        suggestions: ['Tell me about your projects', 'What\'s your tech stack?'],
      };
      break;

    case 'availability':
      response = {
        type: 'text',
        text: "Yes, I'm **open to new opportunities**! I'm particularly interested in:\n- 🏢 Full-Stack or Backend Engineer roles\n- 🤝 Freelance / contract projects\n- 🌍 Remote-friendly positions\n\nFeel free to reach out directly — I respond quickly!",
        suggestions: ['How can I contact you?', 'What\'s your experience?', 'Show me your projects'],
      };
      updatedCtx.lastTopic = 'availability';
      break;

    case 'education':
      response = {
        type: 'text',
        text: "I'm currently enrolled at **1337 Coding School** (part of the 42 Network), pursuing a **RNCP Level 6** in Application Development — expected graduation in 2027.\n\n1337's pedagogy is project-based and peer-evaluated with no traditional teachers — everything is learned by doing and collaborating. It's shaped me into an engineer who thrives under ambiguity and complex problem spaces.",
        suggestions: ['What projects did you build there?', 'What\'s your tech stack?', 'Show me your experience'],
      };
      updatedCtx.lastTopic = 'education';
      break;

    case 'location':
      response = {
        type: 'text',
        text: "I'm based in **Casablanca, Morocco** 🇲🇦. I work remotely and am open to both local opportunities in Morocco and international remote roles.",
        suggestions: ['Are you available for hire?', 'How can I contact you?'],
      };
      break;

    default:
      response = fallbackResponse();
  }

  return { response, updatedCtx };
}

function fallbackResponse(): BotResponse {
  const fallbacks = [
    "Hmm, I'm not sure I caught that. Try asking about my **projects**, **experience**, **tech stack**, or **contact info**.",
    "I didn't quite understand that — but you can ask me about my work, skills, or how to reach me!",
    "Let me know what you'd like to explore — my **projects**, **career history**, **tech stack**, or how to **get in touch**?",
  ];
  return {
    type: 'text',
    text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
    suggestions: ['Show me your projects', 'What\'s your experience?', 'What\'s your tech stack?', 'Contact info'],
  };
}

// ─── Starter suggestions ──────────────────────────────────────────────────────
export const STARTER_SUGGESTIONS = [
  'Tell me about yourself',
  'Show me your projects',
  'What\'s your experience?',
  'What\'s your tech stack?',
  'Are you available for hire?',
  'How can I contact you?',
];
