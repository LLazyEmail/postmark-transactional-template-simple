// tests/unit/welcomeEmail.test.ts
import { describe, it, expect } from 'vitest';
import { WelcomeEmail } from '../../src/templates/welcomeEmail';
import { welcomeMinimalProps, welcomeRichProps } from '../fixtures/props';

describe('WelcomeEmail', () => {
  it('has the expected canonical name', () => {
    expect(WelcomeEmail.name).toBe('WelcomeEmail');
  });

  describe('minimal path (no action_url)', () => {
    it('renders the simple body', () => {
      const html = WelcomeEmail.render(welcomeMinimalProps);
      expect(html).toContain('Welcome, Alex!');
      expect(html).toContain(
        `Thanks for signing up on ${welcomeMinimalProps.signupDate.toDateString()}.`
      );
    });

    it('does not include the Postmark shell', () => {
      const html = WelcomeEmail.render(welcomeMinimalProps);
      expect(html).not.toContain('email-wrapper');
      expect(html).not.toContain('body-action');
    });
  });

  describe('rich path (action_url provided)', () => {
    it('renders a full HTML document', () => {
      const html = WelcomeEmail.render(welcomeRichProps);
      expect(html).toMatch(/^<!DOCTYPE html/);
      expect(html).toContain('</html>');
    });

    it('renders the CTA label', () => {
      const html = WelcomeEmail.render(welcomeRichProps);
      expect(html).toContain(welcomeRichProps.action_label!);
      expect(html).toContain(`href="${welcomeRichProps.action_url}"`);
    });

    it('falls back to "Get Started" when action_label is missing', () => {
      const { action_label, ...rest } = welcomeRichProps;
      const html = WelcomeEmail.render(rest);
      expect(html).toContain('Get Started');
    });

    it('uses signupDate.toDateString() in the rich body too', () => {
      const html = WelcomeEmail.render(welcomeRichProps);
      expect(html).toContain(welcomeRichProps.signupDate.toDateString());
    });

    it('includes the support paragraph when support_url is set', () => {
      const html = WelcomeEmail.render(welcomeRichProps);
      expect(html).toContain(welcomeRichProps.support_url!);
      expect(html).toContain('support team');
    });

    it('omits the support paragraph when support_url is missing', () => {
      const { support_url, ...rest } = welcomeRichProps;
      const html = WelcomeEmail.render(rest);
      expect(html).not.toContain('support team');
    });
  });

  it('produces different output for minimal vs rich input', () => {
    const minimal = WelcomeEmail.render(welcomeMinimalProps);
    const rich = WelcomeEmail.render(welcomeRichProps);
    expect(minimal).not.toBe(rich);
  });
});