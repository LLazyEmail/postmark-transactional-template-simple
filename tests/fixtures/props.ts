// tests/fixtures/props.ts
import type { InvoiceEmailProps } from '../../src/types/invoice';
import type { TrialExpiringEmailProps } from '../../src/types/trialExpiring';
import type { UserInvitationEmailProps } from '../../src/types/userInvitation';
import type { WelcomeEmailProps } from '../../src/types/welcome';
import type { PasswordResetEmailProps } from '../../src/types/passwordReset';
import type { OrderConfirmationEmailProps } from '../../src/types/orderConfirmation';
import type { ExampleEmailProps } from '../../src/types/example';
import type { CommentNotificationEmailProps } from '../../src/types/commentNotification';

const branding = {
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

export const invoiceProps: InvoiceEmailProps = {
  name: 'Alex',
  preheader: 'Invoice INV-2026-0001 is due January 12, 2026.',
  invoice_id: 'INV-2026-0001',
  date: 'January 5, 2026',
  total: '$49.00',
  due_date: 'January 12, 2026',
  purchase_date: 'January 5, 2026',
  action_url: 'https://example.com/invoices/INV-2026-0001/pay',
  support_url: 'https://example.com/support',
  invoice_details: [
    { description: 'Pro Plan — monthly subscription', amount: '$49.00' },
  ],
  ...branding,
};

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

export const userInvitationProps: UserInvitationEmailProps = {
  invitee_name: 'Alex',
  invitee_email: 'alex@example.com',
  inviter_name: 'Sam Rivera',
  workspace_name: 'Acme HQ',
  role: 'Editor',
  preheader: 'Sam Rivera invited you to join Acme HQ.',
  action_url: 'https://example.com/invitations/abc123/accept',
  decline_url: 'https://example.com/invitations/abc123/decline',
  expires_at: 'January 26, 2026',
  support_url: 'https://example.com/support',
  ...branding,
};

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

export const passwordResetProps: PasswordResetEmailProps = {
  name: 'Alex',
  preheader: 'Reset your [Product Name] password.',
  action_url: 'https://example.com/password/reset/abc123',
  operating_system: 'macOS',
  browser_name: 'Chrome',
  support_url: 'https://example.com/support',
  ...branding,
};

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

export const commentNotificationProps: CommentNotificationEmailProps = {
  body: 'The revised hero looks right.\nShipping Friday.',
  commenter_name: 'Sam Rivera',
  timestamp: 'January 5, 2026 2:14 PM',
  action_url: 'https://example.com/comments/42',
  notifications_url: 'https://example.com/settings/notifications',
  attachment_details: [
    {
      attachment_name: 'hero-v3.png',
      attachment_url: 'https://example.com/files/hero-v3.png',
      attachment_size: '240 KB',
      attachment_type: 'PNG',
    },
  ],
  ...branding,
};

export const orderConfirmationProps: OrderConfirmationEmailProps = {
  name: 'Alex',
  preheader: 'Your order ORD-2026-0001 is confirmed.',
  order_id: 'ORD-2026-0001',
  order_date: 'January 5, 2026',
  total: '$49.00',
  order_items: [
    { description: 'Pro Plan', unit_price: '$49.00', quantity: '1', total: '$49.00' },
  ],
  shipping_address: 'Alex Doe\n1234 Street Rd.\nSuite 1234',
  billing_address: '',
  action_url: 'https://example.com/orders/ORD-2026-0001',
  support_url: 'https://example.com/support',
  ...branding,
};