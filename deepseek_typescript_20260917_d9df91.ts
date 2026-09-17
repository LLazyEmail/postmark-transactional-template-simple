import type { ITemplate } from './template';

// ---------------------------------------------------------------------------
// Welcome email — typed props. Kept identical to the interface that
// previously lived inline in `templates/welcomeEmail.ts` so nothing
// breaks for existing importers.
// ---------------------------------------------------------------------------

export interface WelcomeEmailProps {
  userName: string;
  signupDate: Date;

  // --- Optional richer content (all optional so existing callers that
  // pass only { userName, signupDate } keep compiling). --------------------
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