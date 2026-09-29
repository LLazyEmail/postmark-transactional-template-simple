#!/usr/bin/env node
/**
 * Project entry for generate-template.
 * Catalog and sample payloads come from the template manifest.
 * Each catalog entry injects `render` so the package does not load template files.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGenerator } from '@llazyemail/generate-template';
import { lookupKeys, templates } from '../src/templates/manifest.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const catalog = templates.map((template) => ({
  ids: lookupKeys(template),
  file: template.file,
  exportName: template.exportName,
  render: template,
}));

const samplePayloads: Record<string, unknown> = {};
for (const template of templates) {
  for (const id of lookupKeys(template)) {
    samplePayloads[id] = template.sample;
  }
}

const generate = createGenerator({
  root: ROOT,
  templatesDir: 'src/templates',
  dataDir: 'src/data',
  outDir: 'generated',
  reviveDates: true,
  catalog,
  samplePayloads,
});

function flag(name: string): string | undefined {
  const prefix = `--${name}=`;
  const hit = process.argv.find((arg) => arg.startsWith(prefix));
  return hit ? hit.slice(prefix.length) : undefined;
}

async function run(): Promise<void> {
  if (process.argv.includes('--list')) {
    console.log('Generatable templates:');
    generate.catalog.forEach((entry) => {
      console.log(`  ${entry.ids.join(' | ')}  <- renderer`);
    });
    return;
  }

  const templateFlag = flag('template');
  const wantAll = process.argv.includes('--all') || !templateFlag || templateFlag === 'all';
  const targets = wantAll
    ? generate.catalog.map((entry) => {
        const id = entry.ids[0];
        if (!id) throw new Error('Catalog entry is missing an id');
        return id;
      })
    : [templateFlag as string];

  for (const templateId of targets) {
    const result = await generate.run({
      templateId,
      dataPath: wantAll ? undefined : flag('data'),
      write: {
        out: wantAll
          ? path.join(flag('out') || generate.outDir, `${generate.slug(templateId)}.html`)
          : flag('out') || path.join(generate.outDir, `${generate.slug(templateId)}.html`),
      },
    });
    if (result.path) console.log(result.path);
  }
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
