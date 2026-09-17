const { passwordReset, TEMPLATE_ID: PASSWORD_RESET_ID } = require('./password-reset.definition');
const {
  orderConfirmation,
  TEMPLATE_ID: ORDER_CONFIRMATION_ID,
} = require('./order-confirmation.definition');

const registry = {
  [PASSWORD_RESET_ID]: passwordReset,
  [ORDER_CONFIRMATION_ID]: orderConfirmation,
};

/**
 * renderTemplate(templateId, payload) -> HTML string
 * Same public contract shape as hn_email_template's renderTemplate registry path.
 */
function renderTemplate(templateId, payload) {
  const template = registry[templateId];
  if (!template) {
    throw new Error(
      `Unknown template id: "${templateId}". Available: ${Object.keys(registry).join(', ')}`
    );
  }
  return template(payload);
}

function listTemplates() {
  return Object.keys(registry);
}

module.exports = { renderTemplate, listTemplates };
