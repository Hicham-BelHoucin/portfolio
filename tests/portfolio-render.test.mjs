import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, watch: null }, appType: 'custom' });
const { default: App } = await server.ssrLoadModule('/src/App.tsx');
const { TerminalContent } = await server.ssrLoadModule('/src/components/terminal-content.tsx');
const { projects, virtualFiles } = await server.ssrLoadModule('/src/lib/portfolio-data.ts');
after(() => server.close());

function renderAt(hash) {
  const originalWindow = globalThis.window;
  const originalStorage = globalThis.localStorage;
  globalThis.window = { location: { hash } };
  globalThis.localStorage = { getItem: () => null };
  try {
    return renderToStaticMarkup(createElement(App));
  } finally {
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
    if (originalStorage === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = originalStorage;
  }
}

test('the initial portfolio includes career and project content without a mode switch', () => {
  const html = renderAt('');
  for (const section of ['home', 'about', 'experience', 'projects', 'skills', 'education', 'languages', 'contact']) {
    assert.ok(html.includes(`id="${section}"`), `Missing initial section: ${section}`);
  }
  assert.ok(html.includes('Valoris Management'));
  assert.ok(html.includes('Request CV'));
  assert.ok(!html.includes('Download CV'));
});

test('a project deep link initially renders the classic project section', () => {
  const html = renderAt('#projects');
  assert.ok(html.includes('id="projects"'));
  assert.ok(!html.includes('terminal-fullscreen-view'));
});

test('the terminal has its own direct link and accessible main heading', () => {
  const html = renderAt('#terminal');
  assert.ok(html.includes('terminal-fullscreen-view'));
  assert.ok(html.includes('id="terminal"'));
  assert.ok(html.includes('<h1 class="sr-only">'));
  assert.ok(html.includes('aria-label="Clear terminal output"'));
});

test('redesigned project output retains runnable filenames and case-study content', () => {
  const callbacks = { onCommand: () => {}, onProject: () => {} };
  const listing = renderToStaticMarkup(createElement(TerminalContent, { kind: 'projects', ...callbacks }));
  for (const project of projects) {
    assert.ok(listing.includes(`cat ${project.terminalFilename}`));
    const detail = renderToStaticMarkup(createElement(TerminalContent, { kind: 'project', project, ...callbacks }));
    assert.ok(detail.includes('Read case study'));
    for (const link of project.links.filter((item) => item.href)) assert.ok(detail.includes(`href="${link.href}"`));
  }
});

test('shell file listing and help keep discovery available after redesign', () => {
  const callbacks = { onCommand: () => {}, onProject: () => {} };
  const listing = renderToStaticMarkup(createElement(TerminalContent, { kind: 'ls', ...callbacks }));
  for (const file of virtualFiles) assert.ok(listing.includes(file.name));
  const help = renderToStaticMarkup(createElement(TerminalContent, { kind: 'help', ...callbacks }));
  for (const name of ['projects', 'history', 'pwd', 'clear', 'resume']) assert.ok(help.includes(`>${name}</button>`));
});
