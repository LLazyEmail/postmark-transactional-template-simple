import type { EmailModule } from '../defineEmail.ts';
import type { EmailBrandProps } from '../../types/brand.ts';

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

export type ExampleEmailTemplate = EmailModule<ExampleEmailProps>;
