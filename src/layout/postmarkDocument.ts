import type { EmailBrandProps } from '../types/brand.ts';
import { body as renderBody, escapeHtml, head } from './blocks.ts';
import { POSTMARK_STYLES } from './postmarkStyles.ts';
import { POSTMARK_MSO_FALLBACK } from './postmarkMsoFallback.ts';
import { renderPostmarkFooter } from './postmarkFooter.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

export function renderPostmarkDocument({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body: bodyHtml,
}: PostmarkDocumentProps): string {
  const preheaderHtml =
    preheader === undefined
      ? ''
      : `<span class="preheader">${escapeHtml(preheader)}</span>\n    `;

  const footerHtml = renderPostmarkFooter({
    company_name,
    company_address,
    company_suite,
  });

  const documentHead = head({
    styles: POSTMARK_STYLES,
    extraHead: POSTMARK_MSO_FALLBACK,
  });
  const documentBody = renderBody({
    preheaderHtml,
    mainHtml: `<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td class="email-masthead">
                <a href="${escapeHtml(company_url)}" class="f-fallback email-masthead_name">${escapeHtml(product_name)}</a>
              </td></tr>
            <tr><td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr><td class="content-cell"><div class="f-fallback">${bodyHtml}</div></td></tr>
                </table>
              </td></tr>
            <tr><td>
                ${footerHtml}
              </td></tr>
          </table>
        </td></tr>
    </table>`,
  });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  ${documentHead}
  ${documentBody}
</html>`;
}
