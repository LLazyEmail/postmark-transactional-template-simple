import { describe, it, expect } from 'vitest';
import { ExampleEmail } from '../../src/templates/exampleEmail';
import { exampleProps } from '../fixtures/props';

describe('ExampleEmail', () => {
  it('has the expected canonical name', () => {
    expect(ExampleEmail.name).toBe('ExampleEmail');
  });

  it('renders a full HTML document', () => {
    const html = ExampleEmail.render(exampleProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('keeps the escaped-mustache demonstration as literal text', () => {
    const html = ExampleEmail.render(exampleProps);
    expect(html).toContain('\\{{ something }} will turn into {{ something }}');
  });

  it('renders the three heading levels', () => {
    const html = ExampleEmail.render(exampleProps);
    expect(html).toContain('<h1>Header 1</h1>');
    expect(html).toContain('<h2>Header 2</h2>');
    expect(html).toContain('<h3>Header 3</h3>');
  });

  it('interpolates attribute, option, discount, and action fields', () => {
    const html = ExampleEmail.render(exampleProps);
    expect(html).toContain(exampleProps.login_url);
    expect(html).toContain(exampleProps.username);
    expect(html).toContain(`href="${exampleProps.trial_extension_url}"`);
    expect(html).toContain(`href="${exampleProps.feedback_url}"`);
    expect(html).toContain(exampleProps.expiration_date);
    expect(html).toContain(`href="${exampleProps.danger_url}"`);
    expect(html).toContain(`href="${exampleProps.success_url}"`);
    expect(html).toContain(`href="${exampleProps.default_url}"`);
    expect(html).toContain(`href="${exampleProps.discount_url}"`);
    expect(html).toContain(`href="${exampleProps.action_url}"`);
    expect(html).toContain(exampleProps.sender_name);
  });

  it('places the product name in the masthead and the closing', () => {
    const html = ExampleEmail.render(exampleProps);
    expect(html).toContain(exampleProps.product_name);
    expect(html).toContain(`${exampleProps.sender_name} and the ${exampleProps.product_name} team`);
  });

  it('escapes HTML in the username', () => {
    const html = ExampleEmail.render({ ...exampleProps, username: '<admin>' });
    expect(html).toContain('&lt;admin&gt;');
    expect(html).not.toContain('<admin>');
  });
});
