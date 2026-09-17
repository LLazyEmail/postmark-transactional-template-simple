import type { ITemplate } from './template';

// ---------------------------------------------------------------------------
// Trial Expiring email — typed props for the transactional
// "your trial is about to end" template.
// ---------------------------------------------------------------------------

/**
 * A single feature/benefit row rendered in the "what you'll lose" or
 * "what you get" list. Kept as a structured object so the renderer
 * doesn't have to parse HTML.
 */
export interface TrialBenefit {
  /** Short label, e.g. "Unlimited projects". */
  title: string;
  /** Optional one-line detail below the title. */
  description?: string;
}

export interface TrialExpiringEmailProps {
  // --- Recipient -----------------------------------------------------------
  /** Recipient's display name used in the greeting. */
  name: string;

  // --- Preheader -----------------------------------------------------------
  /** Inbox preview line. */
  preheader: string;

  // --- Trial metadata ------------------------------------------------------
  /** Human-readable trial end date, e.g. "January 19, 2026". */
  trial_end_date: string;
  /** Number of days remaining — as a string so callers control wording
   *  (e.g. "3" or "three"). */
  trial_days_remaining: string;
  /** Name of the plan being trialed, e.g. "Pro". */
  plan_name: string;
  /** Price the user will be charged when the trial converts,
   *  pre-formatted, e.g. "$29.00 / month". */
  plan_price: string;

  // --- Call to action ------------------------------------------------------
  /** Primary upgrade/keep-plan button URL. */
  action_url: string;
  /** Optional secondary URL — e.g. "compare plans" or "contact sales". */
  secondary_url?: string;
  /** Support/contact URL used in the body paragraph. */
  support_url: string;

  // --- Content blocks ------------------------------------------------------
  /** Bullet list of what the user keeps if they upgrade. */
  benefits: TrialBenefit[];

  // --- Branding ------------------------------------------------------------
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type TrialExpiringEmailTemplate = ITemplate<TrialExpiringEmailProps>;
