import type { ITemplate } from '../types/template';

// ---------------------------------------------------------------------------
// User Invitation email — typed props for the "you've been invited to
// join a workspace / team / org" transactional template.
// ---------------------------------------------------------------------------

export interface UserInvitationEmailProps {
  // --- Invitee -------------------------------------------------------------
  /** Invitee's display name for the greeting. If unknown at send time,
   *  callers typically pass the email local-part or "there". */
  invitee_name: string;
  /** The email address the invitation was sent to (echoed in body copy). */
  invitee_email: string;

  // --- Inviter / workspace -------------------------------------------------
  /** Name of the person who sent the invite. */
  inviter_name: string;
  /** Optional display name of the workspace/team/org being joined. */
  workspace_name?: string;
  /** Role being offered, e.g. "Admin", "Member", "Editor". */
  role: string;

  // --- Preheader -----------------------------------------------------------
  preheader: string;

  // --- Call to action ------------------------------------------------------
  /** Accept-invitation URL (typically contains a signed token). */
  action_url: string;
  /** Optional decline URL. If omitted, the footer "ignore this email"
   *  copy is used instead. */
  decline_url?: string;

  // --- Expiry / security ---------------------------------------------------
  /** When the invitation link expires (already formatted). */
  expires_at: string;
  /** Support URL for "didn't expect this?" copy. */
  support_url: string;

  // --- Branding ------------------------------------------------------------
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type UserInvitationEmailTemplate = ITemplate<UserInvitationEmailProps>;
