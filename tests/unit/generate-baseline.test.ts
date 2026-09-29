import { describe, expect, it } from 'vitest';
import { SAMPLE_PAYLOADS } from '../../scripts/template-catalog.ts';
import { InvoiceEmail } from '../../src/templates/invoiceEmail';
import { orderConfirmation } from '../../src/templates/order-confirmation.definition';
import { passwordReset } from '../../src/templates/password-reset.definition';
import { TrialExpiringEmail } from '../../src/templates/trialExpiringEmail';
import { UserInvitationEmail } from '../../src/templates/userInvitationEmail';
import { WelcomeEmail } from '../../src/templates/welcomeEmail';

/** Output names `npm run generate:template -- --all` must keep writing. */
export const BASELINE_FILES = [
  'password-reset.html',
  'order-confirmation.html',
  'welcome.html',
  'invoice.html',
  'trial-expiring.html',
  'user-invitation.html',
] as const;

function htmlFrom(template: { render: (payload: never) => string }, payload: unknown): string {
  return template.render(payload as never);
}

describe('generate-template baseline', () => {
  it('keeps the six output filenames', () => {
    expect(BASELINE_FILES).toHaveLength(6);
  });

  it('password-reset still renders the reset link', () => {
    const html = htmlFrom(passwordReset, SAMPLE_PAYLOADS['password-reset']);
    expect(html).toContain('fixture-token-123');
    expect(html.toLowerCase()).toContain('reset');
  });

  it('order-confirmation still renders order 1001', () => {
    const html = htmlFrom(orderConfirmation, SAMPLE_PAYLOADS['order-confirmation']);
    expect(html).toContain('1001');
    expect(html).toContain('$49.00');
  });

  it('WelcomeEmail still renders the confirm CTA', () => {
    const html = htmlFrom(WelcomeEmail, SAMPLE_PAYLOADS.WelcomeEmail);
    expect(html).toContain('Confirm email');
    expect(html).toContain('https://example.com/confirm');
  });

  it('InvoiceEmail still renders INV-2026-0001', () => {
    const html = htmlFrom(InvoiceEmail, SAMPLE_PAYLOADS.InvoiceEmail);
    expect(html).toContain('INV-2026-0001');
  });

  it('TrialExpiringEmail still mentions the Pro trial', () => {
    const html = htmlFrom(TrialExpiringEmail, SAMPLE_PAYLOADS.TrialExpiringEmail);
    expect(html.toLowerCase()).toContain('trial');
    expect(html).toContain('Pro');
  });

  it('UserInvitationEmail still names Acme and Alex', () => {
    const html = htmlFrom(UserInvitationEmail, SAMPLE_PAYLOADS.UserInvitationEmail);
    expect(html).toContain('Acme');
    expect(html).toContain('alex@example.com');
  });
});
