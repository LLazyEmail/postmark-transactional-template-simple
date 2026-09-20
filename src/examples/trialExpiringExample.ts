import { TrialExpiringEmail } from '../templates/trialExpiringEmail';
import type { TrialExpiringEmailProps } from '../types/trialExpiring';

const props: TrialExpiringEmailProps = {
  name: 'Alex',
  preheader: "Your Pro trial ends in 3 days — here's what happens next.",
  trial_end_date: 'January 19, 2026',
  trial_days_remaining: '3',
  plan_name: 'Pro',
  plan_price: '$29.00 / month',
  action_url: 'https://example.com/billing/upgrade',
  secondary_url: 'https://example.com/pricing',
  support_url: 'https://example.com/support',
  benefits: [
    { title: 'Unlimited projects', description: 'No 3-project cap.' },
    { title: 'Priority support' },
    { title: 'Advanced analytics', description: 'Cohort & funnel reports.' },
  ],
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

const html = TrialExpiringEmail.render(props);
console.log(html);
