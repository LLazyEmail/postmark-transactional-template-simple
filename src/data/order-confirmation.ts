import type { OrderConfirmationEmailProps } from '../templates/order-confirmation/types.ts';

export const orderConfirmationData: OrderConfirmationEmailProps = {
  name: 'Jordan',
  preheader: 'Thanks for your order #1001.',
  order_id: '1001',
  order_date: 'January 5, 2026',
  total: '$49.00',
  order_items: [
    { description: 'Pro Plan - monthly', unit_price: '$49.00', quantity: '1', total: '$49.00' },
  ],
  shipping_address: 'Jordan Lee\n1234 Street Rd.\nSuite 1234',
  billing_address: '',
  action_url: 'https://example.com/orders/1001',
  support_url: 'https://example.com/support',
  product_name: '[Product Name]',
  company_name: 'Acme Inc.',
  company_address: '1234 Street Rd.',
  company_suite: 'Suite 1234',
  company_url: 'https://example.com',
};
