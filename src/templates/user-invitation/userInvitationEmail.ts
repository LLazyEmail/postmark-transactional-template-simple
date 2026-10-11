export type { UserInvitationEmailProps } from './types.ts';
import type { UserInvitationEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import {
  actionBlock,
  attributeRow,
  attributeTable,
  bulletproofButton,
  subCopy,
} from '../../layout/blocks.ts';
import { defineEmail } from '../defineEmail.ts';
import { userInvitationData } from '../../data/user-invitation.ts';

/** " join <strong>Workspace</strong>" suffix; empty when no workspace name. */
function buildWorkspaceBlurb(workspace_name: string | undefined): string {
  return workspace_name
    ? ` join <strong>${workspace_name}</strong>`
    : '';
}

/** Decline-invitation CTA, or the "safe to ignore" fallback without a decline URL. */
function buildDeclineBlock(decline_url: string | undefined): string {
  return decline_url
    ? `
                        <table class="body-action-secondary" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <a href="${decline_url}" class="f-fallback" target="_blank">Decline invitation</a>
                            </td>
                          </tr>
                        </table>`
    : `
                        <p class="f-fallback sub">If you did not expect this invitation, you can safely ignore this email.</p>`;
}

/**
 * UserInvitationEmail
 * -------------------
 * Typed port of the "user invitation" transactional template.
 * The shared Postmark document supplies the stylesheet, masthead, and footer.
 */
export const UserInvitationEmail = defineEmail<UserInvitationEmailProps>({
  id: 'UserInvitationEmail',
  aliases: ['user-invitation'],
  name: 'UserInvitationEmail',
  file: 'user-invitation/userInvitationEmail.ts',
  exportName: 'UserInvitationEmail',
  data: userInvitationData,

  render: ({
    invitee_name,
    invitee_email,
    inviter_name,
    workspace_name,
    role,
    expires_at,
    preheader,
    action_url,
    decline_url,
    support_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const workspaceBlurb = buildWorkspaceBlurb(workspace_name);
    const declineBlock = buildDeclineBlock(decline_url);

    const body = `<h1>Hi ${invitee_name},</h1>
                        <p><strong>${inviter_name}</strong> has invited you to${workspaceBlurb} on ${product_name} as a <strong>${role}</strong>.</p>
                        ${attributeTable(
                          attributeRow(
                            `<span class="f-fallback"><strong>Invited by:</strong> ${inviter_name}</span>`
                          ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Role:</strong> ${role}</span>`
                            ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Invited email:</strong> ${invitee_email}</span>`
                            ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Invitation expires:</strong> ${expires_at}</span>`
                            )
                        )}
                        ${actionBlock(bulletproofButton(action_url, 'Accept Invitation', 'green'))}${declineBlock}
                        <p>If you have any questions, reach out to <a href="${support_url}">our support team</a> \u2014 we're happy to help.</p>
                        <p>Cheers,
                          <br>The ${product_name} team</p>
                        ${subCopy(
                          "If you're having trouble with the button above, copy and paste the URL below into your web browser.",
                          action_url
                        )}`;

    return renderPostmarkDocument({
      preheader,
      product_name,
      company_name,
      company_address,
      company_suite,
      company_url,
      body,
    });
  },
});
