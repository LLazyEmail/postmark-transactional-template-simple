import type { CommentNotificationEmailProps } from '../templates/comment-notification/types.ts';

export const commentNotificationData: CommentNotificationEmailProps = {
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
};
