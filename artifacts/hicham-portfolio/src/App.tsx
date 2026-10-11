import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronUp, Github, Linkedin, Mail, MapPin, Menu, Moon, Sun, X } from 'lucide-react';

const profile = {
  name: 'Hicham Bel Houcin',
  email: 'belhoucin.hicham@gmail.com',
  phone: '+212 676793918',
  website: 'https://hicham-bel-houcin.vercel.app',
  cvTarget: '',
  github: '',
  linkedin: '',
};

const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Education', 'Languages', 'Contact'];
const highlights = ['2+ years experience', 'Next.js SSG/ISR', 'CI/CD & VPS deployment'];
const experiences = [
  {
    company: 'Disrupt', location: 'Casablanca', role: 'Full Stack Developer', dates: 'Nov 2024 – Present', current: true,
    bullets: [
      'Took full technical ownership of a large-scale online newspaper platform built with Next.js, using Static Site Generation for fast load times and strong SEO.',
      'Led end-to-end deployment on a VPS with secure, highly available production environments and GitLab CI/CD pipelines for automated testing and deployment.',
      'Designed and built a custom CMS with NestJS and Prisma so journalists can manage articles, reels, and interactive content such as games.',
    ],
  },
  {
    company: 'High Tech Vision', location: 'Casablanca', role: 'Full Stack Developer Intern', dates: 'Nov 2023 – May 2024',
    bullets: [
      'Built secure authentication systems and media playback features.',
      'Integrated a support ticketing system to improve communication between users and the technical team.',
      'Contributed to a full administrative back office for platform monitoring and management.',
    ],
  },
  {
    company: 'Freelance', location: 'Remote', role: 'Front-End Developer & WordPress Specialist', dates: 'Jul 2024 – Oct 2024',
    bullets: [
      'Designed responsive landing pages and impact stories for non-profits, including donation and volunteer features.',
      'Migrated WordPress sites to new hosting, modernizing UI/UX and improving performance and stability.',
    ],
  },
];
const projects = [
  {
    number: '01', title: 'Disrupt Newspaper Platform',
    description: 'A large-scale online newspaper engineered for fast publishing, strong discoverability, and dependable production delivery.',
    stack: ['Next.js', 'SSG', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker', 'GitLab CI/CD'],
    links: [{ label: 'Live preview placeholder', href: '' }, { label: 'GitHub placeholder', href: '' }],
    note: 'Replace with approved screenshot and live URL',
  },
  {
    number: '02', title: 'Custom Newsroom CMS',
    description: 'A purpose-built editorial workspace for managing articles, reels, and interactive newsroom content.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL'],
    links: [{ label: 'Live preview placeholder', href: '' }, { label: 'GitHub placeholder', href: '' }],
    note: 'Project links are editable placeholders',
  },
  {
    number: '03', title: 'Instagram & YouTube Shorts Auto-Poster',
    description: 'Content-distribution automation with scheduling and uploads, solving web-driver and anti-bot challenges to reduce manual work.',
    stack: ['Python', 'Selenium'],
    links: [{ label: 'Live preview placeholder', href: '' }, { label: 'GitHub placeholder', href: '' }],
    note: 'Project links are editable placeholders',
  },
];
const skillGroups = [
  { title: 'Frontend', skills: ['TypeScript', 'JavaScript', 'React.js', 'Next.js (SSG/ISR)', 'Tailwind CSS'] },
  { title: 'Backend', skills: ['Node.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Web Scraping'] },
  { title: 'DevOps', skills: ['Docker', 'GitLab CI/CD', 'VPS Management'] },
  { title: 'Other', skills: ['C/C++'] },
  { title: 'Soft skills', skills: ['Communication', 'Project coordination', 'Adaptability', 'Time management'] },
];

