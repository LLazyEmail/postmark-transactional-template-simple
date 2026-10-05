#!/usr/bin/env node
/**
 * Thin assert wrapper. The HTML check lives in @llazyemail/generate-template.
 * Flags: --out= --slugs=a,b --slugs-file=path.json
 */
import { runAssertGenerated } from '@llazyemail/generate-template';
import slugs from '../tests/fixtures/generated-slugs.json' with { type: 'json' };

runAssertGenerated({ slugs, argv: process.argv.slice(2) });
