// tests/unit/email-system.test.ts
// Covers the derived surface of createEmailSystem() with fake modules, so the
// contract is tested without touching the real manifest.
import { describe, it, expect } from 'vitest';
import { defineEmail, lookupKeys } from '../../src/templates/defineEmail.ts';
import { createEmailSystem } from '../../src/templates/system.ts';

const alpha = defineEmail<{ title: string }>({
  id: 'AlphaEmail',
  aliases: ['alpha', 'legacy-alpha'],
  name: 'AlphaEmail',
  file: 'alpha/alphaEmail.ts',
  exportName: 'alpha',
  data: { title: 'hello' },
  render: ({ title }) => `<h1>${title}</h1>`,
});

const beta = defineEmail<{ count: number }>({
  id: 'BetaEmail',
  name: 'BetaEmail',
  file: 'beta/betaEmail.ts',
  exportName: 'beta',
  checks: [{ field: 'count', errorMessage: 'count is required' }],
  data: { count: 2 },
  render: ({ count }) => `<p>${count}</p>`,
});

const system = createEmailSystem([alpha, beta]);

describe('defineEmail', () => {
  it('defaults aliases to an empty list', () => {
    expect(beta.aliases).toEqual([]);
  });

  it('lookupKeys returns id, name, and aliases', () => {
    expect(lookupKeys(alpha)).toEqual(['AlphaEmail', 'AlphaEmail', 'alpha', 'legacy-alpha']);
  });
});

describe('createEmailSystem', () => {
  it('derives byId and byName from the module list', () => {
    expect(system.byId.AlphaEmail).toBe(alpha);
    expect(system.byName.BetaEmail).toBe(beta);
  });

  it('derives templateData keyed by canonical id', () => {
    expect(system.templateData).toEqual({
      AlphaEmail: { title: 'hello' },
      BetaEmail: { count: 2 },
    });
  });

  it('lookup resolves id, name, alias, and any casing', () => {
    expect(system.lookup('AlphaEmail')).toBe(alpha);
    expect(system.lookup('alphaemail')).toBe(alpha);
    expect(system.lookup('legacy-alpha')).toBe(alpha);
    expect(system.lookup('LEGACY-ALPHA')).toBe(alpha);
    expect(system.lookup('nope')).toBeUndefined();
  });

  it('listTemplates preserves registration order', () => {
    expect(system.listTemplates()).toEqual(['AlphaEmail', 'BetaEmail']);
  });

  it('getTemplate throws with the available list for unknown ids', () => {
    expect(() => system.getTemplate('nope')).toThrow(
      'Unknown template id: "nope". Available: AlphaEmail, BetaEmail'
    );
  });

  it('renderTemplate passes the payload through to render', () => {
    expect(system.renderTemplate('AlphaEmail', { title: 'hi' })).toBe('<h1>hi</h1>');
  });

  it('renderTemplate runs declared checks before render', () => {
    expect(() => system.renderTemplate('BetaEmail', { count: 3 })).not.toThrow();
    expect(() => system.renderTemplate('BetaEmail', {})).toThrow();
  });
});
