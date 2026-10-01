import type { ITemplate } from '../../types/template';

export interface TrialBenefit {
  /** Short label, e.g. "Unlimited projects". */
  title: string;
  /** Optional one-line detail below the title. */
  description?: string;
}

export interface TrialExpiringEmailProps {
  /** Recipient's display name used in the greeting. */
  name: string;
  /** Inbox preview line. */
  preheader: string;
  /** Human-readable trial end date, e.g. "January 19, 2026". */
  trial_end_date: string;
  /** Number of days remaining — as a string so callers control wording. */
  trial_days_remaining: string;
  /** Name of the plan being trialed, e.g. "Pro". */
  plan_name: string;
  /** Price the user will be charged when the trial converts. */
  plan_price: string;
  /** Primary upgrade/keep-plan button URL. */
  action_url: string;
  /** Optional secondary URL. */
  secondary_url?: string;
  /** Support/contact URL used in the body paragraph. */
  support_url: string;
  /** Bullet list of what the user keeps if they upgrade. */
  benefits: TrialBenefit[];
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type TrialExpiringEmailTemplate = ITemplate<TrialExpiringEmailProps>;
