import assert from 'node:assert/strict';
import { test } from 'node:test';
import { projectFiles, resolveTerminalFile } from '../src/lib/terminal-files.ts';

test('each advertised project filename opens its corresponding project', () => {
  for (const file of projectFiles) {
    assert.equal(resolveTerminalFile(file.filename), file.id);
  }
});

test("L'Opinion title shortcut and migration filename resolve consistently", () => {
  assert.equal(resolveTerminalFile("l'opinion"), 'lopinion');
  assert.equal(resolveTerminalFile('lopinion-migration.md'), 'lopinion');
});

test('video auto-poster opens the automation project, not the automotive project', () => {
  assert.equal(resolveTerminalFile('video-auto-poster.py'), 'video');
  assert.equal(resolveTerminalFile('shorts'), 'video');
  assert.equal(resolveTerminalFile('autoreliability.md'), 'automotive');
});

test('command input accepts case and surrounding whitespace', () => {
  assert.equal(resolveTerminalFile('  EFOOTBALLDB.MD  '), 'efootball');
});

test('unknown filenames cannot accidentally match projects or object prototypes', () => {
  for (const name of ['', 'invalid.md', 'evaluation.md', 'automatic.txt', 'about-me.md', 'constructor', '__proto__']) {
    assert.equal(resolveTerminalFile(name), undefined);
  }
});

test('profile files remain available alongside project files', () => {
  assert.equal(resolveTerminalFile('about.md'), 'about');
  assert.equal(resolveTerminalFile('skills.json'), 'skills');
  assert.equal(resolveTerminalFile('experience.md'), 'experience');
  assert.equal(resolveTerminalFile('contact.sh'), 'contact');
});
