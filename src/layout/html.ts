import { escapeHtml as escapeHtmlString } from '@llazyemail/template-runtime-display';

/**
 * @deprecated Import `escapeHtml` from `./display.ts` or
 * `@llazyemail/template-runtime-display`. This shim only accepts the old
 * `unknown` signature so existing callers keep compiling. Delete this file
 * after those imports move.
 */
export function escapeHtml(value: unknown): string {
  return escapeHtmlString(String(value ?? ''));
}
