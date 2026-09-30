import type { DisplayFooterProps, HtmlString } from '../types';

/** Low-level `<footer>` fragment. The unsubscribe link renders only when a URL is set. */
export function footerComponent({
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
