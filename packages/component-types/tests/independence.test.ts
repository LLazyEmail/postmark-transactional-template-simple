import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { COMPONENT_KEYS } from '../src/catalog/keys.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) return sourceFiles(file);
    return file.endsWith('.ts') ? [file] : [];
  });
}

describe('independence', () => {
  it('does not import the host repository or another package', () => {
    const offenders: string[] = [];
    for (const file of sourceFiles(SRC)) {
      const text = readFileSync(file, 'utf8');
      const relative = path.relative(ROOT, file);
      if (text.includes("from '") && /from ['"](?!\.|@llazyemail\/component-types)/.test(text)) {
        offenders.push(relative);
      }
      if (text.includes('../src/') || text.includes('../../src/') || text.includes('postmark')) {
        offenders.push(relative);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('keeps catalog keys unique', () => {
    expect(new Set(COMPONENT_KEYS).size).toBe(COMPONENT_KEYS.length);
    expect(COMPONENT_KEYS).toContain('buttonComponent');
    expect(COMPONENT_KEYS).toContain('separatorComponent');
  });
});
