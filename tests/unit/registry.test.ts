// tests/unit/registry.test.ts
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

describe('registry', () => {
  describe('listTemplates', () => {
    it('returns every registered template name', () => {
      const names = listTemplates();
      expect(names).toEqual(
        expect.arrayContaining([
          'PasswordResetEmail',
          'OrderConfirmationEmail',
          'InvoiceEmail',
          'WelcomeEmail',
          'TrialExpiringEmail',
          'UserInvitationEmail',
        ])
      );
    });

    it('returns names without duplicates', () => {
      const names = listTemplates();
      expect(new Set(names).size).toBe(names.length);
    });
  });

  describe('renderTemplate — canonical names', () => {
    it('renders InvoiceEmail from its canonical name', () => {
      const html = renderTemplate('InvoiceEmail', invoiceProps);
      expect(html).toContain('INV-2026-0001');
      expect(html).toContain(invoiceProps.total);
    });

    it('renders TrialExpiringEmail from its canonical name', () => {
      const html = renderTemplate('TrialExpiringEmail', trialExpiringProps);
      expect(html).toContain(trialExpiringProps.plan_name);
      expect(html).toContain(trialExpiringProps.trial_end_date);
    });

    it('renders UserInvitationEmail from its canonical name', () => {
      const html = renderTemplate('UserInvitationEmail', userInvitationProps);
      expect(html).toContain(userInvitationProps.inviter_name);
      expect(html).toContain(userInvitationProps.role);
    });

    it('renders WelcomeEmail (minimal) from its canonical name', () => {
      const html = renderTemplate('WelcomeEmail', welcomeMinimalProps);
      expect(html).toContain('Welcome, Alex!');
    });
  });

  describe('renderTemplate — legacy IDs', () => {
    it('resolves "password-reset" to the PasswordResetEmail template', () => {
      const html = renderTemplate('password-reset', passwordResetProps);
      expect(html).toContain(passwordResetProps.action_url);
    });

    it('resolves "order-confirmation" to the OrderConfirmationEmail template', () => {
      const html = renderTemplate('order-confirmation', orderConfirmationProps);
      expect(html).toContain(orderConfirmationProps.order_id);
    });
  });

  describe('renderTemplate — case insensitivity', () => {
    it('accepts lowercase', () => {
      expect(() =>
        renderTemplate('invoiceemail', invoiceProps)
      ).not.toThrow();
    });

    it('accepts mixed case', () => {
      expect(() =>
        renderTemplate('InvoiceEmail', invoiceProps)
      ).not.toThrow();
    });
  });

  describe('renderTemplate — error handling', () => {
    it('throws with a helpful message for unknown IDs', () => {
      expect(() => renderTemplate('does-not-exist', {})).toThrow(
        /Unknown template id: "does-not-exist"/
      );
    });

    it('lists available templates in the error message', () => {
      try {
        renderTemplate('does-not-exist', {});
        throw new Error('expected to throw');
      } catch (err) {
        expect((err as Error).message).toContain('InvoiceEmail');
        expect((err as Error).message).toContain('PasswordResetEmail');
      }
    });
  });

  describe('getTemplate', () => {
    it('returns a template object with id, name, and render', () => {
      const tpl = getTemplate('InvoiceEmail');
      expect(tpl).toHaveProperty('id');
      expect(tpl).toHaveProperty('name');
      expect(typeof tpl.render).toBe('function');
    });

    it('throws for unknown IDs', () => {
      expect(() => getTemplate('nope')).toThrow(/Unknown template id/);
    });
  });
});