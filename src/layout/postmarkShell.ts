import { escapeHtml } from './blocks.ts';

export interface PostmarkShellProps {
  productName: string;
  companyUrl: string;
  bodyHtml: string;
  footerHtml: string;
}

/** Wrapper, masthead, and body tables around the template HTML. */
export function renderPostmarkShell({
  productName,
  companyUrl,
  bodyHtml,
  footerHtml,
}: PostmarkShellProps): string {
  const masthead = `<a href="${escapeHtml(companyUrl)}" class="f-fallback email-masthead_name">${escapeHtml(productName)}</a>`;

  return `<table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr><td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td class="email-masthead">
                ${masthead}
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
    </table>`;
}
