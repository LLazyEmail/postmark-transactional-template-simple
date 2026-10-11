import type { WelcomeEmailProps } from '../templates/welcome/types.ts';

export const welcomeData: WelcomeEmailProps = {
  userName: 'Alex',
  signupDate: new Date('2026-01-05T12:00:00Z'),
  preheader: 'Welcome aboard.',
  action_url: 'https://example.com/confirm',
  action_label: 'Confirm email',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};
