#!/usr/bin/env node
/**
 * Thin wrapper around @llazyemail/generate-template.
 * Catalog and sample payloads stay in this repo.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createGenerator, main } from '@llazyemail/generate-template';
import { CATALOG, SAMPLE_PAYLOADS } from './template-catalog.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const generate = createGenerator({
  root: ROOT,
  templatesDir: 'src/templates',
  dataDir: 'src/data',
  outDir: 'generated',
  catalog: CATALOG,
  samplePayloads: SAMPLE_PAYLOADS,
});

await main(process.argv.slice(2), generate);
