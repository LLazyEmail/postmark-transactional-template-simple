import type { DisplayMainProps, HtmlString } from '../types';

/** Low-level `<main>` fragment. The button renders only when both CTA fields are set. */
export function mainComponent({
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
