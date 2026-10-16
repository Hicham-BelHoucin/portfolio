// Stable virtual filenames and explicit aliases avoid ambiguous substring matches.
export const projectFiles = [
  { id: 'valoris', filename: 'valoris-management.md', aliases: ['valoris', 'valoris-management'] },
  { id: 'lopinion', filename: 'lopinion-migration.md', aliases: ["l'opinion", 'lopinion', 'lopinion-migration'] },
  { id: 'efootball', filename: 'efootballdb.md', aliases: ['efootball', 'efootballdb'] },
  { id: 'automotive', filename: 'autoreliability.md', aliases: ['auto', 'autoreliability'] },
  { id: 'streaming', filename: 'british-arab-community.md', aliases: ['british', 'streaming', 'british-arab-community'] },
  { id: 'video', filename: 'video-auto-poster.py', aliases: ['shorts', 'video', 'video-auto-poster'] },
] as const;

export function resolveTerminalFile(input: string): string | undefined {
  const name = input.trim().toLowerCase();
  const project = projectFiles.find((file) => file.filename === name || file.aliases.some((alias) => alias === name));
  if (project) return project.id;
  const profileFiles: Record<string, string> = {
    'about.md': 'about', about: 'about',
    'skills.json': 'skills', skills: 'skills',
    'experience.md': 'experience', experience: 'experience',
    'contact.sh': 'contact', contact: 'contact',
  };
  return Object.hasOwn(profileFiles, name) ? profileFiles[name] : undefined;
}
