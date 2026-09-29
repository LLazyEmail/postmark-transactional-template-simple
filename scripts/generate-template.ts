#!/usr/bin/env node
import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { CATALOG, SAMPLE_PAYLOADS, type TemplateCatalogEntry } from './template-catalog.ts';
import { templates, type TemplateRegistration } from '../src/templates/manifest.ts';

const requireData = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DEFAULT_OUT_DIR = 'generated';
const SKIP_FILES = new Set([
  'index.js',
  'index2.js',
  'registry.ts',
  'registry.js',
  'defineTemplate.ts',
  'manifest.ts',
  'legacySamples.ts',
]);

interface CliArgs {
  all?: boolean;
  list?: boolean;
  template?: string;
  data?: string;
  out?: string;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {};
  argv.forEach((arg) => {
    if (arg === '--all') {
      args.all = true;
      return;
    }
    if (arg === '--list') {
      args.list = true;
      return;
    }
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) {
      const key = match[1] as keyof CliArgs;
      (args as Record<string, string | boolean>)[key] = match[2] as string;
    }
  });
  return args;
}

function listTemplateFiles(): string[] {
  return fs
    .readdirSync(TEMPLATES_DIR)
    .filter((name) => {
      if (SKIP_FILES.has(name)) return false;
      if (/LATER\./i.test(name)) return false;
      return /\.(ts|js)$/.test(name);
    })
    .sort();
}

function findEntry(templateId: string): TemplateCatalogEntry | undefined {
  const needle = String(templateId).toLowerCase();
  return CATALOG.find((entry) => entry.ids.some((id) => id.toLowerCase() === needle));
}

function findTemplate(templateId: string): TemplateRegistration {
  const needle = String(templateId).toLowerCase();
  const template = templates.find((entry) =>
    [entry.id, entry.name, ...entry.aliases].some((id) => id.toLowerCase() === needle)
  );
  if (!template) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${CATALOG.flatMap((item) => item.ids).join(', ')}`
    );
  }
  return template;
}

function slugFromId(templateId: string): string {
  const entry = findEntry(templateId);
  return (entry ? entry.ids[0] : String(templateId))
    .replace(/Email$/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function loadPayload(templateId: string, dataPath?: string): unknown {
  if (dataPath) return requireData(path.resolve(process.cwd(), dataPath));
  if (SAMPLE_PAYLOADS[templateId]) return SAMPLE_PAYLOADS[templateId];
  const slugs = [templateId, slugFromId(templateId)];
  for (const slug of slugs) {
    const candidate = path.join(DATA_DIR, `${slug}.data.js`);
    if (fs.existsSync(candidate)) return requireData(candidate);
  }
  throw new Error(
    `No payload for "${templateId}". Pass --data=path or add a sample on the template.`
  );
}

function writeHtml(outPath: string, html: string): string {
  const resolvedOutPath = path.resolve(process.cwd(), outPath);
  fs.mkdirSync(path.dirname(resolvedOutPath), { recursive: true });
  fs.writeFileSync(resolvedOutPath, html, 'utf8');
  return resolvedOutPath;
}

function reviveDates(value: unknown): unknown {
  if (value instanceof Date) return value;
  if (
    value &&
    typeof value === 'object' &&
    '__date' in value &&
    typeof (value as { __date?: unknown }).__date === 'string'
  ) {
    return new Date((value as { __date: string }).__date);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  if (Array.isArray(value)) return value.map(reviveDates);
  if (value && typeof value === 'object') {
    const next: Record<string, unknown> = {};
    Object.keys(value as Record<string, unknown>).forEach((key) => {
      const current = (value as Record<string, unknown>)[key];
      next[key] = key === 'signupDate' ? new Date(current as string | Date) : reviveDates(current);
    });
    return next;
  }
  return value;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const templateFiles = listTemplateFiles();
  if (args.list) {
    console.log('Files in src/templates:');
    templateFiles.forEach((file) => console.log(`  ${file}`));
    console.log('Generatable templates:');
    CATALOG.forEach((entry) => {
      const exists = fs.existsSync(path.join(TEMPLATES_DIR, entry.file));
      console.log(`  ${entry.ids.join(' | ')}  <- ${entry.file}${exists ? '' : ' (missing)'}`);
    });
    return;
  }
  const wantAll = args.all === true || !args.template || args.template === 'all';
  const targets = wantAll ? CATALOG.map((entry) => entry.ids[0]) : [args.template as string];
  targets.forEach((templateId) => {
    const payload = loadPayload(templateId, wantAll ? undefined : args.data);
    const html = findTemplate(templateId).render(reviveDates(payload));
    const fileName = `${slugFromId(templateId)}.html`;
    const outPath = wantAll
      ? path.join(args.out || DEFAULT_OUT_DIR, fileName)
      : args.out || path.join(DEFAULT_OUT_DIR, fileName);
    console.log(writeHtml(outPath, html));
  });
  if (wantAll) {
    const catalogFiles = new Set(CATALOG.map((entry) => entry.file));
    const extra = templateFiles.filter((file) => !catalogFiles.has(file));
    if (extra.length) console.warn(`Warning: src/templates files not in generate catalog: ${extra.join(', ')}`);
  }
}

main();
