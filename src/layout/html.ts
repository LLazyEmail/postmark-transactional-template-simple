/**
 * Escape text that is interpolated into HTML body copy or attributes.
 * Matches Handlebars `{{field}}` (escaped), not `{{{field}}}` (raw).
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
