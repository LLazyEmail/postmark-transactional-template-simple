import type { CommentNotificationEmailProps } from '../../src/templates/comment-notification/types';
import { branding } from './branding';

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
