import { describe, expect, it } from 'vitest';
import { createProjectGenerator } from '../../scripts/create-project-generator.ts';

/**
 * Step 6: render through the module and assert the HTML still contains
 * the known markers. If a marker disappears after an npm bump, that is
 * a module bug (step 7) — publish a fix, do not fork the engine here.
 */
const MARKERS: Record<string, string[]> = {
  'password-reset': ['fixture-token-123', 'Reset your password'],
  'order-confirmation': ['1001', '$49.00'],
  WelcomeEmail: ['Confirm email', 'https://example.com/confirm'],
  InvoiceEmail: ['INV-2026-0001'],
  TrialExpiringEmail: ['trial', 'Pro'],
  UserInvitationEmail: ['Acme', 'alex@example.com'],
};

describe('generate HTML diff (step 6)', () => {
  const generate = createProjectGenerator();

  for (const [id, markers] of Object.entries(MARKERS)) {
    it(`${id} still contains baseline markers`, async () => {
      const html = await generate.render(id);
      expect(html).toMatch(/<!DOCTYPE html|<html/i);
      for (const marker of markers) {
        expect(html.toLowerCase()).toContain(marker.toLowerCase());
      }
    });
  }

  it('WelcomeEmail still revives signupDate as a date string, not [object Object]', async () => {
    const html = await generate.render('WelcomeEmail');
    expect(html).not.toContain('[object Object]');
    expect(html).toMatch(/2026|Jan|signed up/i);
  });
});
