#!/usr/bin/env node
/**
 * Thin wrapper around @llazyemail/generate-template.
 * Catalog and sample payloads stay in this repo. Render functions come
 * from the manifest so the package does not load template files itself.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGenerator } from '@llazyemail/generate-template';
import { CATALOG, SAMPLE_PAYLOADS } from './template-catalog.ts';
import { templates } from '../src/templates/manifest.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');

const SKIP_FILES = [
  'index.js',
  'index2.js',
  'registry.ts',
  'registry.js',
  'defineTemplate.ts',
  'manifest.ts',
  'legacySamples.ts',
  'order-confirmation.definitionLATER.js',
  'password-reset.definitionLATER.js',
];

const byExport = new Map(templates.map((template) => [template.exportName, template]));

const generate = createGenerator({
  root: ROOT,
  templatesDir: 'src/templates',
  dataDir: 'src/data',
  outDir: 'generated',
  reviveDates: true,
  skipFiles: SKIP_FILES,
  catalog: CATALOG.map((entry) => {
    const template = byExport.get(entry.exportName);
    if (!template) {
      throw new Error(`No render function for catalog export "${entry.exportName}"`);
    }
    return {
      ids: [...entry.ids],
      file: entry.file,
      exportName: entry.exportName,
      render: template,
    };
  }),
  samplePayloads: SAMPLE_PAYLOADS,
});

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
      if (SKIP_FILES.includes(name)) return false;
      if (/LATER\./i.test(name)) return false;
      return /\.(ts|js)$/.test(name);
    })
    .sort();
}

async function main(argv: string[]): Promise<void> {
  const args = parseArgs(argv);
  const templateFiles = listTemplateFiles();

  if (args.list) {
    console.log('Files in src/templates:');
    templateFiles.forEach((file) => console.log(`  ${file}`));
    console.log('Generatable templates:');
    generate.catalog.forEach((entry) => {
      const exists = entry.render
        ? true
        : Boolean(entry.file && fs.existsSync(path.join(TEMPLATES_DIR, entry.file)));
      const source = entry.render ? 'renderer' : entry.file ?? '(no source)';
      console.log(`  ${entry.ids.join(' | ')}  <- ${source}${exists ? '' : ' (missing)'}`);
    });
    return;
  }

  const wantAll = args.all === true || !args.template || args.template === 'all';
  const targets = wantAll
    ? generate.catalog.map((entry) => {
        const id = entry.ids[0];
        if (!id) throw new Error('Catalog entry is missing an id');
        return id;
      })
    : [args.template as string];

  for (const templateId of targets) {
    const result = await generate.run({
      templateId,
      dataPath: wantAll ? undefined : args.data,
      write: {
        out: wantAll
          ? path.join(args.out || generate.outDir, `${generate.slug(templateId)}.html`)
          : args.out || path.join(generate.outDir, `${generate.slug(templateId)}.html`),
      },
    });
    if (result.path) console.log(result.path);
  }

  if (wantAll) {
    const catalogFiles = new Set(generate.catalog.map((entry) => entry.file).filter(Boolean));
    const extra = templateFiles.filter((file) => !catalogFiles.has(file));
    if (extra.length) {
      console.warn(`Warning: template files not in catalog: ${extra.join(', ')}`);
    }
  }
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
