import { bodyComponent } from '../components/bodyComponent';
import { footerComponent } from '../components/footerComponent';
import { headComponent } from '../components/headComponent';
import { mainComponent } from '../components/mainComponent';
import type {
  DisplayBodyProps,
  DisplayContentProps,
  DisplayFooterProps,
  DisplayHeadProps,
  DisplayMainProps,
  HtmlString,
} from '../types';

/**
 * Display-pipeline sections. Each one is a pure function over its props
 * and returns an HTML string. The markup lives in `components/`.
 *
 * Quirks kept from the previous renderers:
 * - displayHead emits a `<div>` inside `<head>` for the preview text.
 * - displayBody does not insert an extra newline between the head fragment
 *   and `<body>` beyond the line break already in this template.
 */

export function displayHead(props: DisplayHeadProps = {}): HtmlString {
  return headComponent(props);
}

export function displayMain(props: DisplayMainProps = {}): HtmlString {
  return mainComponent(props);
}

export function displayFooter(props: DisplayFooterProps = {}): HtmlString {
  return footerComponent(props);
}

export function displayBody({
  headHtml,
  mainHtml,
  footerHtml,
}: DisplayBodyProps = {}): HtmlString {
  return `<!DOCTYPE html>
<html lang="en">
${headHtml}
${bodyComponent({ mainHtml, footerHtml })}
</html>`;
}

/** Inner content section. Empty when no HTML is passed. */
export function displayContent({
  content,
}: DisplayContentProps = {}): HtmlString {
  return `
    <div>
      ${content || ''}
    </div>`;
}
