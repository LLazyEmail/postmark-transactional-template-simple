import type { ExampleEmailProps } from '../templates/example/types.ts';

export const exampleData: ExampleEmailProps = {
  preheader:
    'This is example text for the preheader set via the YAML front-matter for each email.',
  sender_name: '[Sender Name]',
  login_url: 'https://example.com/login',
  username: 'alex@example.com',
  trial_extension_url: 'https://example.com/trial/extend',
  feedback_url: 'https://example.com/feedback',
  expiration_date: 'January 31, 2026',
  action_url: 'https://example.com/confirm',
  danger_url: 'http://example.com',
  success_url: 'http://example.com',
  default_url: 'http://example.com',
  discount_url: 'http://example.com',
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};
