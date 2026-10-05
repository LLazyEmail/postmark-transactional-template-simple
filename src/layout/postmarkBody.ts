import type { EmailBrandProps } from '../types/brand.ts';
import { body as renderBody, escapeHtml } from './blocks.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';
import { renderPostmarkShell } from './postmarkShell.ts';

export interface PostmarkBodyProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

function renderPreheader(preheader: string | undefined): string {
  if (preheader === undefined) return '';
  return `<span class="preheader">${escapeHtml(preheader)}</span>\n    `;
}

/** Postmark `<body>`: preheader, shell, and footer around the template HTML. */
export function renderPostmarkBody({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body,
}: PostmarkBodyProps): string {
  return renderBody({
    preheaderHtml: renderPreheader(preheader),
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
