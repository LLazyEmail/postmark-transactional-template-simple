// src/types/orderConfirmation.ts
import type { ITemplate } from './template';

/** One line item on the order receipt. */
export interface OrderLineItem {
  /** Product name / description as displayed. */
  description: string;
  /** Pre-formatted unit price, e.g. "$29.00". */
  unit_price: string;
  /** Quantity as a string so callers can pass "1" or "1x". */
  quantity: string;
  /** Pre-formatted line total, e.g. "$29.00". */
  total: string;
}

export interface OrderConfirmationEmailProps {
  // --- Recipient ----------------------------------------------------------
  /** Buyer's display name used in the greeting. */
  name: string;
  /** Inbox preview line. */
  preheader: string;

  // --- Order metadata -----------------------------------------------------
  /** Order ID shown as the receipt heading. */
  order_id: string;
  /** Order date, already formatted for display. */
  order_date: string;
  /** Pre-formatted order total. */
  total: string;

  // --- Line items ---------------------------------------------------------
  /** Itemized order rows. */
  order_items: OrderLineItem[];

  // --- Shipping / billing -------------------------------------------------
  /** Multi-line shipping address string (use `\n` for line breaks). */
  shipping_address: string;
  /** Multi-line billing address string. Empty string if same as shipping. */
  billing_address: string;

  // --- Call to action -----------------------------------------------------
  /** Link to view the order in the user's account. */
  action_url: string;
  /** Support/contact URL. */
  support_url: string;

  // --- Branding -----------------------------------------------------------
  product_name: string;
  company_name: string;
  company_address: string;
  company_suite: string;
  company_url: string;
}

export type OrderConfirmationEmailTemplate =
  ITemplate<OrderConfirmationEmailProps>;
