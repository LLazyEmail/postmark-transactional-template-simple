import type { ExampleEmailProps } from '../../src/templates/example/types';
import { branding } from './branding';

export const exampleProps: ExampleEmailProps = {
  preheader:
    'This is example text for the preheader set via the YAML front-matter for each email.',
  sender_name: 'Jordan Lee',
  login_url: 'https://example.com/login',
  username: 'alex@example.com',
  trial_extension_url: 'https://example.com/trial/extend',
  feedback_url: 'https://example.com/feedback',
  expiration_date: 'January 31, 2026',
  action_url: 'https://example.com/confirm',
  danger_url: 'https://example.com/danger',
  success_url: 'https://example.com/success',
  default_url: 'https://example.com/default',
  discount_url: 'https://example.com/discount',
  ...branding,
};
