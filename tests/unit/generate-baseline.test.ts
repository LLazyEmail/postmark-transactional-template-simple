import { describe, expect, it } from 'vitest';
import { lookupKeys, templates } from '../../src/templates/manifest.ts';
import { templateData } from '../../src/templates/registry.ts';
import { InvoiceEmail } from '../../src/templates/invoice/invoiceEmail';
import { orderConfirmation } from '../../src/templates/order-confirmation/orderConfirmationEmail';
import { passwordReset } from '../../src/templates/password-reset/passwordResetEmail';
import { TrialExpiringEmail } from '../../src/templates/trial-expiring/trialExpiringEmail';
import { UserInvitationEmail } from '../../src/templates/user-invitation/userInvitationEmail';
import { WelcomeEmail } from '../../src/templates/welcome/welcomeEmail';

/** Output names `npm run generate:template -- --all` must keep writing. */
export const BASELINE_FILES = [
  'password-reset.html',
  'order-confirmation.html',
  'welcome.html',
  'invoice.html',
  'trial-expiring.html',
  'user-invitation.html',
] as const;

const samples: Record<string, unknown> = {};
for (const template of templates) {
  for (const id of lookupKeys(template)) {
    samples[id] = templateData[template.id];
  }
}

function htmlFrom(template: { render: (payload: never) => string }, payload: unknown): string {
  return template.render(payload as never);
}

describe('generate-template baseline', () => {
  it('keeps the six output filenames', () => {
    expect(BASELINE_FILES).toHaveLength(6);
  });

  it('password-reset still renders the reset link', () => {
    const html = htmlFrom(passwordReset, samples['password-reset']);
    expect(html).toContain('fixture-token-123');
    expect(html.toLowerCase()).toContain('reset');
  });

  it('order-confirmation still renders order 1001', () => {
    const html = htmlFrom(orderConfirmation, samples['order-confirmation']);
    expect(html).toContain('1001');
    expect(html).toContain('$49.00');
  });

  it('WelcomeEmail still renders the confirm CTA', () => {
    const html = htmlFrom(WelcomeEmail, samples.WelcomeEmail);
    expect(html).toContain('Confirm email');
    expect(html).toContain('https://example.com/confirm');
  });

  it('InvoiceEmail still renders INV-2026-0001', () => {
    const html = htmlFrom(InvoiceEmail, samples.InvoiceEmail);
    expect(html).toContain('INV-2026-0001');
  });

  it('TrialExpiringEmail still mentions the Pro trial', () => {
    const html = htmlFrom(TrialExpiringEmail, samples.TrialExpiringEmail);
    expect(html.toLowerCase()).toContain('trial');
    expect(html).toContain('Pro');
  });

  it('UserInvitationEmail still names Acme and Alex', () => {
    const html = htmlFrom(UserInvitationEmail, samples.UserInvitationEmail);
    expect(html).toContain('Acme');
    expect(html).toContain('alex@example.com');
  });
});
