import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const GENERATED = path.resolve(process.cwd(), 'generated');

const BASELINE = [
  {
    file: 'password-reset.html',
    contains: ['reset your password', 'fixture-token-123'],
  },
  {
    file: 'order-confirmation.html',
    contains: ['#1001', '$49.00'],
  },
  {
    file: 'welcome.html',
    contains: ['Confirm email', 'https://example.com/confirm'],
  },
  {
    file: 'invoice.html',
    contains: ['INV-2026-0001'],
  },
  {
    file: 'trial-expiring.html',
    contains: ['trial', 'Pro'],
  },
  {
    file: 'user-invitation.html',
    contains: ['Acme', 'alex@example.com'],
  },
] as const;

describe('generated HTML baseline', () => {
  it('lists all six snapshot files', () => {
    const missing = BASELINE.filter(({ file }) => !existsSync(path.join(GENERATED, file))).map(
      ({ file }) => file
    );
    expect(missing, 'run npm run generate:template -- --all').toEqual([]);
  });

  for (const { file, contains } of BASELINE) {
    it(`${file} contains expected markers`, () => {
      const html = readFileSync(path.join(GENERATED, file), 'utf8');
      expect(html.startsWith('<!DOCTYPE html') || html.includes('<html')).toBe(true);
      for (const marker of contains) {
        expect(html.toLowerCase()).toContain(marker.toLowerCase());
      }
    });
  }
});
