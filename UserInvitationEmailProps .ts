import { UserInvitationEmail } from '../templates/userInvitationEmail';
import type { UserInvitationEmailProps } from '../types/userInvitation';

const props: UserInvitationEmailProps = {
  invitee_name: 'Alex',
  invitee_email: 'alex@example.com',
  inviter_name: 'Sam Rivera',
  workspace_name: 'Acme HQ',
  role: 'Editor',
  preheader: 'Sam Rivera invited you to join Acme HQ on [Product Name].',
  action_url: 'https://example.com/invitations/abc123/accept',
  decline_url: 'https://example.com/invitations/abc123/decline',
  expires_at: 'January 26, 2026',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

const html = UserInvitationEmail.render(props);
console.log(html);
