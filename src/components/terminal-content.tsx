import { experiences, highlights, profile, projects, skillGroups, virtualFiles } from '@/lib/portfolio-data';

type Project = typeof projects[number];
export type TerminalContentKind = 'help' | 'ls' | 'whoami' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'languages' | 'contact' | 'project';

const commands = [
  ['whoami', 'Identity and current focus'],
  ['about', 'Background and engineering approach'],
  ['experience', 'Career history'],
  ['projects', 'Selected engineering projects'],
  ['ls', 'List the virtual portfolio files'],
  ['cat <file>', 'Read a project or profile file'],
  ['skills', 'Tools and technologies'],
  ['education', '1337 Coding School'],
  ['languages', 'Spoken languages'],
  ['contact', 'Email and social profiles'],
  ['resume', 'Request a copy of my CV'],
  ['pwd', 'Print the current virtual directory'],
  ['history', 'Show this session’s commands'],
  ['theme', 'Toggle the color scheme'],
  ['clear', 'Clear the scrollback'],
  ['gui', 'Return to the classic portfolio'],
];

export function TerminalContent({ kind, project, onCommand, onProject }: {
  kind: TerminalContentKind;
  project?: Project;
  onCommand: (command: string) => void;
  onProject: (project: Project) => void;
}) {
  const command = (value: string, label = value) => <button type="button" className="shell-command-link" onClick={() => onCommand(value)}>{label}</button>;

  if (kind === 'help') return <div className="shell-result">
    <p className="shell-heading">Available commands</p>
    <dl className="shell-help">{commands.map(([name, description]) => <div key={name}>
      <dt>{name === 'cat <file>' ? <code>{name}</code> : command(name)}</dt><dd>{description}</dd>
    </div>)}</dl>
    <p className="shell-muted">Tab completes commands and filenames. ↑ / ↓ browse history.</p>
  </div>;

  if (kind === 'ls') return <div className="shell-result">
    <p className="shell-muted">{virtualFiles.length} virtual files in ~/portfolio</p>
    <div className="shell-file-list">{virtualFiles.map((file) => <div key={file.name}>
      <span className="shell-permissions" aria-hidden="true">-r--r--r--</span>
      <span className="shell-file-size">{file.size}</span>
      {command(`cat ${file.name}`, file.name)}
    </div>)}</div>
  </div>;

  if (kind === 'project' && project) return <div className="shell-result">
    <p className="shell-heading">{project.title}</p>
    <p className="shell-muted">{project.companyOrRole}</p>
    <p>{project.architecture}</p>
    <ul className="shell-bullets">{project.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
    <p><span className="shell-muted">stack </span>{project.stack.join(' · ')}</p>
    <div className="shell-links">
      <button type="button" className="shell-command-link" onClick={() => onProject(project)}>Read case study ↗</button>
      {project.links.filter((link) => link.href).map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
    </div>
  </div>;

  if (kind === 'whoami' || kind === 'about') return <div className="shell-result">
    <p className="shell-heading">{profile.name}</p>
    <dl className="shell-properties">
      <div><dt>role</dt><dd>Full-Stack Software Engineer</dd></div>
      <div><dt>location</dt><dd>Casablanca, Morocco</dd></div>
      <div><dt>focus</dt><dd>Backend systems, enterprise platforms, data-driven products</dd></div>
      <div><dt>status</dt><dd className="shell-success">Open to engineering opportunities</dd></div>
    </dl>
    {kind === 'about' && <><p>I build backend systems, administrative platforms, client portals, and production web applications.</p><ul className="shell-bullets">{highlights.map((item) => <li key={item}>{item}</li>)}</ul></>}
    <p className="shell-muted">Next: {command('experience')} / {command('projects')} / {command('contact')}</p>
  </div>;

  if (kind === 'experience') return <div className="shell-result shell-records">{experiences.map((experience) => <div key={experience.company}>
    <p className="shell-heading">{experience.company}<span className="shell-muted"> · {experience.dates}</span></p>
    <p>{experience.role} <span className="shell-muted">/ {experience.location}</span></p>
    <ul className="shell-bullets">{experience.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
  </div>)}</div>;

  if (kind === 'projects') return <div className="shell-result shell-records">{projects.map((item) => <div key={item.number}>
    <p className="shell-heading"><span className="shell-muted">{item.number.padStart(2, '0')} </span>{item.title}</p>
    <p>{item.description}</p>
    <p className="shell-muted">{item.stack.join(' · ')}</p>
    {command(`cat ${item.terminalFilename}`)}
  </div>)}</div>;

  if (kind === 'skills') return <dl className="shell-result shell-properties shell-skills">{skillGroups.map((group) => <div key={group.title}><dt>{group.title}</dt><dd>{group.skills.join(' · ')}</dd></div>)}</dl>;

  if (kind === 'education') return <div className="shell-result">
    <p className="shell-heading">1337 Coding School / 42 Network</p>
    <p>RNCP Level 6 in Application Development</p>
    <p className="shell-muted">Khouribga, Morocco · 2021–2027 (expected)</p>
    <p>Peer-driven learning through software architecture, UNIX systems, and full-stack projects.</p>
  </div>;

  if (kind === 'languages') return <dl className="shell-result shell-properties">{[['English', 'Professional proficiency (B2)'], ['Arabic', 'Native'], ['Tamazight', 'Native'], ['French', 'Beginner (A1)']].map(([name, level]) => <div key={name}><dt>{name}</dt><dd>{level}</dd></div>)}</dl>;

  if (kind === 'contact') return <dl className="shell-result shell-properties">
    <div><dt>email</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
    <div><dt>phone</dt><dd><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a></dd></div>
    <div><dt>github</dt><dd><a href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a></dd></div>
    <div><dt>linkedin</dt><dd><a href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace('https://www.', '')}</a></dd></div>
  </dl>;

  return null;
}

export function ShellPrompt() {
  return <span className="shell-prompt-text"><span className="shell-user">hicham</span><span className="shell-muted">@</span><span className="shell-host">portfolio</span><span className="shell-muted">:</span><span className="shell-path">~/portfolio</span><span className="shell-prompt-symbol"> $</span></span>;
}
