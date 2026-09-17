/**
 * Small, dependency-free validation helpers used by template definitions.
 * Kept intentionally tiny — this is a starter package, not a full schema library.
 */

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function requireNonEmptyString(value, fieldName, templateId) {
  if (!isNonEmptyString(value)) {
    throw new Error(`[template:${templateId}] missing required field: ${fieldName}`);
  }
}

function requireFields(data, fields, templateId) {
  fields.forEach((field) => {
    const value = field.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), data);
    requireNonEmptyString(value, field, templateId);
  });
}

module.exports = {
  isNonEmptyString,
  requireNonEmptyString,
  requireFields,
};
