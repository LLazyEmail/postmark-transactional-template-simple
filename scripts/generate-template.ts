#!/usr/bin/env node
/**
 * Thin project CLI. Catalog/renderers live in create-project-generator.ts.
 * Flags: --list --all --template= --data= --out=
 */
import path from 'node:path';
import { createProjectGenerator } from './create-project-generator.ts';

const generate = createProjectGenerator();

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

  if (wantAll) {
    const paths = await generate.writeAll(flag('out') || generate.outDir);
    paths.forEach((filePath) => console.log(filePath));
    return;
  }

  const result = await generate.run({
    templateId: templateFlag as string,
    dataPath: flag('data'),
    write: {
      out: flag('out') || path.join(generate.outDir, `${generate.slug(templateFlag as string)}.html`),
    },
  });
  if (result.path) console.log(result.path);
}

run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
