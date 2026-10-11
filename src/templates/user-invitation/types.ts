import type { EmailModule } from '../defineEmail.ts';

export interface UserInvitationEmailProps {
  /** Invitee's display name for the greeting. */
  invitee_name: string;
  /** The email address the invitation was sent to (echoed in body copy). */
  invitee_email: string;
  /** Name of the person who sent the invite. */
  inviter_name: string;
  /** Optional display name of the workspace/team/org being joined. */
  workspace_name?: string;
  /** Role being offered, e.g. "Admin", "Member", "Editor". */
  role: string;
  /** Preheader text. */
  preheader: string;
  /** Accept-invitation URL. */
  action_url: string;
  /** Optional decline URL. */
  decline_url?: string;
  /** When the invitation link expires (already formatted). */
  expires_at: string;
  /** Support URL for "didn't expect this?" copy. */
  support_url: string;
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type UserInvitationEmailTemplate = EmailModule<UserInvitationEmailProps>;
