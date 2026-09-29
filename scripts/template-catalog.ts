/**
 * Generator view of `src/templates/manifest.ts`.
 * Ids, filenames, and preview payloads come from the manifest so this
 * file does not grow when a template is added.
 */
import { lookupKeys, templates } from '../src/templates/manifest.ts';

export interface TemplateCatalogEntry {
  ids: [string, ...string[]];
  file: string;
  exportName: string;
}

function uniqueIds(ids: string[]): [string, ...string[]] {
  const seen = new Set<string>();
  const unique = ids.filter((id) => {
    const key = id.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return unique as [string, ...string[]];
}

export const CATALOG: TemplateCatalogEntry[] = templates.map((template) => ({
  ids: uniqueIds(lookupKeys(template)),
  file: template.file,
  exportName: template.exportName,
}));

export const SAMPLE_PAYLOADS: Record<string, unknown> = {};
for (const template of templates) {
  for (const id of lookupKeys(template)) {
    SAMPLE_PAYLOADS[id] = template.sample;
  }
}
