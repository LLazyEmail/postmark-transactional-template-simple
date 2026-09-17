const { createTemplateFromDefinition } = require('./createTemplateFromDefinition');
const { isNonEmptyString, requireNonEmptyString, requireFields } = require('./validation');

module.exports = {
  createTemplateFromDefinition,
  isNonEmptyString,
  requireNonEmptyString,
  requireFields,
};
