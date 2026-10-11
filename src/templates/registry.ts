import { templates as registeredTemplates } from './manifest.ts';
import { createEmailSystem } from './system.ts';

/**
 * The live email system, bound to the manifest. Every lookup surface —
 * `renderTemplate`, `listTemplates`, `getTemplate`, the maps, and
 * `templateData` — derives from this one call, so adding a template never
 * touches this file (ADR 0004).
 */
export const emailSystem = createEmailSystem(registeredTemplates);

export const {
  templates,
  byId,
  byName,
  templateData,
  lookup,
  renderTemplate,
  listTemplates,
  getTemplate,
} = emailSystem;

const registryApi = {
  renderTemplate,
  listTemplates,
  getTemplate,
  templates,
};

export default registryApi;
