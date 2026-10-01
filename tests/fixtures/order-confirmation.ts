import type { OrderConfirmationEmailProps } from '../../src/templates/order-confirmation/types';
import { branding } from './branding';

export const orderConfirmationProps: OrderConfirmationEmailProps = {
  name: 'Alex',
  preheader: 'Your order ORD-2026-0001 is confirmed.',
  order_id: 'ORD-2026-0001',
  order_date: 'January 5, 2026',
  total: '$49.00',
  order_items: [{ description: 'Pro Plan', unit_price: '$49.00', quantity: '1', total: '$49.00' }],
  shipping_address: 'Alex Doe\n1234 Street Rd.\nSuite 1234',
  billing_address: '',
  action_url: 'https://example.com/orders/ORD-2026-0001',
  support_url: 'https://example.com/support',
  ...branding,
};
