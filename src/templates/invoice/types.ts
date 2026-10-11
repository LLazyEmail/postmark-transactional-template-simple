import type { EmailModule } from '../defineEmail.ts';

/**
 * One line item inside the invoice details table.
 * Mirrors the `{{#each invoice_details}}` block in the HTML.
 */
export interface InvoiceLineItem {
  /** Human-readable line item description (e.g. "Pro Plan — 1 month"). */
  description: string;
  /** Pre-formatted amount string, e.g. "$49.00". Kept as a string so the
   *  renderer doesn't have to re-implement currency formatting. */
  amount: string;
}

/**
 * Props contract for the InvoiceEmail template.
 */
export interface InvoiceEmailProps {
  /** Recipient's first name (or display name) — used in the greeting. */
  name: string;
  /** Short preheader line shown in the inbox preview. */
  preheader: string;
  /** Unique invoice identifier shown as the table heading. */
  invoice_id: string;
  /** Date the invoice was issued (already formatted for display). */
  date: string;
  /** Total amount currently due, pre-formatted. */
  total: string;
  /** Date payment is due, pre-formatted. */
  due_date: string;
  /** Date of the original purchase, pre-formatted. */
  purchase_date: string;
  /** Primary button URL. */
  action_url: string;
  /** Support/contact URL used in the body paragraph. */
  support_url: string;
  /** Itemized invoice rows rendered into the purchase table. */
  invoice_details: InvoiceLineItem[];
  /** Product or brand name shown in the masthead and sign-off. */
  product_name: string;
  /** Company legal name for the footer. */
  company_name: string;
  /** Street address line for the footer. */
  company_address: string;
  /** Suite / unit line for the footer. */
  company_suite: string;
  /** Marketing site link for the masthead anchor. */
  company_url: string;
}

export type InvoiceEmailTemplate = EmailModule<InvoiceEmailProps>;
