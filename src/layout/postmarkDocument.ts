import { document } from '@llazyemail/template-runtime-display';
import type { EmailBrandProps } from '../types/brand.ts';
import { renderPostmarkBody } from './postmarkBody.ts';
import { renderPostmarkHead } from './postmarkHead.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

const XHTML_DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

/**
 * Full Postmark document.
 *
 * Uses `@llazyemail/template-runtime-display`'s `document()` with the XHTML
 * transitional doctype, `xmlns`, and no `lang`. Requires the next release
 * that adds those shell options.
 */
export function renderPostmarkDocument(props: PostmarkDocumentProps): string {
  return document({
    doctype: XHTML_DOCTYPE,
    lang: false,
    htmlAttributes: 'xmlns="http://www.w3.org/1999/xhtml"',
    headHtml: renderPostmarkHead(),
    mainHtml: renderPostmarkBody(props),
  });
}
