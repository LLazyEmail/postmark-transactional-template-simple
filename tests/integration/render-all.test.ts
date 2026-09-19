// tests/integration/render-all.test.ts
import { describe, it, expect } from 'vitest';
import {
  renderTemplate,
  listTemplates,
  getTemplate,
} from '../../src/templates/registry';

import {
  invoiceProps,
  trialExpiringProps,
  userInvitationProps,
  welcomeMinimalProps,
  passwordResetProps,
  orderConfirmationProps,
} from '../fixtures/props';

const payloads: Record<string, unknown> = {
  InvoiceEmail: invoiceProps,
  TrialExpiringEmail: trialExpiringProps,
  UserInvitationEmail: userInvitationProps,
  WelcomeEmail: welcomeMinimalProps,
  PasswordResetEmail: passwordResetProps,
  OrderConfirmationEmail: orderConfirmationProps,
};

/**
 * Templates whose minimal-input path intentionally produces a compact
 * fragment rather than a full Postmark-style document. These still must
 * render valid HTML, but the assertion is looser.
 *
 * See: WelcomeEmail.render() — when action_url is absent it returns the
 * original compact body for backward compatibility.
 */
const COMPACT_TEMPLATES = new Set(['WelcomeEmail']);

describe('integration: render every registered template', () => {
  const names = listTemplates();

  it.each(names)('renders %s without throwing', (name) => {
    const payload = payloads[name];
    expect(payload, `Missing fixture for ${name}`).toBeDefined();

    expect(() => renderTemplate(name, payload)).not.toThrow();
  });

  it.each(names)('renders %s to valid HTML', (name) => {
    const html = renderTemplate(name, payloads[name]);

    if (COMPACT_TEMPLATES.has(name)) {
      // Compact path: <html> ... </html>, no doctype requirement.
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
    } else {
      // Full document path: doctype + html + body, non-trivial size.
      expect(html).toMatch(/^<!DOCTYPE html/);
      expect(html).toContain('<html');
      expect(html).toContain('</html>');
      expect(html).toContain('<body');
      expect(html.length).toBeGreaterThan(500);
    }
  });

  it('every template is reachable via its canonical name', () => {
    for (const name of names) {
      expect(() => getTemplate(name)).not.toThrow();
    }
  });

  it('every template is reachable via its lowercase name', () => {
    for (const name of names) {
      expect(() => getTemplate(name.toLowerCase())).not.toThrow();
    }
  });

  it('every template render is deterministic', () => {
    for (const name of names) {
      const a = renderTemplate(name, payloads[name]);
      const b = renderTemplate(name, payloads[name]);
      expect(a, `${name} is not deterministic`).toBe(b);
    }
  });
});