// packages/template-runtime-display/src/renderers.ts

import type {
  HtmlString,
  DisplayHeadProps,
  DisplayMainProps,
  DisplayFooterProps,
  DisplayBodyProps,
} from './types';

/**
 * Pure, non-mutating display renderers.
 * Each function takes settings + returns an HTML string fragment.
 * No shared mutable state between calls (mirrors the "pure pipeline" fix
 * from hn_email_template's Phase 2 migration notes).
 *
 * ⚠ Behavioral quirks preserved 1:1 from the JS originals:
 *   - displayHead() emits a <div> inside <head> for preview text. This is
 *     invalid HTML but is what the original does. Fix separately if needed.
 *   - displayBody() does not insert a newline between ${headHtml} and
 *     <body> — matches the original string concatenation exactly.
 *   - All whitespace / indentation in the template literals is unchanged.
 */

// ---------------------------------------------------------------------------
// displayHead
// ---------------------------------------------------------------------------

export function displayHead({
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

// ---------------------------------------------------------------------------
// displayMain
// ---------------------------------------------------------------------------

export function displayMain({
  heading,
  bodyText,
  ctaLabel,
  ctaUrl,
}: DisplayMainProps = {}): HtmlString {
  const cta =
    ctaLabel && ctaUrl
      ? `<a href="${ctaUrl}" style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:4px;">${ctaLabel}</a>`
      : '';

  return `
    <main>
      <h1>${heading || ''}</h1>
      <p>${bodyText || ''}</p>
      ${cta}
    </main>`;
}

// ---------------------------------------------------------------------------
// displayFooter
// ---------------------------------------------------------------------------

export function displayFooter({
  companyName,
  unsubscribeUrl,
}: DisplayFooterProps = {}): HtmlString {
  const unsubscribe = unsubscribeUrl
    ? `<a href="${unsubscribeUrl}">Unsubscribe</a>`
    : '';

  return `
    <footer>
      <p>${companyName || ''}</p>
      ${unsubscribe}
    </footer>`;
}

// ---------------------------------------------------------------------------
// displayBody
// ---------------------------------------------------------------------------

export function displayBody({
  headHtml,
  mainHtml,
  footerHtml,
}: DisplayBodyProps = {}): HtmlString {
  return `<!DOCTYPE html>
<html lang="en">
${headHtml}
<body>
${mainHtml}
${footerHtml}
</body>
</html>`;
}
