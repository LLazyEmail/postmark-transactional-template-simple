import type { EmailBrandProps } from '../types/brand.ts';
import { renderPostmarkBody } from './postmarkBody.ts';
import { renderPostmarkHead } from './postmarkHead.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

/**
 * Full Postmark document. Keeps the XHTML transitional doctype; do not
 * swap in `template-runtime-display`'s `document()`.
 */
export function renderPostmarkDocument(props: PostmarkDocumentProps): string {
  const headHtml = renderPostmarkHead();
  const bodyHtml = renderPostmarkBody(props);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  ${headHtml}
  ${bodyHtml}
</html>`;
}
