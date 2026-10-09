#!/usr/bin/env node
/**
 * Optional project wrapper. The npm script uses the published bin, which
 * loads generate-template.config.ts. This file still works if a caller
 * wants to pass the generator in-process.
 * Flags: --list --all --template= --data= --out=
 */
import { main } from '@llazyemail/generate-template';
import { createProjectGenerator } from './create-project-generator.ts';

main(process.argv.slice(2), createProjectGenerator()).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
