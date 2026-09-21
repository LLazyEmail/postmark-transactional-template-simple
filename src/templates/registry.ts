// src/templates/registry.ts
import type { RegisteredTemplate, TemplateRenderFn } from '../types/template';

// --- Legacy-converted definitions -------------------------------------------
import {
  passwordReset,
  TEMPLATE_ID as PASSWORD_RESET_ID,
} from './password-reset.definition';
import {
  orderConfirmation,
  TEMPLATE_ID as ORDER_CONFIRMATION_ID,
} from './order-confirmation.definition';

// --- Native typed templates -------------------------------------------------
import { InvoiceEmail } from './invoiceEmail';
import { WelcomeEmail } from './welcomeEmail';
import { TrialExpiringEmail } from './trialExpiringEmail';
import { UserInvitationEmail } from './userInvitationEmail';

// ---------------------------------------------------------------------------
// Normalization helpers
// ---------------------------------------------------------------------------

/**
 * Wrap a legacy `{ template, id }` pair into the unified shape.
 * `template` already satisfies `ITemplate<Props>` after conversion, so
 * this is basically just attaching the legacy kebab-case `id`.
 */
function fromLegacy<Props>(
  id: string,
  name: string,
  template: { render: TemplateRenderFn<Props> }
): RegisteredTemplate<Props> {
  return { id, name, render: template.render };
}

/**
 * Wrap a native typed template — its `name` doubles as the canonical ID.
 */
function fromTyped<Props>(template: {
  name: string;
  render: TemplateRenderFn<Props>;
}): RegisteredTemplate<Props> {
  return {
    id: template.name,
    name: template.name,
    render: (props) => template.render(props),
  };
}

// ---------------------------------------------------------------------------
// Canonical template list.
// ---------------------------------------------------------------------------
const templates: RegisteredTemplate<unknown>[] = [
  fromLegacy(PASSWORD_RESET_ID, passwordReset.name, passwordReset),
  fromLegacy(ORDER_CONFIRMATION_ID, orderConfirmation.name, orderConfirmation),

  fromTyped(InvoiceEmail),
  fromTyped(WelcomeEmail),
  fromTyped(TrialExpiringEmail),
  fromTyped(UserInvitationEmail),
];

// ---------------------------------------------------------------------------
// Lookup map — registers each template under 4 keys:
//   id, name, id.toLowerCase(), name.toLowerCase()
// so 'password-reset', 'PasswordResetEmail', and 'passwordresetemail'
// all resolve to the same template.
// ---------------------------------------------------------------------------
const registry: Record<string, RegisteredTemplate<unknown>> = {};
for (const tpl of templates) {
  registry[tpl.id] = tpl;
  registry[tpl.name] = tpl;
  registry[tpl.id.toLowerCase()] = tpl;
  registry[tpl.name.toLowerCase()] = tpl;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * renderTemplate(templateId, payload) -> HTML string
 * Same contract as the original index.js.
 */
export function renderTemplate<Props = unknown>(
  templateId: string,
  payload: Props
): string {
  const tpl =
    registry[templateId] ?? registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${listTemplates().join(
        ', '
      )}`
    );
  }
  return tpl.render(payload);
}

/** List the canonical names of every registered template. */
export function listTemplates(): string[] {
  return Array.from(new Set(templates.map((t) => t.name)));
}

/** Look up a raw template object (useful for tests). */
export function getTemplate(
  templateId: string
): RegisteredTemplate<unknown> {
  const tpl =
    registry[templateId] ?? registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${listTemplates().join(
        ', '
      )}`
    );
  }
  return tpl;
}

/**
 * Default export — mirrors the CommonJS surface the legacy `index.js`
 * exposed (`{ renderTemplate, listTemplates }`), so both:
 *
 *   const { renderTemplate } = require('./templates');
 *   import { renderTemplate } from './templates';
 *   import templates from './templates';
 *
 * keep working during the migration.
 */
const registryApi = {
  renderTemplate,
  listTemplates,
  getTemplate,
  templates,
};

export default registryApi;
