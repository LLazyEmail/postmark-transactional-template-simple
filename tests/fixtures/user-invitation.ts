import type { UserInvitationEmailProps } from '../../src/templates/user-invitation/types';
import { branding } from './branding';

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
