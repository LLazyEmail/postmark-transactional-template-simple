/**
 * createTemplateFromDefinition
 *
 * Mirrors the pattern used in hn_email_template's packages/template-engine:
 * a definition describes { id, validateInput, map, render }, and this factory
 * wires them into a single callable template function.
 *
 * definition shape:
 *   {
 *     id: string,
 *     validateInput?: (payload) => void,   // throws on invalid input
 *     map: (payload) => model,             // payload -> render-ready model
 *     render: (model) => string            // model -> final HTML string
 *   }
 */
function createTemplateFromDefinition(definition) {
  const { id, validateInput, map, render } = definition;

  if (!id) {
    throw new Error('createTemplateFromDefinition: definition.id is required');
  }
  if (typeof map !== 'function') {
    throw new Error(`[template:${id}] definition.map must be a function`);
  }
  if (typeof render !== 'function') {
    throw new Error(`[template:${id}] definition.render must be a function`);
  }

  return function buildTemplate(payload) {
    if (typeof validateInput === 'function') {
      validateInput(payload);
    }
    const model = map(payload);
    return render(model);
  };
}

module.exports = { createTemplateFromDefinition };
