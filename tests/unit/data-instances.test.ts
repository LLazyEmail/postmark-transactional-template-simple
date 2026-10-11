// tests/unit/data-instances.test.ts
import { describe, it, expect } from 'vitest';
import { templates } from '../../src/templates/manifest.ts';
import { templateData } from '../../src/data/index.ts';

describe('data instances', () => {
  it('every registered template has a data instance', () => {
    for (const template of templates) {
      expect(templateData[template.id], `Missing data instance for ${template.id}`).toBeDefined();
    }
  });

  it('has no data instance without a registered template', () => {
    const ids = new Set(templates.map((template) => template.id));
    for (const key of Object.keys(templateData)) {
      expect(ids.has(key), `Orphan data instance: ${key}`).toBe(true);
    }
  });
});
