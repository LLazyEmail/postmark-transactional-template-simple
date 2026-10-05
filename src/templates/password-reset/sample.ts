import type { PasswordResetEmailProps } from './types';

export const passwordResetSample: PasswordResetEmailProps = {
  name: 'Jordan',
  preheader: 'Use this link to reset your password.',
  action_url: 'https://example.com/reset?token=fixture-token-123',
  operating_system: 'macOS',
  browser_name: 'Chrome',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: 'Acme Inc.',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};
