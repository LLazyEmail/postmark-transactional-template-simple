const { orderConfirmation } = require('../../src/templates/order-confirmation.definition');
const fixture = require('../../src/data/order-confirmation.data');

describe('order-confirmation template', () => {
  test('renders full HTML document with required content', () => {
    const html = orderConfirmation(fixture);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain(fixture.orderId);
    expect(html).toContain(fixture.recipientName);
    expect(html).toContain(fixture.orderUrl);
  });

  test('throws when required field is missing', () => {
    const badPayload = { ...fixture, orderId: '' };
    expect(() => orderConfirmation(badPayload)).toThrow(
      '[template:order-confirmation] missing required field: orderId'
    );
  });
});
