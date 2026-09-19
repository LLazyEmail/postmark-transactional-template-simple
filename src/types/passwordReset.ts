// src/types/passwordReset.ts
import type { ITemplate } from './template';

/**
 * Props for the password-reset transactional email.
 * Mirrors the mustache placeholders in the Postmark reference layout:
 *   {{name}}, {{action_url}}, {{operating_system}}, {{browser_name}},
 *   {{support_url}}, {{product_name}}, {{company_name}}, {{company_address}}
 */
export interface PasswordResetEmailProps {
  /** Recipient display name used in the greeting. */
  name: string;
  /** Inbox preview line. */
  preheader: string;
  /** Password-reset link (typically a signed, single-use token URL). */
  action_url: string;
  /** Where the reset was requested from — used for the "not you?" note. */
  operating_system: string;
  /** Browser name for the same note (e.g. "Chrome", "Safari"). */
  browser_name: string;
  /** Support/contact URL. */
  support_url: string;

  // --- Branding -----------------------------------------------------------
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type PasswordResetEmailTemplate = ITemplate<PasswordResetEmailProps>;
