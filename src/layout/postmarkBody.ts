import type { EmailBrandProps } from '../types/brand.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';
import { renderPostmarkShell } from './postmarkShell.ts';

export interface PostmarkBodyProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

function renderPreheader(preheader: string | undefined): string {
  if (preheader === undefined) return '';
  return `<span class="preheader">${preheader}</span>\n    `;
}

/** Inner content for the Postmark `<body>` (preheader + shell). Document wraps it. */
export function renderPostmarkBody({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body,
}: PostmarkBodyProps): string {
  const preheaderHtml = renderPreheader(preheader);
  const shell = renderPostmarkShell({
    productName: product_name,
    companyUrl: company_url,
    bodyHtml: body,
    footerHtml: renderPostmarkFooter({
      company_name,
      company_address,
      company_suite,
    }),
  });
  return `${preheaderHtml}${shell}`;
}
