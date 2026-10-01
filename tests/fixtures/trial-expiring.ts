import type { TrialExpiringEmailProps } from '../../src/templates/trial-expiring/types';
import { branding } from './branding';

export const trialExpiringProps: TrialExpiringEmailProps = {
  name: 'Alex',
  preheader: 'Your Pro trial ends in 3 days.',
  trial_end_date: 'January 19, 2026',
  trial_days_remaining: '3',
  plan_name: 'Pro',
  plan_price: '$29.00 / month',
  action_url: 'https://example.com/billing/upgrade',
  support_url: 'https://example.com/support',
  benefits: [
    { title: 'Unlimited projects', description: 'No 3-project cap.' },
    { title: 'Priority support' },
  ],
  ...branding,
};
