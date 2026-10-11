// tests/integration/render-all.test.ts
import { describe, it, expect } from 'vitest';
import {
  renderTemplate,
  listTemplates,
  getTemplate,
} from '../../src/templates/registry';
import { templates } from '../../src/templates/manifest';
import { templateData } from '../../src/templates/registry';
import { welcomeMinimalProps } from '../fixtures/props';

describe('integration: render every registered template', () => {
  const names = listTemplates();

  it('lists the same templates the manifest registers', () => {
    expect(names).toEqual(templates.map((template) => template.name));
  });

  it.each(templates.map((template) => template.name))('renders %s without throwing', (name) => {
    const template = templates.find((entry) => entry.name === name);
    expect(template, `Missing manifest entry for ${name}`).toBeDefined();
    expect(() => renderTemplate(name, templateData[template!.id])).not.toThrow();
  });

  it.each(templates.map((template) => template.name))('renders %s to valid HTML', (name) => {
    const template = templates.find((entry) => entry.name === name);
    const html = renderTemplate(name, templateData[template!.id]);

    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('<html');
    expect(html).toContain('</html>');
    expect(html).toContain('<body');
    expect(html.length).toBeGreaterThan(500);
  });

  it('every template is reachable via its canonical name', () => {
    for (const name of names) {
      expect(() => getTemplate(name)).not.toThrow();
    }
  });

  it('every template is reachable via its lowercase name', () => {
    for (const name of names) {
      expect(() => getTemplate(name.toLowerCase())).not.toThrow();
    }
  });

  it('every template render is deterministic', () => {
    for (const template of templates) {
      const a = renderTemplate(template.name, templateData[template.id]);
      const b = renderTemplate(template.name, templateData[template.id]);
      expect(a, `${template.name} is not deterministic`).toBe(b);
    }
  });

  it('still renders the compact WelcomeEmail path through the registry', () => {
    const html = renderTemplate('WelcomeEmail', welcomeMinimalProps);
    expect(html).toContain('Welcome, Alex!');
    expect(html).not.toContain('email-wrapper');
  });
});
