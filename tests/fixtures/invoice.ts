import type { InvoiceEmailProps } from '../../src/templates/invoice/types';
import { branding } from './branding';

export const invoiceProps: InvoiceEmailProps = {
  name: 'Alex',
  preheader: 'Invoice INV-2026-0001 is due January 12, 2026.',
  invoice_id: 'INV-2026-0001',
  date: 'January 5, 2026',
  total: '$49.00',
  due_date: 'January 12, 2026',
  purchase_date: 'January 5, 2026',
  action_url: 'https://example.com/invoices/INV-2026-0001/pay',
  support_url: 'https://example.com/support',
  invoice_details: [{ description: 'Pro Plan — monthly subscription', amount: '$49.00' }],
  ...branding,
};
