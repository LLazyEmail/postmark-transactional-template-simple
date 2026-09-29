import type {
  CommentAttachment,
  CommentNotificationEmailProps,
} from '../../types/commentNotification.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import { attributeRow, attributeTable } from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineTemplate } from '../defineTemplate.ts';

function attachmentTable(items: CommentAttachment[] | undefined): string {
  if (!items || items.length === 0) return '';
  const rows = items
    .map((item) =>
      attributeRow(
        `<a href="${escapeHtml(item.attachment_url)}">${escapeHtml(item.attachment_name)}</a> <span>(${escapeHtml(item.attachment_size)} ${escapeHtml(item.attachment_type)})</span>`
      )
    )
    .join('');
  return attributeTable(rows);
}

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
  defineTemplate<CommentNotificationEmailProps>({
    id: 'comment-notification',
    name: 'CommentNotificationEmail',
    file: 'comment-notification/commentNotificationEmail.ts',
    exportName: 'CommentNotificationEmail',
    sample: {
      body: 'Just left a comment on the Q3 launch doc.\nCan we ship the revised hero by Friday?',
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
      product_name: '[Product Name]',
      company_name: '[Company Name, LLC]',
      company_address: '1234 Street Rd.',
      company_suite: 'Suite 1234',
      company_url: 'https://example.com',
    },

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
