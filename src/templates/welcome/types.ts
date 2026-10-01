import type { ITemplate } from '../../types/template';

export interface WelcomeEmailProps {
  userName: string;
  signupDate: Date;

  /** Inbox preview line. */
  preheader?: string;
  /** Primary CTA URL, e.g. "Confirm your email" or "Go to dashboard". */
  action_url?: string;
  /** Label for the primary CTA button. */
  action_label?: string;
  /** Support/contact URL. */
  support_url?: string;
  /** Branding. */
  product_name?: string;
  company_name?: string;
  company_address?: string;
  company_suite?: string;
  company_url?: string;
}

export type WelcomeEmailTemplate = ITemplate<WelcomeEmailProps>;
