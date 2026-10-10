import { validateInput } from '@llazyemail/validator';
import { lookupKeys, templates, type TemplateRegistration } from './manifest.ts';

/**
 * Lookup map. Each template is stored under its id, name, aliases, and the
 * lowercase form of each, so `password-reset`, `PasswordResetEmail`, and
 * `passwordresetemail` resolve to the same template.
 */
const registry: Record<string, TemplateRegistration> = {};
for (const tpl of templates) {
  for (const key of lookupKeys(tpl)) {
    registry[key] = tpl;
    registry[key.toLowerCase()] = tpl;
  }
}

/**
 * renderTemplate(templateId, payload) -> HTML string
 * Runs any declared validation checks before rendering.
 */
export function renderTemplate<Props = unknown>(
  templateId: string,
  payload: Props
): string {
  const tpl = registry[templateId] ?? registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${listTemplates().join(', ')}`
    );
  }

  if (tpl.checks && tpl.checks.length > 0) {
    validateInput(payload as Record<string, unknown>, tpl.checks);
  }

  return tpl.render(payload);
}

/** Canonical names of every registered template, in manifest order. */
export function listTemplates(): string[] {
  return templates.map((template) => template.name);
}

/** Look up a raw template object (useful for tests). */
export function getTemplate(templateId: string): TemplateRegistration {
  const tpl = registry[templateId] ?? registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${listTemplates().join(', ')}`
    );
  }
  return tpl;
}

const registryApi = {
  renderTemplate,
  listTemplates,
  getTemplate,
  templates,
};

export default registryApi;
