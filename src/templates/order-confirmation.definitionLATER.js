const { createTemplateFromDefinition, requireFields } = require('../../packages/template-engine/src');
const {
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
} = require('../../packages/template-runtime-display/src');

const TEMPLATE_ID = 'order-confirmation';

function validateInput(payload) {
  requireFields(
    payload,
    ['recipientName', 'orderId', 'companyName'],
    TEMPLATE_ID
  );
}

function map(payload) {
  return {
    title: `Order #${payload.orderId} confirmed`,
    preview: `Thanks for your order, ${payload.recipientName}!`,
    heading: 'Your order is confirmed',
    bodyText: `Hi ${payload.recipientName}, thanks for your order #${payload.orderId}. We'll email you again once it ships.`,
    ctaLabel: payload.orderUrl ? 'View order' : undefined,
    ctaUrl: payload.orderUrl,
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

const orderConfirmation = createTemplateFromDefinition({
  id: TEMPLATE_ID,
  validateInput,
  map,
  render,
});

module.exports = { orderConfirmation, TEMPLATE_ID };
