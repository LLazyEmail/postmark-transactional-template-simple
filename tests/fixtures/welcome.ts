import type { WelcomeEmailProps } from '../../src/templates/welcome/types';
import { branding } from './branding';

export const welcomeMinimalProps: WelcomeEmailProps = {
  userName: 'Alex',
  signupDate: new Date('2026-01-05T12:00:00Z'),
};

export const welcomeRichProps: WelcomeEmailProps = {
  ...welcomeMinimalProps,
  preheader: 'Welcome to [Product Name], Alex!',
  action_url: 'https://example.com/dashboard',
  action_label: 'Go to dashboard',
  support_url: 'https://example.com/support',
  ...branding,
};
