import { body, escapeHtml, head } from 'template-runtime-display';
import type { EmailBrandProps } from '../types/brand.ts';
import { POSTMARK_STYLES } from './postmarkStyles.ts';

export interface PostmarkDocumentProps extends EmailBrandProps {
  preheader?: string;
  body: string;
}

const MSO_FALLBACK = `<!--[if mso]>
    <style type="text/css">
      .f-fallback  { font-family: Arial, sans-serif; }
    </style>
  <![endif]-->`;

export function renderPostmarkDocument({
  preheader,
  product_name,
  company_name,
  company_address,
  company_suite,
  company_url,
  body: bodyContent,
}: PostmarkDocumentProps): string {
  const preheaderHtml = preheader
    ? `<span class="preheader">${escapeHtml(preheader)}</span>`
    : '';

  const headHtml = head({
    styles: POSTMARK_STYLES,
    extraHead: MSO_FALLBACK,
  });

  const mainHtml = `<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td class="email-masthead">
                <a href="${escapeHtml(company_url)}" class="f-fallback email-masthead_name">${escapeHtml(product_name)}</a>
              </td></tr>
            <tr><td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr><td class="content-cell"><div class="f-fallback">${bodyContent}</div></td></tr>
                </table>
              </td></tr>
            <tr><td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr><td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">${escapeHtml(company_name)}<br>${escapeHtml(company_address)}<br>${escapeHtml(company_suite)}</p>
                    </td></tr>
                </table>
              </td></tr>
          </table>
        </td></tr>
    </table>`;

  const bodyHtml = body({ preheaderHtml, mainHtml });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
${headHtml}
${bodyHtml}
</html>`;
}