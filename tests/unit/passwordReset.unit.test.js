const { passwordReset } = require('../../src/templates/password-reset.definition');
const fixture = require('../../src/data/password-reset.data');

describe('password-reset template', () => {
  test('renders full HTML document with required content', () => {
    const html = passwordReset(fixture);

    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain(fixture.companyName);
    expect(html).toContain(fixture.resetUrl);
    expect(html).toContain(fixture.recipientName);
  });

  test('throws when required field is missing', () => {
    const badPayload = { ...fixture, resetUrl: '' };
    expect(() => passwordReset(badPayload)).toThrow(
      '[template:password-reset] missing required field: resetUrl'
    );
  });

  test('throws when required field is entirely absent', () => {
    const { companyName, ...missingCompany } = fixture;
    expect(() => passwordReset(missingCompany)).toThrow(
      '[template:password-reset] missing required field: companyName'
    );
  });
});
