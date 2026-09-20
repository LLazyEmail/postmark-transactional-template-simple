#!/usr/bin/env node
/**
 * Generate HTML for one or every template under src/templates.
 *
 * Usage:
 *   npm run generate:template
 *   npm run generate:template -- --all
 *   npm run generate:template -- --list
 *   npm run generate:template -- --template=WelcomeEmail
 *   npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html
 *
 * Arguments:
 *   --template   template id or name (omit or pass "all" to render every template)
 *   --data       path to a payload module (single-template mode only)
 *   --out        output HTML file (single) or output directory (all)
 *   --list       print discovered templates and exit
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { CATALOG, SAMPLE_PAYLOADS } = require('./template-catalog');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DEFAULT_OUT_DIR = 'generated';

const SKIP_FILES = new Set([
  'index.js',
  'index2.js',
  'registry.ts',
  'registry.js',
]);

function parseArgs(argv) {
  const args = {};
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
      args[match[1]] = match[2];
    }
  });
  return args;
}

function listTemplateFiles() {
  return fs
    .readdirSync(TEMPLATES_DIR)
    .filter((name) => {
      if (SKIP_FILES.has(name)) return false;
      if (/LATER\./i.test(name)) return false;
      return /\.(ts|js)$/.test(name);
    })
    .sort();
}

function findEntry(templateId) {
  const needle = String(templateId).toLowerCase();
  return CATALOG.find((entry) =>
    entry.ids.some((id) => id.toLowerCase() === needle)
  );
}

function slugFromId(templateId) {
  const entry = findEntry(templateId);
  return (entry ? entry.ids[0] : String(templateId))
    .replace(/Email$/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function loadPayload(templateId, dataPath) {
  if (dataPath) {
    return require(path.resolve(process.cwd(), dataPath));
  }

  if (SAMPLE_PAYLOADS[templateId]) {
    return SAMPLE_PAYLOADS[templateId];
  }

  const slugs = [templateId, slugFromId(templateId)];
  for (const slug of slugs) {
    const candidate = path.join(DATA_DIR, `${slug}.data.js`);
    if (fs.existsSync(candidate)) {
      return require(candidate);
    }
  }

  throw new Error(
    `No payload for "${templateId}". Pass --data=path or add src/data/${slugFromId(
      templateId
    )}.data.js`
  );
}

function writeHtml(outPath, html) {
  const resolvedOutPath = path.resolve(process.cwd(), outPath);
  fs.mkdirSync(path.dirname(resolvedOutPath), { recursive: true });
  fs.writeFileSync(resolvedOutPath, html, 'utf8');
  return resolvedOutPath;
}

function serializePayload(payload) {
  return JSON.stringify(payload, (_key, value) =>
    value instanceof Date ? { __date: value.toISOString() } : value
  );
}

function runStripTypes(source) {
  const tmpFile = path.join(
    os.tmpdir(),
    `generate-template-${process.pid}-${Date.now()}.mts`
  );
  fs.writeFileSync(tmpFile, source, 'utf8');
  try {
    const result = spawnSync(
      process.execPath,
      ['--experimental-strip-types', '--no-warnings', tmpFile],
      { encoding: 'utf8', cwd: ROOT, maxBuffer: 10 * 1024 * 1024 }
    );
    if (result.status !== 0) {
      const err = (result.stderr || result.stdout || '').trim();
      throw new Error(err || `node exited ${result.status}`);
    }
    return result.stdout;
  } finally {
    fs.rmSync(tmpFile, { force: true });
  }
}

function reviveDates(value) {
  if (value instanceof Date) return value;
  if (value && typeof value === 'object' && typeof value.__date === 'string') {
    return new Date(value.__date);
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  if (Array.isArray(value)) return value.map(reviveDates);
  if (value && typeof value === 'object') {
    const next = {};
    Object.keys(value).forEach((key) => {
      next[key] = key === 'signupDate' ? new Date(value[key]) : reviveDates(value[key]);
    });
    return next;
  }
  return value;
}

function renderOne(templateId, payload) {
  const entry = findEntry(templateId);
  if (!entry) {
    const available = CATALOG.flatMap((item) => item.ids).join(', ');
    throw new Error(`Unknown template id: "${templateId}". Available: ${available}`);
  }

  const modulePath = path.join(TEMPLATES_DIR, entry.file);
  if (!fs.existsSync(modulePath)) {
    throw new Error(`Template file missing: ${path.relative(ROOT, modulePath)}`);
  }

  const payloadPath = path.join(
    os.tmpdir(),
    `generate-template-payload-${process.pid}-${Date.now()}.json`
  );
  fs.writeFileSync(payloadPath, serializePayload(reviveDates(payload)), 'utf8');

  const source = `
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

function revive(value) {
  if (value && typeof value === 'object' && typeof value.__date === 'string') {
    return new Date(value.__date);
  }
  if (Array.isArray(value)) return value.map(revive);
  if (value && typeof value === 'object') {
    const next = {};
    for (const [key, val] of Object.entries(value)) {
      next[key] = key === 'signupDate' ? new Date(typeof val === 'object' && val.__date ? val.__date : val) : revive(val);
    }
    return next;
  }
  return value;
}

const raw = JSON.parse(readFileSync(${JSON.stringify(payloadPath)}, 'utf8'));
const mod = await import(pathToFileURL(${JSON.stringify(modulePath)}).href);
const exported = mod[${JSON.stringify(entry.exportName)}] ?? mod.default;
if (!exported) {
  throw new Error('Export "${entry.exportName}" not found in ${entry.file}');
}
const html = typeof exported === 'function'
  ? exported(revive(raw))
  : exported.render(revive(raw));
process.stdout.write(html);
`;

  try {
    return runStripTypes(source);
  } finally {
    fs.rmSync(payloadPath, { force: true });
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const templateFiles = listTemplateFiles();

  if (args.list) {
    console.log('Files in src/templates:');
    templateFiles.forEach((file) => {
      console.log(`  ${file}`);
    });
    console.log('Generatable templates:');
    CATALOG.forEach((entry) => {
      const exists = fs.existsSync(path.join(TEMPLATES_DIR, entry.file));
      console.log(
        `  ${entry.ids.join(' | ')}  <- ${entry.file}${exists ? '' : ' (missing)'}`
      );
    });
    return;
  }

  const wantAll = args.all === true || !args.template || args.template === 'all';
  const targets = wantAll ? CATALOG.map((entry) => entry.ids[0]) : [args.template];

  targets.forEach((templateId) => {
    const payload = loadPayload(templateId, wantAll ? undefined : args.data);
    const html = renderOne(templateId, payload);
    const fileName = `${slugFromId(templateId)}.html`;
    const outPath = wantAll
      ? path.join(args.out || DEFAULT_OUT_DIR, fileName)
      : args.out || path.join(DEFAULT_OUT_DIR, fileName);
    const written = writeHtml(outPath, html);
    console.log(written);
  });

  if (wantAll) {
    const catalogFiles = new Set(CATALOG.map((entry) => entry.file));
    const extra = templateFiles.filter((file) => !catalogFiles.has(file));
    if (extra.length) {
      console.warn(`Warning: src/templates files not in generate catalog: ${extra.join(', ')}`);
    }
  }
}

main();