function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('hicham-theme') !== 'light'; } catch { return true; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [projectNotice, setProjectNotice] = useState('');

  useEffect(() => {
    document.body.classList.add('has-js');
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('hicham-theme', dark ? 'dark' : 'light'); } catch { /* Storage can be unavailable. */ }
  }, [dark]);

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Portfolio message from ${String(data.get('name'))}`;
    const body = `Name: ${String(data.get('name'))}\nEmail: ${String(data.get('email'))}\n\n${String(data.get('message'))}`;
    window.location.href = `mailto:${profile.email}?${new URLSearchParams({ subject, body }).toString()}`;
    setFormMessage('Your email app should open with the message ready to send.');
  };

  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="portfolio-shell topbar-inner">
          <a className="wordmark" href="#home" aria-label="Hicham Bel Houcin home">HB<span>.</span></a>
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </nav>
          <div className="top-actions">
            <button className="theme-toggle" type="button" aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} onClick={() => setDark(!dark)} data-testid="button-theme-toggle">
              {dark ? <Sun size={17} /> : <Moon size={17} />}
              <span>{dark ? 'Light' : 'Dark'}</span>
            </button>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu-toggle">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero portfolio-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="availability-dot" /> Open to work <span className="eyebrow-divider">/</span> Casablanca, Morocco</p>
            <h1 id="hero-title">Hicham<br /><span>Bel Houcin</span></h1>
            <p className="hero-role">Full-Stack Engineer <span>—</span> building products end to end.</p>
            <p className="hero-tagline">I build fast, SEO-friendly web products, from scalable NestJS backends to high-performance Next.js front-ends.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowDownRight size={17} /></a>
              {profile.cvTarget
                ? <a className="button button-outline" href={profile.cvTarget} target="_blank" rel="noreferrer">Download CV <ArrowUpRight size={16} /></a>
                : <button className="button button-outline" type="button" onClick={() => setFormMessage('CV download is not set up yet. Add a file path to profile.cvTarget in src/App.tsx.')}>Download CV <ArrowUpRight size={16} /></button>}
              <a className="button button-quiet" href="#contact">Contact me <ArrowRight size={16} /></a>
            </div>
            <p className="cv-note" aria-live="polite">{formMessage.startsWith('CV') ? formMessage : ''}</p>
          </div>
          <div className="hero-art reveal" aria-label="Decorative abstract engineering motif">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-cross cross-one" /><div className="art-cross cross-two" />
            <div className="art-core"><span>BUILD</span><strong>↗</strong></div>
            <span className="art-coordinate">33° 35′ N<br />07° 37′ W</span>
            <span className="art-caption">Full ownership<br />from first commit to production.</span>
            <span className="art-index">01 / 08</span>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">SCROLL TO EXPLORE <span /></a>
        </section>

        <section className="section about-section" id="about">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">01 / About</p><p className="aside-note">Curiosity meets<br />ownership.</p></div>
            <div className="section-main reveal">
              <h2>Engineering the whole thing, <em>not just a piece of it.</em></h2>
              <p className="about-copy">Results-driven full-stack developer focused on front-end performance and user experience. Takes full ownership of products, designs scalable NestJS backends, ships Next.js front-ends using SSG and ISR. Adapts quickly and thrives in fast-paced environments where priorities change.</p>
              <div className="highlight-row">{highlights.map((item, index) => <div className="highlight" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div>
            </div>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">02 / Experience</p><p className="aside-note">The work behind<br />the work.</p></div>
            <div className="section-main">
              <h2 className="section-title reveal">A track record of <em>shipping.</em></h2>
              <div className="timeline">
        {experiences.map((experience, index) => <article className="timeline-item reveal" key={experience.company}>
                  <div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div>
                  <div className="timeline-content">
                    <div className="job-heading"><div><h3>{experience.company}</h3><p>{experience.role}</p></div><span className={`job-date ${experience.current ? 'current' : ''}`}>{experience.dates}</span></div>
                    <p className="job-location"><MapPin size={13} /> {experience.location}</p>
                    <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  </div>
                </article>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="portfolio-shell">
            <div className="projects-heading reveal"><div><p className="section-kicker">03 / Selected projects</p><h2>Built to be <em>useful.</em></h2></div><p>From editorial systems to quiet automation—<br />a few things I’ve put into the world.</p></div>
            <div className="projects-grid">
              {projects.map((project) => <article className="project-card reveal" key={project.number}>
                <div className="project-visual"><span className="project-number">{project.number} / PROJECT</span><div className={`project-glyph glyph-${project.number}`} aria-hidden="true"><span /><span /><span /></div><span className="visual-caption">{project.number === '01' ? 'EDITORIAL PLATFORM' : project.number === '02' ? 'CONTENT SYSTEM' : 'WORKFLOW AUTOMATION'}</span></div>
                <div className="project-body"><div className="project-title-row"><h3>{project.title}</h3><ArrowUpRight size={18} aria-hidden="true" /></div><p>{project.description}</p>
                  <div className="tag-list">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <div className="project-links">{project.links.map((link) => link.href
                    ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} for ${project.title}`}>{link.label.startsWith('Live') ? 'Live' : 'GitHub'}<ArrowUpRight size={13} /></a>
                    : <button className="placeholder-link" key={link.label} type="button" onClick={() => setProjectNotice(`${project.title}: ${link.label} is an editable placeholder. Replace it in src/App.tsx when a public link is available.`)} aria-label={`${link.label} placeholder for ${project.title}`}>{link.label.startsWith('Live') ? 'Live' : 'GitHub'}<ArrowUpRight size={13} /></button>)}</div>
                  <p className="project-placeholder-note">{project.note}</p>
                </div>
              </article>)}
              <article className="coming-card reveal"><span className="section-kicker">04 / In progress</span><div className="coming-mark">+</div><div><h3>Something is taking shape.</h3><p>Coming soon. The next project is on its way.</p></div><span className="coming-foot">A NEW BUILD, SOON</span></article>
            </div>
          </div>
          <p className="project-notice" aria-live="polite">{projectNotice}</p>
        </section>

        <section className="section skills-section" id="skills">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">04 / Skills</p><p className="aside-note">The right tool.<br />Used with intent.</p></div>
            <div className="section-main reveal"><h2 className="section-title">A practical <em>toolkit.</em></h2>
              <div className="skill-groups">{skillGroups.map((group, index) => <div className="skill-group" key={group.title}><span className="skill-index">0{index + 1}</span><h3>{group.title}</h3><div className="skill-badges">{group.skills.map((skill) => <span className="skill-badge" key={skill}>{skill}</span>)}</div></div>)}</div>
            </div>
          </div>
        </section>

        <section className="section education-section" id="education">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">05 / Education</p><p className="aside-note">Learn by making.<br />Make with others.</p></div>
            <article className="section-main education-card reveal">
              <p className="education-period">2021 — 2027 <span>EXPECTED</span></p><h2>1337 Coding School</h2><p className="education-meta">Khouribga <span>·</span> RNCP Level 6 in Application Development</p>
              <p className="education-description">Intensive, peer-driven learning model specialized in full-stack web development, with real-world projects.</p>
              <div className="education-stamp">1337<br /><span>CODING SCHOOL</span></div>
            </article>
          </div>
        </section>

        <section className="section languages-section" id="languages">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">06 / Languages</p><p className="aside-note">Different words.<br />Same intent.</p></div>
            <div className="section-main reveal"><h2 className="section-title">Across <em>languages.</em></h2><div className="language-list">
              {[['English', 'Professional', 'EN'], ['Arabic', 'Native', 'AR'], ['Tamazight', 'Native', 'TZ']].map(([language, level, code]) => <div className="language-item" key={language}><span className="language-code">{code}</span><strong>{language}</strong><span>{level}</span><ArrowUpRight size={16} /></div>)}
            </div></div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="portfolio-shell contact-layout">
            <div className="contact-intro reveal"><p className="section-kicker">07 / Contact</p><h2>Have a good<br />problem to <em>solve?</em></h2><p>I’m open to the next challenge. Tell me what you’re building.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}<ArrowUpRight size={14} /></a>
                <a href="tel:+212676793918">{profile.phone}<ArrowUpRight size={14} /></a>
                <a href={profile.website} target="_blank" rel="noreferrer">hicham-bel-houcin.vercel.app<ArrowUpRight size={14} /></a>
                {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub<ArrowUpRight size={14} /></a> : <button className="social-placeholder" type="button" disabled title="Add a profile URL to profile.github in src/App.tsx" data-testid="button-github-placeholder"><Github size={16} />GitHub link — placeholder</button>}
                {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn<ArrowUpRight size={14} /></a> : <button className="social-placeholder" type="button" disabled title="Add a profile URL to profile.linkedin in src/App.tsx" data-testid="button-linkedin-placeholder"><Linkedin size={16} />LinkedIn link — placeholder</button>}
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={submitContact}>
              <p className="form-kicker">SEND A NOTE</p>
              <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required placeholder="Name" data-testid="input-contact-name" />
              <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" data-testid="input-contact-email" />
              <label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" required rows={4} placeholder="A little context goes a long way." data-testid="input-contact-message" />
              <button className="button button-primary form-submit" type="submit" data-testid="button-contact-submit">Open email app <ArrowUpRight size={16} /></button>
              <p className="form-disclaimer" aria-live="polite">{formMessage.startsWith('Your email') ? <><Check size={14} aria-hidden="true" />Your email app should open with the message ready to send.</> : 'Submitting opens your email app with your details filled in. You’ll send the message from there.'}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="portfolio-shell footer-inner">
          <a className="wordmark footer-mark" href="#home">HB<span>.</span></a>
          <p>© {new Date().getFullYear()} Hicham Bel Houcin <span>·</span> Made in Casablanca.</p>
          <div className="footer-links"><a href="#contact">Contact</a><a className="back-top" href="#home">Back to top <ChevronUp size={15} /></a></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
