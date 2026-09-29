import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGenerator } from '@llazyemail/generate-template';
import { lookupKeys, templates } from '../src/templates/manifest.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const GENERATE_FLAGS = ['--list', '--all', '--template=', '--data=', '--out='] as const;

export function createProjectGenerator() {
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

  return createGenerator({
    root: ROOT,
    templatesDir: 'src/templates',
    dataDir: 'src/data',
    outDir: 'generated',
    reviveDates: true,
    catalog,
    samplePayloads,
  });
}
