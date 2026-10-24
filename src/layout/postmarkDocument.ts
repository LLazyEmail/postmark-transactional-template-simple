import { document } from '@llazyemail/template-runtime-display';
import type { EmailBrandProps } from '../types/brand.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';
import { renderPostmarkHead } from './postmarkHead.ts';
import { renderPostmarkShell } from './postmarkShell.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

const XHTML_DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

/**
 * Full Postmark document via runtime `document()`: XHTML transitional doctype,
 * `xmlns`, no `lang`. Preheader goes through the `preheaderHtml` slot; the
 * Postmark shell (masthead, body, footer row) is `mainHtml`.
 *
 * The footer stays inside the shell table on purpose: runtime `footerHtml`
 * renders after `mainHtml`, outside `.email-content`, which would change layout.
 */
export function renderPostmarkDocument({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body,
}: PostmarkDocumentProps): string {
  return document({
    doctype: XHTML_DOCTYPE,
    lang: false,
    htmlAttributes: 'xmlns="http://www.w3.org/1999/xhtml"',
    headHtml: renderPostmarkHead(),
    preheaderHtml: preheader === undefined ? '' : `<span class="preheader">${preheader}</span>`,
    mainHtml: renderPostmarkShell({
      productName: product_name,
      companyUrl: company_url,
      bodyHtml: body,
      footerHtml: renderPostmarkFooter({ company_name, company_address, company_suite }),
    }),
  });
}
