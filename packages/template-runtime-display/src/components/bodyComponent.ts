import type { HtmlString } from '../types';

/**
 * Low-level `<body>` fragment. Missing fragments stay as the string
 * "undefined", matching the original template-literal interpolation.
 */
export function bodyComponent({
  mainHtml,
  footerHtml,
}: {
  mainHtml: HtmlString | undefined;
  footerHtml: HtmlString | undefined;
}): HtmlString {
  return `<body>
${mainHtml}
${footerHtml}
</body>`;
}
