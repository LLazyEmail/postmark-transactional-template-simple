export type { CommentAttachment, CommentNotificationEmailProps } from './types.ts';
import type { CommentNotificationEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import { attachmentTable } from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineEmail } from '../defineEmail.ts';
import { commentNotificationData } from '../../data/comment-notification.ts';

/**
 * CommentNotificationEmail
 * ------------------------
 * Port of `reference/comment-notification`.
 * `{{body}}` is escaped (Handlebars double-brace). Newlines in that
 * plain-text body become `<br />` so a comment still breaks across lines.
 * The attachment table is omitted when `attachment_details` is empty,
 * matching `{{#attachment_details}}`.
 */
export const CommentNotificationEmail =
  defineEmail<CommentNotificationEmailProps>({
    id: 'CommentNotificationEmail',
    aliases: ['comment-notification'],
    name: 'CommentNotificationEmail',
    file: 'comment-notification/commentNotificationEmail.ts',
    exportName: 'CommentNotificationEmail',
    data: commentNotificationData,

    render: ({
      body,
      commenter_name,
      timestamp,
      action_url,
      notifications_url,
      attachment_details,
      product_name,
      company_name,
      company_address,
      company_suite,
      company_url,
    }) => {
      const bodyHtml = escapeHtml(body).replace(/\r\n|\r|\n/g, '<br />');
      const inner = `${bodyHtml}
                        <br />
                        <br />
                        ${attachmentTable(attachment_details)}
                        <p>By ${escapeHtml(commenter_name)} at ${escapeHtml(timestamp)}</p>
                        <p class="sub"><a href="${escapeHtml(action_url)}">View the comment</a> or <a href="${escapeHtml(notifications_url)}">Manage notifications</a></p>`;

      return renderPostmarkDocument({
        product_name,
        company_name,
        company_address,
        company_suite,
        company_url,
        body: inner,
      });
    },
  });
