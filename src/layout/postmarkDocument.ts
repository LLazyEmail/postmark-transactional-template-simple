import { xhtmlDocument } from '@llazyemail/template-runtime-display';
import type { EmailBrandProps } from '../types/brand.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';
import { renderPostmarkHead } from './postmarkHead.ts';
import { renderPostmarkShell } from './postmarkShell.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

/**
 * Full Postmark document via runtime `xhtmlDocument()` (XHTML transitional
 * doctype, `xmlns`, no `lang` baked in). Preheader goes through the
 * `preheaderHtml` slot; the Postmark shell (masthead, body, footer row) is
 * `mainHtml`.
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
  return xhtmlDocument({
    headHtml: renderPostmarkHead(),
    preheaderHtml:
      preheader === undefined ? '' : `<span class="preheader">${preheader}</span>`,
    mainHtml: renderPostmarkShell({
      productName: product_name,
      companyUrl: company_url,
      bodyHtml: body,
      footerHtml: renderPostmarkFooter({
        company_name,
        company_address,
        company_suite,
      }),
    }),
  });
}
