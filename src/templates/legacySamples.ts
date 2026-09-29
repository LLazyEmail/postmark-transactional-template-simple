import type { OrderConfirmationEmailProps } from '../types/orderConfirmation.ts';
import type { InvoiceEmailProps } from '../types/invoice.ts';
import type { WelcomeEmailProps } from '../types/welcome.ts';
import type { TrialExpiringEmailProps } from '../types/trialExpiring.ts';
import type { UserInvitationEmailProps } from '../types/userInvitation.ts';

/**
 * CLI preview payloads for templates that were registered before `sample`
 * lived on the template module. New templates keep their sample next to
 * `render` instead of adding another entry here.
 */

export const orderConfirmationSample: OrderConfirmationEmailProps = {
  name: 'Jordan',
  preheader: 'Thanks for your order #1001.',
  order_id: '1001',
  order_date: 'January 5, 2026',
  total: '$49.00',
  order_items: [
    { description: 'Pro Plan - monthly', unit_price: '$49.00', quantity: '1', total: '$49.00' },
  ],
  shipping_address: 'Jordan Lee\n1234 Street Rd.\nSuite 1234',
  billing_address: '',
  action_url: 'https://example.com/orders/1001',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: 'Acme Inc.',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

export const welcomeSample: WelcomeEmailProps = {
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

export const invoiceSample: InvoiceEmailProps = {
  name: 'Alex',
  preheader: 'Invoice for Jan 5, 2026.',
  invoice_id: 'INV-2026-0001',
  date: 'January 5, 2026',
  total: '$49.00',
  due_date: 'January 12, 2026',
  purchase_date: 'January 5, 2026',
  action_url: 'https://example.com/invoices/INV-2026-0001/pay',
  support_url: 'https://example.com/support',
  invoice_details: [{ description: 'Pro Plan', amount: '$49.00' }],
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

export const trialExpiringSample: TrialExpiringEmailProps = {
  name: 'Alex',
  preheader: 'Your Pro trial ends in 3 days.',
  trial_end_date: 'January 19, 2026',
  trial_days_remaining: '3',
  plan_name: 'Pro',
  plan_price: '$29.00 / month',
  action_url: 'https://example.com/billing/upgrade',
  secondary_url: 'https://example.com/pricing',
  support_url: 'https://example.com/support',
  benefits: [{ title: 'Unlimited projects' }, { title: 'Priority support' }],
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

export const userInvitationSample: UserInvitationEmailProps = {
  invitee_name: 'Alex',
  invitee_email: 'alex@example.com',
  inviter_name: 'Sam',
  workspace_name: 'Acme',
  role: 'Member',
  preheader: 'Sam invited you to join Acme.',
  action_url: 'https://example.com/invites/accept',
  decline_url: 'https://example.com/invites/decline',
  expires_at: 'January 12, 2026',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};
