const fs = require('fs');
const path = require('path');
const { renderTemplate, listTemplates } = require('../../src/templates');
const passwordResetFixture = require('../../src/data/password-reset.data');
const orderConfirmationFixture = require('../../src/data/order-confirmation.data');

const OUT_DIR = path.join(__dirname, '..', '..', 'generated-real-data');

describe('renderTemplate registry — real fixture data', () => {
  beforeAll(() => {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  });

  test('registry lists both templates', () => {
    expect(listTemplates()).toEqual(
      expect.arrayContaining(['password-reset', 'order-confirmation'])
    );
  });

  test('renders password-reset via renderTemplate(id, payload) and writes output', () => {
    const html = renderTemplate('password-reset', passwordResetFixture);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Reset your password');
    expect(html).toContain(passwordResetFixture.resetUrl);

    const outPath = path.join(OUT_DIR, 'password-reset.html');
    fs.writeFileSync(outPath, html, 'utf8');
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test('renders order-confirmation via renderTemplate(id, payload) and writes output', () => {
    const html = renderTemplate('order-confirmation', orderConfirmationFixture);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain(orderConfirmationFixture.orderId);

    const outPath = path.join(OUT_DIR, 'order-confirmation.html');
    fs.writeFileSync(outPath, html, 'utf8');
    expect(fs.existsSync(outPath)).toBe(true);
  });

  test('throws a clear error for an unknown template id', () => {
    expect(() => renderTemplate('does-not-exist', {})).toThrow(/Unknown template id/);
  });
});
