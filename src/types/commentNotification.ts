import type { ITemplate } from './template.ts';
import type { EmailBrandProps } from './brand.ts';

/**
 * One file attached to a comment.
 * Mirrors `{{#each .}}` inside `{{#attachment_details}}`.
 */
export interface CommentAttachment {
  attachment_name: string;
  attachment_url: string;
  /** Pre-formatted size, e.g. "24 KB". */
  attachment_size: string;
  /** File kind shown next to the size, e.g. "PNG". */
  attachment_type: string;
}

/**
 * Props for `reference/comment-notification`.
 * `body` is escaped the way Handlebars `{{body}}` escapes it.
 * Pass an empty array (or omit it) to hide the attachment table,
 * matching `{{#attachment_details}}`.
 */
export interface CommentNotificationEmailProps extends EmailBrandProps {
  body: string;
  commenter_name: string;
  /** Already formatted, e.g. "January 5, 2026 2:14 PM". */
  timestamp: string;
  action_url: string;
  notifications_url: string;
  attachment_details?: CommentAttachment[];
}

export type CommentNotificationEmailTemplate =
  ITemplate<CommentNotificationEmailProps>;
