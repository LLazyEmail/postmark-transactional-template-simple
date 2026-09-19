// tests/unit/invoiceEmail.test.ts
import { describe, it, expect } from 'vitest';
import { InvoiceEmail } from '../../src/templates/invoiceEmail';
import { invoiceProps } from '../fixtures/props';

describe('InvoiceEmail', () => {
  it('has the expected canonical name', () => {
    expect(InvoiceEmail.name).toBe('InvoiceEmail');
  });

  it('renders a full HTML document', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('interpolates the greeting name', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toContain(`Hi ${invoiceProps.name},`);
  });

  it('includes the preheader', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toContain(`<span class="preheader">${invoiceProps.preheader}</span>`);
  });

  it('renders every invoice line item', () => {
    const html = InvoiceEmail.render({
      ...invoiceProps,
      invoice_details: [
        { description: 'Alpha', amount: '$10.00' },
        { description: 'Beta', amount: '$20.00' },
        { description: 'Gamma', amount: '$30.00' },
      ],
    });
    expect(html).toContain('Alpha');
    expect(html).toContain('Beta');
    expect(html).toContain('Gamma');
    expect(html).toContain('$10.00');
    expect(html).toContain('$30.00');
  });

  it('renders no line-item rows when invoice_details is empty', () => {
    const html = InvoiceEmail.render({ ...invoiceProps, invoice_details: [] });
    // Still a valid doc, still has the header row, but no item rows.
    expect(html).toContain('Description');
    expect(html).toContain('Amount');
    expect(html).not.toContain('purchase_item"><span class="f-fallback">$49.00');
  });

  it('uses the action_url in the CTA', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toContain(`href="${invoiceProps.action_url}"`);
  });

  it('uses the support_url in the body', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toContain(`href="${invoiceProps.support_url}"`);
  });

  it('places company_name in the footer', () => {
    const html = InvoiceEmail.render(invoiceProps);
    expect(html).toContain(invoiceProps.company_name);
  });

  it('renders the same output for the same input (pure)', () => {
    const a = InvoiceEmail.render(invoiceProps);
    const b = InvoiceEmail.render(invoiceProps);
    expect(a).toBe(b);
  });
});