// tests/unit/password-reset.definition.test.ts
import { describe, it, expect } from 'vitest';
import {
  passwordReset,
  TEMPLATE_ID,
} from '../../src/templates/password-reset.definition';
import { passwordResetProps } from '../fixtures/props';

describe('password-reset.definition', () => {
  it('exports the legacy TEMPLATE_ID', () => {
    expect(TEMPLATE_ID).toBe('password-reset');
  });

  it('template has the expected name', () => {
    expect(passwordReset.name).toBe('PasswordResetEmail');
  });

  it('renders a full HTML document', () => {
    const html = passwordReset.render(passwordResetProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('interpolates the greeting', () => {
    const html = passwordReset.render(passwordResetProps);
    expect(html).toContain(`Hi ${passwordResetProps.name},`);
  });

  it('uses the action_url in the reset button', () => {
    const html = passwordReset.render(passwordResetProps);
    expect(html).toContain(`href="${passwordResetProps.action_url}"`);
    expect(html).toContain('Reset your password');
  });

  it('includes operating system and browser metadata', () => {
    const html = passwordReset.render(passwordResetProps);
    expect(html).toContain(passwordResetProps.operating_system);
    expect(html).toContain(passwordResetProps.browser_name);
  });

  it('includes the support_url', () => {
    const html = passwordReset.render(passwordResetProps);
    expect(html).toContain(`href="${passwordResetProps.support_url}"`);
  });
});