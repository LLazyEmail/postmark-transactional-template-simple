import { head } from './blocks.ts';
import { POSTMARK_MSO_FALLBACK } from './postmarkMsoFallback.ts';
import { POSTMARK_STYLES } from './postmarkStyles.ts';

/** Postmark `<head>`: shared stylesheet plus the Outlook fallback. */
export function renderPostmarkHead(): string {
  return head({
    styles: POSTMARK_STYLES,
    extraHead: POSTMARK_MSO_FALLBACK,
  });
}
