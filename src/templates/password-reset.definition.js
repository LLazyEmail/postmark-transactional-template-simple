const { createTemplateFromDefinition, requireFields } = require('../../packages/template-engine/src');
const {
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
} = require('../../packages/template-runtime-display/src');

const TEMPLATE_ID = 'password-reset';

function validateInput(payload) {
  requireFields(
    payload,
    ['recipientName', 'resetUrl', 'companyName'],
    TEMPLATE_ID
  );
}

function map(payload) {
  return {
    title: `Reset your ${payload.companyName} password`,
    preview: `Hi ${payload.recipientName}, reset your password to regain access.`,
    heading: 'Reset your password',
    bodyText: `Hi ${payload.recipientName}, we received a request to reset your password. Click the button below to choose a new one. This link expires in 30 minutes.`,
    ctaLabel: 'Reset password',
    ctaUrl: payload.resetUrl,
    companyName: payload.companyName,
    unsubscribeUrl: payload.unsubscribeUrl,
  };
}

function render(model) {
  const headHtml = displayHead({ title: model.title, preview: model.preview });
  const mainHtml = displayMain({
    heading: model.heading,
    bodyText: model.bodyText,
    ctaLabel: model.ctaLabel,
    ctaUrl: model.ctaUrl,
  });
  const footerHtml = displayFooter({
    companyName: model.companyName,
    unsubscribeUrl: model.unsubscribeUrl,
  });

  return displayBody({ headHtml, mainHtml, footerHtml });
}

const passwordReset = createTemplateFromDefinition({
  id: TEMPLATE_ID,
  validateInput,
  map,
  render,
});

module.exports = { passwordReset, TEMPLATE_ID };
