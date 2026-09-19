// src/templates/registry.js
//
// Unified template registry.
//
// Two systems live side-by-side in src/templates/:
//
//   (A) Legacy .definition.js files:
//         module.exports = { passwordReset, TEMPLATE_ID: '...' }
//         shape: (payload) => htmlString
//
//   (B) New typed .ts templates:
//         export const InvoiceEmail: ITemplate<Props> = { name, render }
//         shape: { name: string, render: (props) => htmlString }
//
// This module normalizes both into:
//     { id: string, name: string, render: (payload) => string }
//
// so callers only ever see one interface.

// --- System A: legacy definitions ------------------------------------------
const { passwordReset, TEMPLATE_ID: PASSWORD_RESET_ID } =
  require('./password-reset.definition');
const { orderConfirmation, TEMPLATE_ID: ORDER_CONFIRMATION_ID } =
  require('./order-confirmation.definition');

// --- System B: typed TS templates ------------------------------------------
// NOTE: these are .ts files. If you're running this with `ts-node` /
// `tsx`, `require` works fine. If you're running plain `node` on compiled
// output, change these paths to `./invoiceEmail.js` etc.
const { InvoiceEmail } = require('./invoiceEmail');
const { WelcomeEmail } = require('./welcomeEmail');
const { TrialExpiringEmail } = require('./trialExpiringEmail');
const { UserInvitationEmail } = require('./userInvitationEmail');

/**
 * Normalize a legacy `(payload) => html` function into the unified shape.
 * @param {string} id
 * @param {string} name
 * @param {(payload: any) => string} render
 */
function fromLegacy(id, name, render) {
  return { id, name, render };
}

/**
 * Normalize an ITemplate<T> object into the unified shape.
 * @param {import('../types/template').ITemplate<any>} template
 */
function fromTyped(template) {
  return {
    id: template.name, // TS templates use `name` as their canonical ID
    name: template.name,
    render: (payload) => template.render(payload),
  };
}

// ---------------------------------------------------------------------------
// Canonical template list. Add new templates here once and they're reachable
// by both their legacy ID and their `ITemplate.name`.
// ---------------------------------------------------------------------------
const templates = [
  // Legacy
  fromLegacy(PASSWORD_RESET_ID, 'PasswordReset', passwordReset),
  fromLegacy(ORDER_CONFIRMATION_ID, 'OrderConfirmation', orderConfirmation),

  // Typed
  fromTyped(InvoiceEmail),
  fromTyped(WelcomeEmail),
  fromTyped(TrialExpiringEmail),
  fromTyped(UserInvitationEmail),
];

// Build the lookup map. Also register each template under a lowercase alias
// so 'invoice' and 'InvoiceEmail' both resolve — handy during the migration.
const registry = {};
for (const tpl of templates) {
  registry[tpl.id] = tpl;
  registry[tpl.name] = tpl;
  registry[tpl.id.toLowerCase()] = tpl;
  registry[tpl.name.toLowerCase()] = tpl;
}

/**
 * renderTemplate(templateId, payload) -> HTML string
 * Public contract is unchanged from the old index.js.
 */
function renderTemplate(templateId, payload) {
  const tpl = registry[templateId] || registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${listTemplates().join(', ')}`
    );
  }
  return tpl.render(payload);
}

function listTemplates() {
  // De-duplicate (we registered 4 keys per template above).
  return Array.from(new Set(templates.map((t) => t.name)));
}

/** Look up a raw template object (name + render). Useful for tests. */
function getTemplate(templateId) {
  const tpl = registry[templateId] || registry[String(templateId).toLowerCase()];
  if (!tpl) {
    throw new Error(`Unknown template id: "${templateId}".`);
  }
  return tpl;
}

module.exports = { renderTemplate, listTemplates, getTemplate, templates };
