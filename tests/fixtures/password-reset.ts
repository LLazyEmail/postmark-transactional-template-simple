import type { PasswordResetEmailProps } from '../../src/templates/password-reset/types';
import { branding } from './branding';

export const passwordResetProps: PasswordResetEmailProps = {
  name: 'Alex',
  preheader: 'Reset your [Product Name] password.',
  action_url: 'https://example.com/password/reset/abc123',
  operating_system: 'macOS',
  browser_name: 'Chrome',
  support_url: 'https://example.com/support',
  ...branding,
};
