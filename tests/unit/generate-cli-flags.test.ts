import { describe, expect, it } from 'vitest';
import { createProjectGenerator, GENERATE_FLAGS } from '../../scripts/create-project-generator.ts';

describe('generate CLI flags (step 5)', () => {
  const generate = createProjectGenerator();

  it('keeps the supported flag set', () => {
    expect(GENERATE_FLAGS).toEqual(['--list', '--all', '--template=', '--data=', '--out=']);
  });

  it('--list has a catalog of named renderers', () => {
    expect(generate.catalog.length).toBeGreaterThanOrEqual(6);
    for (const entry of generate.catalog) {
      expect(entry.ids.length).toBeGreaterThan(0);
      expect(entry.render).toBeTruthy();
    }
  });

  it('--template=WelcomeEmail resolves through an alias', () => {
    expect(generate.find('WelcomeEmail')).toBeTruthy();
    expect(generate.find('welcome')).toBeTruthy();
  });

  it('--all writes slug.html names for the baseline six', () => {
    const expected = {
      'password-reset': 'password-reset',
      'order-confirmation': 'order-confirmation',
      WelcomeEmail: 'welcome',
      InvoiceEmail: 'invoice',
      TrialExpiringEmail: 'trial-expiring',
      UserInvitationEmail: 'user-invitation',
    } as const;

    for (const [id, slug] of Object.entries(expected)) {
      expect(generate.slug(id)).toBe(slug);
    }
  });

  it('unknown --template fails from the module, not a local workaround', async () => {
    await expect(generate.render('not-a-template')).rejects.toThrow();
  });
});
