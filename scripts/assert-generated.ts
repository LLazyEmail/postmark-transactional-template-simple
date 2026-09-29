#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import slugs from '../tests/fixtures/generated-slugs.json';

const outDir = process.argv.find((arg) => arg.startsWith('--out='))?.slice(6) ?? 'generated';
const missing: string[] = [];
const empty: string[] = [];

for (const slug of slugs) {
  const filePath = path.resolve(outDir, `${slug}.html`);
  if (!existsSync(filePath)) {
    missing.push(filePath);
    continue;
  }
  const html = readFileSync(filePath, 'utf8');
  if (!html.includes('<html') && !html.includes('<!DOCTYPE')) {
    empty.push(filePath);
  }
}

if (missing.length || empty.length) {
  if (missing.length) console.error('Missing generated files:\n' + missing.join('\n'));
  if (empty.length) console.error('Empty or non-HTML generated files:\n' + empty.join('\n'));
  process.exit(1);
}

console.log(`ok: ${slugs.length} generated HTML files in ${path.resolve(outDir)}`);
