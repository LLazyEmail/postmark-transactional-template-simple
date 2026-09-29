import { mkdtempSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import slugs from '../fixtures/generated-slugs.json';
import { createProjectGenerator } from '../../scripts/create-project-generator.ts';

describe('generate writeAll snapshot (step 9)', () => {
  it('writes every baseline slug into a temp dir', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'generate-all-'));
    const generate = createProjectGenerator();
    const paths = await generate.writeAll(dir);
    expect(paths.length).toBeGreaterThanOrEqual(slugs.length);
    for (const slug of slugs) {
      const filePath = path.join(dir, `${slug}.html`);
      expect(existsSync(filePath), filePath).toBe(true);
      const html = readFileSync(filePath, 'utf8');
      expect(html).toMatch(/<!DOCTYPE html|<html/i);
    }
  });
});
