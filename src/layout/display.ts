/**
 * Single import site for @llazyemail/template-runtime-display.
 *
 * Call sites should import `body`, `escapeHtml`, and `head` from this module
 * (or from the package subpaths) instead of reimplementing them.
 *
 * Duplicates still in this repo, safe to delete once every caller uses this module:
 * - `src/layout/html.ts` — local `escapeHtml`. It is now a compatibility shim.
 * - inlined `<head>` / `<body>` markup previously copied in `postmarkDocument.ts`.
 *   `renderPostmarkDocument` composes `head()` and `body()` from the package.
 *
 * Not duplicates (Postmark-specific, keep):
 * - `postmarkStyles.ts`, `postmarkMsoFallback.ts`, `postmarkFooter.ts`, `blocks.ts`.
 */
export { body, escapeHtml, head } from '@llazyemail/template-runtime-display';
export type { BodyProps, HeadProps } from '@llazyemail/template-runtime-display';
