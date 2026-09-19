// tests/unit/order-confirmation.definition.test.ts
import { describe, it, expect } from 'vitest';
import {
  orderConfirmation,
  TEMPLATE_ID,
} from '../../src/templates/order-confirmation.definition';
import { orderConfirmationProps } from '../fixtures/props';

describe('order-confirmation.definition', () => {
  it('exports the legacy TEMPLATE_ID', () => {
    expect(TEMPLATE_ID).toBe('order-confirmation');
  });

  it('template has the expected name', () => {
    expect(orderConfirmation.name).toBe('OrderConfirmationEmail');
  });

  it('renders a full HTML document', () => {
    const html = orderConfirmation.render(orderConfirmationProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('renders the order ID and date', () => {
    const html = orderConfirmation.render(orderConfirmationProps);
    expect(html).toContain(orderConfirmationProps.order_id);
    expect(html).toContain(orderConfirmationProps.order_date);
  });

  it('renders every order line item', () => {
    const html = orderConfirmation.render({
      ...orderConfirmationProps,
      order_items: [
        { description: 'Alpha', unit_price: '$10.00', quantity: '1', total: '$10.00' },
        { description: 'Beta', unit_price: '$5.00', quantity: '2', total: '$10.00' },
      ],
    });
    expect(html).toContain('Alpha');
    expect(html).toContain('Beta');
  });

  it('converts newlines in the shipping address to <br>', () => {
    const html = orderConfirmation.render(orderConfirmationProps);
    expect(html).toContain('Alex Doe<br>1234 Street Rd.<br>Suite 1234');
  });

  it('omits the billing block when billing_address is empty', () => {
    const html = orderConfirmation.render(orderConfirmationProps);
    expect(html).not.toContain('Billing address');
  });

  it('renders the billing block when it differs from shipping', () => {
    const html = orderConfirmation.render({
      ...orderConfirmationProps,
      billing_address: 'Other\n999 Other St.',
    });
    expect(html).toContain('Billing address');
    expect(html).toContain('Other<br>999 Other St.');
  });

  it('uses the action_url for the CTA', () => {
    const html = orderConfirmation.render(orderConfirmationProps);
    expect(html).toContain(`href="${orderConfirmationProps.action_url}"`);
  });
});