import type { EmailBrandProps } from '../types/brand.ts';
import { body as renderBody, escapeHtml, head } from './blocks.ts';
import { POSTMARK_STYLES } from './postmarkStyles.ts';
import { POSTMARK_MSO_FALLBACK } from './postmarkMsoFallback.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';
import { renderPostmarkShell } from './postmarkShell.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

function renderPreheader(preheader: string | undefined): string {
  if (preheader === undefined) return '';
  return `<span class="preheader">${escapeHtml(preheader)}</span>\n    `;
}

export function renderPostmarkDocument({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body,
}: PostmarkDocumentProps): string {
  const headHtml = head({
    styles: POSTMARK_STYLES,
    extraHead: POSTMARK_MSO_FALLBACK,
  });
  const bodyHtml = renderBody({
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

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  ${headHtml}
  ${bodyHtml}
</html>`;
}
