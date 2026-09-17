import { InvoiceEmail } from '../templates/invoiceEmail';
import type { InvoiceEmailProps } from '../types/invoice';

const props: InvoiceEmailProps = {
  name: 'Alex',
  preheader: 'This is an invoice for your purchase on Jan 5, 2026. Please submit payment by Jan 12, 2026.',
  invoice_id: 'INV-2026-0001',
  date: 'January 5, 2026',
  total: '$49.00',
  due_date: 'January 12, 2026',
  purchase_date: 'January 5, 2026',
  action_url: 'https://example.com/invoices/INV-2026-0001/pay',
  support_url: 'https://example.com/support',
  invoice_details: [
    { description: 'Pro Plan — monthly subscription', amount: '$49.00' },
  ],
  product_name: '[Product Name]',
  company_name: '[Company Name, LLC]',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};

// Render ready-to-send HTML:
const html = InvoiceEmail.render(props);
console.log(html);