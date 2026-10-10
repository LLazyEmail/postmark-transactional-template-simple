import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseArgs, requestsFromArgs } from '@llazyemail/generate-template';
import { createProjectGenerator as configFactory } from '../../generate-template.config.ts';
import { createProjectGenerator, GENERATE_FLAGS } from '../../scripts/create-project-generator.ts';

describe('generate CLI flags (step 5)', () => {
  const generate = createProjectGenerator();

  it('config exports the same factory the bin loads', () => {
    expect(configFactory).toBe(createProjectGenerator);
    expect(configFactory().catalog.length).toBeGreaterThanOrEqual(6);
  });

  it('keeps the supported flag set', () => {
    expect(GENERATE_FLAGS).toEqual(['--list', '--all', '--template=', '--data=', '--out=']);
  });

  it('parses flags with the package CLI', () => {
    expect(parseArgs(['--list'])).toEqual({ list: true });
    expect(parseArgs(['--all', '--out=generated'])).toEqual({ all: true, out: 'generated' });
    expect(parseArgs(['--template=welcome', '--data=src/data/welcome.data.js'])).toEqual({
      template: 'welcome',
      data: 'src/data/welcome.data.js',
    });
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

    const requests = requestsFromArgs({ all: true, out: 'generated' }, generate);
    for (const [id, slug] of Object.entries(expected)) {
      expect(generate.slug(id)).toBe(slug);
      const request = requests.find((item) => item.templateId === id);
      expect(request?.write).toEqual({ out: path.join('generated', `${slug}.html`) });
    }
  });

  it('unknown --template fails from the module, not a local workaround', async () => {
    await expect(generate.render('not-a-template')).rejects.toThrow();
  });
});
