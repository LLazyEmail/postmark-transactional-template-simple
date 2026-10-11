import { validateInput } from '@llazyemail/validator';
import { lookupKeys, type EmailModule } from './defineEmail.ts';

/**
 * Everything derived from the registered email modules. Built by
 * `createEmailSystem()`, which is pure: pass it any list of modules and it
 * derives the whole surface. `registry.ts` instantiates it with the real
 * manifest.
 */
export interface EmailSystem {
  /** The registered emails, in registration order. */
  readonly templates: readonly EmailModule<any>[];
  /** Canonical id -> email. */
  readonly byId: Readonly<Record<string, EmailModule<any>>>;
  /** Canonical name -> email. */
  readonly byName: Readonly<Record<string, EmailModule<any>>>;
  /** Template id -> default payload (the `src/data/` instance). */
  readonly templateData: Readonly<Record<string, unknown>>;
  /** Case-insensitive lookup over id, name, and aliases. */
  lookup(key: string): EmailModule<any> | undefined;
  /** Render one email, running declared `checks` first. */
  renderTemplate<Props = unknown>(templateId: string, payload: Props): string;
  /** Canonical names in registration order. */
  listTemplates(): string[];
  /** Email by any lookup key; throws with the available list when unknown. */
  getTemplate(templateId: string): EmailModule<any>;
}

export function createEmailSystem(
  templates: readonly EmailModule<any>[]
): EmailSystem {
  const registry: Record<string, EmailModule<any>> = {};
  const byId: Record<string, EmailModule<any>> = {};
  const byName: Record<string, EmailModule<any>> = {};
  const templateData: Record<string, unknown> = {};

  for (const template of templates) {
    byId[template.id] = template;
    byName[template.name] = template;
    templateData[template.id] = template.data;
    for (const key of lookupKeys(template)) {
      registry[key] = template;
      registry[key.toLowerCase()] = template;
    }
  }

  const lookup = (key: string): EmailModule<any> | undefined =>
    registry[key] ?? registry[String(key).toLowerCase()];

  const listTemplates = (): string[] => templates.map((template) => template.name);

  const getTemplate = (templateId: string): EmailModule<any> => {
    const template = lookup(templateId);
    if (!template) {
      throw new Error(
        `Unknown template id: "${templateId}". Available: ${listTemplates().join(', ')}`
      );
    }
    return template;
  };

  const renderTemplate = <Props = unknown>(templateId: string, payload: Props): string => {
    const template = getTemplate(templateId);
    if (template.checks && template.checks.length > 0) {
      validateInput(payload as Record<string, unknown>, template.checks);
    }
    return template.render(payload);
  };

  return {
    templates,
    byId,
    byName,
    templateData,
    lookup,
    renderTemplate,
    listTemplates,
    getTemplate,
  };
}
