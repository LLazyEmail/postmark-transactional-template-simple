#!/usr/bin/env node
/**
 * Thin project CLI. Catalog and renderers live in create-project-generator.ts.
 * Flag parsing and the run loop come from @llazyemail/generate-template.
 * Flags: --list --all --template= --data= --out=
 */
import { main } from '@llazyemail/generate-template';
import { createProjectGenerator } from './create-project-generator.ts';

main(process.argv.slice(2), createProjectGenerator()).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
