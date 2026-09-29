#!/usr/bin/env node
/**
 * CLI flags (must stay compatible):
 *   --list
 *   --all
 *   --template=<id>
 *   --data=<path>
 *   --out=<file-or-dir>
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
