import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronUp, Github, Linkedin, Mail, MapPin, Menu, Moon, Sun, X, Terminal, Maximize2 } from 'lucide-react';
import { useModalAccessibility } from '@/hooks/use-modal-accessibility';
import { resolveTerminalFile } from '@/lib/terminal-files';

import { profile, navItems, highlights, experiences, projects, skillGroups, virtualFiles, terminalCommands, sectionTargets } from '@/lib/portfolio-data';
import { ShellPrompt, TerminalContent, type TerminalContentKind } from '@/components/terminal-content';

function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('hicham-theme') !== 'light'; } catch { return true; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [projectNotice, setProjectNotice] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<ReactNode[]>([]);
  const [terminalAnnouncement, setTerminalAnnouncement] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalMaximized, setTerminalMaximized] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [greeting, setGreeting] = useState('');
  const [greetingCleared, setGreetingCleared] = useState(false);
  const [pageMode, setPageMode] = useState<'terminal' | 'classic'>(() => window.location.hash === '#terminal' ? 'terminal' : 'classic');
  const [navigationTarget, setNavigationTarget] = useState<string | null>(() => window.location.hash.slice(1) || null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<typeof projects[0] | null>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const greetingTimerRef = useRef<number | null>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);
  const siteContentRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;
  const terminalHistoryRef = useRef(terminalHistory);
  terminalHistoryRef.current = terminalHistory;

  useModalAccessibility(paletteOpen, paletteRef, siteContentRef);
  useModalAccessibility(Boolean(activeModalProject), caseStudyRef, siteContentRef);

  useEffect(() => {
    const followLocation = () => {
      const target = window.location.hash.slice(1) || 'home';
      if (target === 'main') { setNavigationTarget(target); return; }
      setPageMode(target === 'terminal' ? 'terminal' : 'classic');
      setNavigationTarget(target);
      setMenuOpen(false);
      setPaletteOpen(false);
      setActiveModalProject(null);
      setTerminalMaximized(false);
    };
    window.addEventListener('popstate', followLocation);
    window.addEventListener('hashchange', followLocation);
    return () => {
      window.removeEventListener('popstate', followLocation);
      window.removeEventListener('hashchange', followLocation);
    };
  }, []);

  useEffect(() => {
    if (!terminalMaximized) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [terminalMaximized]);

  useEffect(() => {
    if (!navigationTarget || paletteOpen || activeModalProject) return;
    const section = document.getElementById(navigationTarget);
    if (section) {
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      const focusTarget = navigationTarget === 'terminal'
        ? terminalInputRef.current
        : section.querySelector<HTMLElement>('h1, h2') || section;
      if (focusTarget && focusTarget !== terminalInputRef.current) focusTarget.setAttribute('tabindex', '-1');
      focusTarget?.focus({ preventScroll: true });
    }
    setNavigationTarget(null);
  }, [navigationTarget, pageMode, paletteOpen, activeModalProject]);

  useEffect(() => {
    document.body.classList.add('has-js');
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('hicham-theme', dark ? 'dark' : 'light'); } catch { /* Storage can be unavailable. */ }
  }, [dark]);

  useEffect(() => {
    // Classic sections mount when the view changes, so observe the new nodes.
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
  }, [pageMode]);

  useEffect(() => {
    const fullGreeting = "> whoami\nHicham Bel Houcin — Full-Stack Software Engineer\n> type 'help' to see commands";
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setGreeting(fullGreeting);
      setTerminalAnnouncement("Terminal ready. Type 'help' to see commands.");
      return;
    }
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setGreeting(fullGreeting.slice(0, position));
      if (position >= fullGreeting.length) {
        window.clearInterval(timer);
        greetingTimerRef.current = null;
        setTerminalAnnouncement("Terminal ready. Type 'help' to see commands.");
      }
    }, 24);
    greetingTimerRef.current = timer;
    return () => {
      window.clearInterval(timer);
      greetingTimerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const node = terminalOutputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [terminalLines, greeting, pageMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (paletteOpen || activeModalProject) return;
        setPaletteOpen(true);
        setPaletteQuery('');
        setPaletteIndex(0);
      }
      if (event.key === 'Escape') {
        if (activeModalProject) setActiveModalProject(null);
        if (paletteOpen) setPaletteOpen(false);
        if (!activeModalProject && !paletteOpen) setTerminalMaximized(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paletteOpen, activeModalProject]);

  const clearTerminal = () => {
    if (greetingTimerRef.current !== null) {
      window.clearInterval(greetingTimerRef.current);
      greetingTimerRef.current = null;
    }
    setGreetingCleared(true);
    setTerminalLines([]);
    setTerminalAnnouncement('Terminal cleared.');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      const draft = terminalInput;
      clearTerminal();
      setTerminalInput(draft);
    } else if (event.ctrlKey && event.key.toLowerCase() === 'c' && event.currentTarget.selectionStart === event.currentTarget.selectionEnd && window.getSelection()?.isCollapsed) {
      event.preventDefault();
      setTerminalLines((items) => [...items.slice(-199), <span className="terminal-command-echo" key={`cancel-${Date.now()}`}><ShellPrompt /> <span className="shell-echo-input">{terminalInput}^C</span></span>]);
      setTerminalInput('');
      setHistoryIndex(-1);
      setTerminalAnnouncement('Input cancelled.');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (terminalHistory.length === 0) return;
      const next = Math.max(0, (historyIndex < 0 ? terminalHistory.length : historyIndex) - 1);
      setHistoryIndex(next);
      setTerminalInput(terminalHistory[next] || '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= terminalHistory.length) {
        setHistoryIndex(-1);
        setTerminalInput('');
      } else {
        setHistoryIndex(next);
        setTerminalInput(terminalHistory[next] || '');
      }
    } else if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault();
      const current = terminalInput.trim().toLowerCase();
      if (!current) return;
      const match = terminalCommands.find((item) => item.startsWith(current));
      if (match) {
        setTerminalInput(match);
      } else if (current.startsWith('cat ')) {
        const filePrefix = current.slice(4).trim();
        const fileMatch = virtualFiles.find((f) => f.name.toLowerCase().startsWith(filePrefix));
        if (fileMatch) setTerminalInput(`cat ${fileMatch.name}`);
      }
    }
  };

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;
    setTerminalHistory((items) => [...items.slice(-99), trimmed]);
    setHistoryIndex(-1);
    setTerminalLines((items) => [
      ...items.slice(-199),
      <span className="terminal-command-echo" key={`echo-${items.length}`}>
        <ShellPrompt /> <span className="shell-echo-input">{trimmed}</span>
      </span>
    ]);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();
    const fileId = resolveTerminalFile(arg);

    const addLines = (lines: ReactNode[], announcement: string) => {
      setTerminalLines((items) => [...items, ...lines].slice(-200));
      setTerminalAnnouncement(announcement);
    };

    if (cmd === 'clear') {
      clearTerminal();
      setTerminalInput('');
      return;
    }

    const showContent = (kind: TerminalContentKind, project?: typeof projects[number]) => {
      addLines([
        <TerminalContent key={`result-${Date.now()}-${kind}`} kind={kind} project={project} onCommand={executeCommand} onProject={setActiveModalProject} />,
      ], project ? `Displaying ${project.title}.` : `Displayed ${kind}.`);
    };

    if (cmd === 'help') {
      showContent('help');
    } else if (cmd === 'ls' || cmd === 'dir') {
      showContent('ls');
    } else if (cmd === 'cat') {
      const project = projects.find((item) => resolveTerminalFile(item.terminalFilename) === fileId);
      if (project) showContent('project', project);
      else if (fileId === 'about' || fileId === 'skills' || fileId === 'experience' || fileId === 'contact') showContent(fileId);
      else {
        const message = arg ? `cat: ${arg}: No such file. Run 'ls' to list files.` : 'usage: cat <filename>';
        addLines([<span className="shell-error" key={`cat-error-${Date.now()}`}>{message}</span>], message);
      }
    } else if (['whoami', 'about', 'experience', 'projects', 'skills', 'education', 'languages', 'contact'].includes(cmd)) {
      showContent(cmd as TerminalContentKind);
    } else if (cmd === 'pwd') {
      addLines([<span key={`pwd-${Date.now()}`}>/home/hicham/portfolio</span>], 'Current virtual directory: /home/hicham/portfolio.');
    } else if (cmd === 'history') {
      addLines([<ol className="shell-history" key={`history-${Date.now()}`}>{[...terminalHistoryRef.current, trimmed].slice(-50).map((item, index) => <li key={index}>{item}</li>)}</ol>], 'Displayed recent command history.');
    } else if (cmd === 'resume' || cmd === 'cv') {
      if (profile.cvTarget) {
        addLines([<span key={`resume-${Date.now()}`}>Opening CV: <a href={profile.cvTarget} target="_blank" rel="noreferrer">download CV</a></span>], 'Opening the CV in a new tab.');
        window.open(profile.cvTarget, '_blank', 'noopener,noreferrer');
      } else {
        const message = 'CV file is available on request. You can contact me directly at belhoucin.hicham@gmail.com.';
        addLines([<span key={`resume-empty-${Date.now()}`}>{message} <a href={`mailto:${profile.email}?subject=Request%20for%20CV`}>Request CV ↗</a></span>], message);
      }
    } else if (cmd === 'classic' || cmd === 'gui' || cmd === 'exit') {
      scrollTo('home');
      addLines([<span key={`switched-classic-${Date.now()}`}>Switched to Classic GUI portfolio view.</span>], 'Switched to Classic view.');
    } else if (cmd === 'terminal' || cmd === 'cli') {
      scrollTo('terminal');
      addLines([<span key={`switched-term-${Date.now()}`}>Switched to Terminal Workstation view.</span>], 'Switched to Terminal view.');
    } else if (cmd === 'theme') {
      const next = !darkRef.current;
      darkRef.current = next;
      setDark(next);
      const message = `Theme switched to ${next ? 'dark' : 'light'}.`;
      addLines([<span key={`theme-${Date.now()}`}>{message}</span>], message);
    } else if (cmd === 'date' || cmd === 'time') {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Africa/Casablanca', dateStyle: 'full', timeStyle: 'medium' });
      addLines([<span key={`date-${Date.now()}`}>{now} (Casablanca / Morocco)</span>], now);
    } else if (cmd === 'uname') {
      const info = 'Portfolio Shell — interactive browser session with a virtual filesystem';
      addLines([<span key={`uname-${Date.now()}`}>{info}</span>], info);
    } else if (cmd === 'sudo') {
      const msg = 'hicham is not in the sudoers file. This incident will be reported. 😄';
      addLines([<span key={`sudo-${Date.now()}`}>{msg}</span>], msg);
    } else {
      const message = `command not found: '${trimmed}'. Type 'help' or 'ls' to see available commands.`;
      addLines([<span className="shell-error" key={`unknown-${Date.now()}`}>{message}</span>], message);
    }
    setTerminalInput('');
  };

  const scrollTo = (id: string) => {
    setPageMode(id === 'terminal' ? 'terminal' : 'classic');
    setMenuOpen(false);
    setPaletteOpen(false);
    setActiveModalProject(null);
    setTerminalMaximized(false);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    setNavigationTarget(id);
  };

  const paletteMatches = sectionTargets.filter((target) => target.label.toLowerCase().includes(paletteQuery.toLowerCase()));

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
      <div ref={siteContentRef}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="topbar">
        <div className="portfolio-shell topbar-inner">
          <a className="wordmark" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} aria-label="Hicham Bel Houcin home">HB<span>.</span></a>
          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            <button
              type="button"
              className={`nav-mode-control ${pageMode === 'terminal' ? 'is-active' : ''}`}
              aria-pressed={pageMode === 'terminal'}
              data-testid="button-mode-terminal"
              onClick={() => scrollTo('terminal')}
            >
              <Terminal size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} /> Terminal
            </button>
            <button
              type="button"
              className={`nav-mode-control ${pageMode === 'classic' ? 'is-active' : ''}`}
              aria-pressed={pageMode === 'classic'}
              data-testid="button-mode-classic"
              onClick={() => scrollTo('home')}
            >
              Classic
            </button>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.toLowerCase());
                }}
              >
                {item}
              </a>
            ))}
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

      {pageMode === 'terminal' ? (
        <main id="main" tabIndex={-1} className={`portfolio-shell terminal-fullscreen-view ${terminalMaximized ? 'is-maximized' : ''}`}>
          <h1 className="sr-only">Hicham Bel Houcin — Interactive portfolio terminal</h1>
          <div id="terminal" className="terminal-navigation-target" />
          <div className="terminal-window">
            <div className="terminal-chrome">
              <span className="traffic-lights">
                <button type="button" onClick={() => scrollTo('home')} title="Close terminal" aria-label="Close terminal and return to classic portfolio" />
                <button type="button" onClick={() => executeCommand('clear')} title="Clear scrollback" aria-label="Clear terminal output" />
                <button type="button" onClick={() => setTerminalMaximized((value) => !value)} title={terminalMaximized ? 'Restore window' : 'Expand window'} aria-label={terminalMaximized ? 'Restore terminal window' : 'Expand terminal window'} aria-pressed={terminalMaximized} />
              </span>
              <span className="terminal-title">hicham — portfolio</span>
              <button type="button" className="terminal-mode-switch" onClick={() => scrollTo('home')} data-testid="button-switch-classic">Classic <ArrowUpRight size={12} /></button>
            </div>
            <div className="shell-tabbar" aria-hidden="true"><span className="shell-tab"><Terminal size={13} /> ~/portfolio</span><span className="shell-tab-note">interactive shell</span></div>
            <div className="terminal-output" ref={terminalOutputRef} role="region" aria-label="Terminal output" aria-live="off" onClick={(event) => { if (event.target === event.currentTarget && window.getSelection()?.isCollapsed) terminalInputRef.current?.focus(); }}>
              {!greetingCleared && <div className="shell-welcome">
                <p className="shell-login">Portfolio Shell <span className="shell-muted">/ interactive session</span></p>
                <p className="shell-welcome-name">Hicham Bel Houcin<span className="shell-muted"> · Full-Stack Software Engineer</span></p>
                <p className="shell-muted">Casablanca, Morocco · building systems from database to production.</p>
                <p className="shell-start">Run <button type="button" className="shell-command-link" onClick={() => executeCommand('help')}>help</button> for commands, <button type="button" className="shell-command-link" onClick={() => executeCommand('ls')}>ls</button> to explore, or <button type="button" className="shell-command-link" onClick={() => executeCommand('projects')}>projects</button> to see my work.</p>
              </div>}
              {terminalLines.map((line, index) => <div className="terminal-line" key={`line-${index}`}>{line}</div>)}
              <form className="terminal-entry" onSubmit={(event) => { event.preventDefault(); executeCommand(terminalInput); }}>
                <label htmlFor="terminal-command-input" className="terminal-prompt"><span className="sr-only">Enter a terminal command</span><span aria-hidden="true"><ShellPrompt /></span></label>
                <input ref={terminalInputRef} id="terminal-command-input" aria-label="Enter a terminal command" aria-describedby="shell-shortcut-hint" data-testid="input-terminal-command" autoComplete="off" autoCapitalize="off" autoCorrect="off" enterKeyHint="send" spellCheck={false} value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} onKeyDown={handleKeyDown} />
                <button className="terminal-submit" type="submit" aria-label="Run command" data-testid="button-terminal-submit"><span aria-hidden="true">↵</span></button>
              </form>
            </div>
            <div className="shell-statusbar"><span className="shell-status-session">1: portfolio</span><span className="shell-status-path">~/portfolio</span><span id="shell-shortcut-hint" className="shell-status-hints">Tab complete <span>↑↓ history</span> <span>Ctrl+L clear</span></span><span className="shell-status-encoding">UTF-8</span></div>
            <div className="sr-only" aria-live="polite">{terminalAnnouncement}</div>
          </div>
        </main>
      ) : (
        <main id="main" tabIndex={-1}>
          <section className="hero portfolio-shell" id="home" aria-labelledby="hero-title">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span className="availability-dot" /> Open to work <span className="eyebrow-divider">/</span> Casablanca, Morocco</p>
              <h1 id="hero-title">Hicham<br /><span>Bel Houcin</span></h1>
              <p className="hero-role">Full-Stack Software Engineer <span>—</span> building products end to end.</p>
              <p className="hero-tagline">Building scalable backend systems, enterprise financial platforms, and data-driven web products with NestJS, Django, Next.js, and PostgreSQL.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>View my work <ArrowDownRight size={17} /></a>
                {profile.cvTarget
                   ? <a className="button button-outline" href={profile.cvTarget} target="_blank" rel="noreferrer">Download CV <ArrowUpRight size={16} /></a>
                  : <a className="button button-outline" href={`mailto:${profile.email}?subject=Request%20for%20CV`}>Request CV <ArrowUpRight size={16} /></a>}
                <a className="button button-quiet" href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact me <ArrowRight size={16} /></a>
              </div>
              <p className="cv-note" aria-live="polite">{formMessage.startsWith('CV') ? formMessage : ''}</p>
            </div>
            <div className="terminal-wrap reveal">
              <div className="terminal-window">
                <div className="terminal-chrome">
                  <span className="traffic-lights" aria-hidden="true"><i /><i /><i /></span>
                  <span className="terminal-title">hicham — portfolio</span>
                  <div className="terminal-actions-right">
                    <button
                      type="button"
                      className="terminal-mode-switch"
                      onClick={() => scrollTo('terminal')}
                      title="Open Fullscreen Terminal Workstation"
                    >
                      <Maximize2 size={11} style={{ display: 'inline', marginRight: 4 }} /> Full Terminal
                    </button>

                  </div>
                </div>
                <div className="terminal-output" ref={terminalOutputRef} role="region" aria-label="Terminal output" aria-live="off">
                  {!greetingCleared && greeting.split('\n').map((line, index) => <div className={index === 1 ? 'terminal-greeting-result' : 'terminal-greeting-command'} key={`greeting-${index}`}>{line}</div>)}
                  {terminalLines.map((line, index) => <div className="terminal-line" key={`line-${index}`}>{line}</div>)}
                <form className="terminal-entry" onSubmit={(event) => { event.preventDefault(); executeCommand(terminalInput); }}>
                  <label htmlFor="terminal-command-input-classic" className="terminal-prompt" aria-hidden="true"><span className="shell-user">hicham</span><span className="shell-path"> ~</span> $</label>
                  <input
                    ref={terminalInputRef}
                    id="terminal-command-input-classic"
                    aria-label="Enter a terminal command"
                    data-testid="input-terminal-command-classic"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    enterKeyHint="send"
                    spellCheck={false}
                    value={terminalInput}
                    onChange={(event) => setTerminalInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="terminal-submit" type="submit" aria-label="Run command" data-testid="button-terminal-submit-classic"><ArrowRight size={16} /></button>
                </form>
                </div>
                <div className="sr-only" aria-live="polite">{terminalAnnouncement}</div>
              </div>
              <div className="terminal-shortcuts" role="group" aria-label="Terminal command shortcuts">
                {['help', 'ls', 'whoami', 'projects', 'skills', 'contact'].map((command) => (
                  <button key={command} type="button" data-testid={`button-run-${command}`} onClick={() => { executeCommand(command); terminalInputRef.current?.focus(); }}>{command}</button>
                ))}
              </div>
            </div>
            <a className="scroll-cue" href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} aria-label="Scroll to about section">SCROLL TO EXPLORE <span /></a>
          </section>

        <section className="section about-section" id="about">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">01 / About</p><p className="aside-note">Curiosity meets<br />ownership.</p></div>
            <div className="section-main reveal">
              <h2>Engineering reliable systems, <em>from database to production.</em></h2>
              <p className="about-copy">Full-Stack Software Engineer based in Casablanca, Morocco, with experience building backend systems, administrative platforms, client portals, and production web applications. Specializing in TypeScript, Python, NestJS, Django, Next.js, and PostgreSQL, with hands-on expertise in authentication, automated document workflows, and large-scale data migrations—including migrating 60,000 historical articles and metadata for L'Opinion.</p>
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
            <div className="projects-heading reveal"><div><p className="section-kicker">03 / Selected projects</p><h2>Built to be <em>useful.</em></h2></div><p>From enterprise financial platforms to large migrations and independent tools—<br />tested systems engineered for reliability.</p></div>
            <div className="projects-grid">
              {projects.map((project) => <article className="project-card reveal" key={project.number}>
                <div className="project-visual"><span className="project-number">{project.number} / PROJECT</span><div className={`project-glyph glyph-${project.number}`} aria-hidden="true"><span /><span /><span /></div><span className="visual-caption">{project.caption}</span></div>
                <div className="project-body">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <button
                      type="button"
                      className="case-study-btn"
                      onClick={() => setActiveModalProject(project)}
                      aria-label={`View deep-dive case study for ${project.title}`}
                    >
                      Case Study <ArrowUpRight size={13} aria-hidden="true" />
                    </button>
                  </div>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <div className="project-links">
                    <button
                      type="button"
                      className="case-study-btn"
                      onClick={() => setActiveModalProject(project)}
                    >
                      Architecture Details
                    </button>
                    {project.links.map((link) => link.href
                      ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={`${link.label} for ${project.title}`}>{link.label}<ArrowUpRight size={13} /></a>
                      : <button className="placeholder-link" key={link.label} type="button" onClick={() => setActiveModalProject(project)} aria-label={`${link.label} note for ${project.title}`}>{link.label}<ArrowUpRight size={13} /></button>)}
                  </div>
                  <p className="project-placeholder-note">{project.note}</p>
                </div>
              </article>)}
              <article className="coming-card reveal"><span className="section-kicker">07 / In progress</span><div className="coming-mark">+</div><div><h3>Something is taking shape.</h3><p>Active exploration in AI-assisted pipelines and new tools.</p></div><span className="coming-foot">NEW RELEASES SOON</span></article>
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
              <p className="education-description">Intensive, peer-driven learning model specialized in software architecture and full-stack web engineering through hands-on projects.</p>
              <div className="education-stamp">1337<br /><span>CODING SCHOOL</span></div>
            </article>
          </div>
        </section>

        <section className="section languages-section" id="languages">
          <div className="portfolio-shell section-grid">
            <div className="section-aside reveal"><p className="section-kicker">06 / Languages</p><p className="aside-note">Different words.<br />Same intent.</p></div>
            <div className="section-main reveal"><h2 className="section-title">Across <em>languages.</em></h2><div className="language-list">
              {[['English', 'Professional (B2)', 'EN'], ['Arabic', 'Native', 'AR'], ['Tamazight', 'Native', 'TZ'], ['French', 'Beginner (A1)', 'FR']].map(([language, level, code]) => <div className="language-item" key={language}><span className="language-code">{code}</span><strong>{language}</strong><span>{level}</span><ArrowUpRight size={16} /></div>)}
            </div></div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="portfolio-shell contact-layout">
            <div className="contact-intro reveal"><p className="section-kicker">07 / Contact</p><h2>Have a good<br />problem to <em>solve?</em></h2><p>I’m open to new engineering challenges. Tell me what you’re building.</p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}><Mail size={16} />{profile.email}<ArrowUpRight size={14} /></a>
                <a href="tel:+212676793918">{profile.phone}<ArrowUpRight size={14} /></a>
                <a href={profile.website} target="_blank" rel="noreferrer">hicham-belhoucin.vercel.app<ArrowUpRight size={14} /></a>
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
      )}

      <footer className="footer">
        <div className="portfolio-shell footer-inner">
          <a className="wordmark footer-mark" href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>HB<span>.</span></a>
          <p>© {new Date().getFullYear()} Hicham Bel Houcin <span>·</span> Made in Casablanca.</p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Hicham Bel Houcin on GitHub">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Hicham Bel Houcin on LinkedIn">LinkedIn</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            <button
              type="button"
              className="terminal-placeholder"
              style={{ fontSize: '.7rem', color: 'var(--muted-ink)' }}
              onClick={() => scrollTo(pageMode === 'terminal' ? 'home' : 'terminal')}
            >
              {pageMode === 'terminal' ? 'Classic GUI Mode' : 'Terminal Mode'}
            </button>
            <a className="back-top" href={pageMode === 'terminal' ? '#terminal' : '#home'} onClick={(e) => { e.preventDefault(); scrollTo(pageMode === 'terminal' ? 'terminal' : 'home'); }}>Back to top <ChevronUp size={15} /></a>
          </div>
        </div>
      </footer>
      </div>
      {paletteOpen && <div className="palette-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
        <section ref={paletteRef} tabIndex={-1} className="command-palette" role="dialog" aria-modal="true" aria-labelledby="palette-title">
          <h2 id="palette-title">Jump to a section</h2>
          <label className="sr-only" htmlFor="palette-search">Filter sections</label>
          <input ref={paletteInputRef} id="palette-search" data-testid="input-section-palette" value={paletteQuery} placeholder="Type a section name…" onChange={(event) => { setPaletteQuery(event.target.value); setPaletteIndex(0); }} onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setPaletteIndex((index) => Math.min(index + 1, paletteMatches.length - 1)); }
            if (event.key === 'ArrowUp') { event.preventDefault(); setPaletteIndex((index) => Math.max(0, index - 1)); }
            if (event.key === 'Enter' && paletteMatches[paletteIndex]) scrollTo(paletteMatches[paletteIndex].id);
          }} />
          <div className="palette-options">{paletteMatches.length ? paletteMatches.map((target, index) => <button key={target.id} type="button" data-testid={`button-jump-${target.id}`} aria-current={index === paletteIndex ? 'true' : undefined} className={index === paletteIndex ? 'is-selected' : ''} onMouseEnter={() => setPaletteIndex(index)} onClick={() => scrollTo(target.id)}>{target.label}<span>Enter</span></button>) : <p>No matching sections.</p>}</div>
          <p className="palette-hint">Use ↑ ↓ to navigate · Esc to close</p>
        </section>
      </div>}
      {activeModalProject && (
        <div
          ref={caseStudyRef}
          tabIndex={-1}
          className="case-study-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={(event) => { if (event.target === event.currentTarget) setActiveModalProject(null); }}
        >
          <div className="case-study-modal">
            <button
              type="button"
              className="case-study-close"
              onClick={() => setActiveModalProject(null)}
              aria-label="Close case study dialog"
            >
              <X size={18} />
            </button>
            <span className="case-study-badge">{activeModalProject.caption}</span>
            <h3 id="case-study-title">{activeModalProject.title}</h3>
            <p className="case-study-meta">{activeModalProject.companyOrRole}</p>

            <p className="case-study-section-title">Overview &amp; Architecture</p>
            <p className="case-study-overview">{activeModalProject.architecture}</p>

            <p className="case-study-section-title">Key Technical Accomplishments</p>
            <ul className="case-study-bullets">
              {activeModalProject.achievements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <p className="case-study-section-title">Technologies &amp; Infrastructure</p>
            <div className="case-study-stack">
              {activeModalProject.stack.map((item) => (
                <span className="tag" key={item}>{item}</span>
              ))}
            </div>

            <div className="case-study-actions">
              <span className="case-study-note">{activeModalProject.note}</span>
              {activeModalProject.links.map((link) => link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.72rem' }}
                >
                  {link.label} <ArrowUpRight size={14} />
                </a>
              ) : (
                <span className="tag" key={link.label} style={{ color: 'var(--accent-hex)' }}>
                  {link.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
