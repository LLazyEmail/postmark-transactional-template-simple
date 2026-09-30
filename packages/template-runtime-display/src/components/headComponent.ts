import type { DisplayHeadProps, HtmlString } from '../types';

/** Low-level `<head>` fragment. `displayHead` delegates here. */
export function headComponent({
  title,
  preview,
}: DisplayHeadProps = {}): HtmlString {
  return `
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title || ''}</title>
    <!-- preview text, hidden -->
    <div style="display:none;max-height:0;overflow:hidden;">${preview || ''}</div>
  </head>`;
}
