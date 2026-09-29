import type { ITemplate } from './template.ts';
import type { EmailBrandProps } from './brand.ts';

/**
 * Props for the Postmark "example" kitchen-sink template
 * (`reference/example`). Static demo sections (headers, lists, formatting)
 * stay in the template. Every `{{mustache}}` field and every hardcoded
 * brand or button URL is a prop.
 */
export interface ExampleEmailProps extends EmailBrandProps {
  /** Inbox preview line. */
  preheader: string;
  /** Name used in the closing ("[Sender Name] and the team"). */
  sender_name: string;

  login_url: string;
  username: string;
  trial_extension_url: string;
  feedback_url: string;
  /** Pre-formatted date the discount expires. */
  expiration_date: string;

  /** URL printed in the sub-text fallback. */
  action_url: string;
  danger_url: string;
  success_url: string;
  default_url: string;
  discount_url: string;
}

export type ExampleEmailTemplate = ITemplate<ExampleEmailProps>;
