import type { UserInvitationEmailProps } from './types';

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
