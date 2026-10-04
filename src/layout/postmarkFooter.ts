import { escapeHtml } from './html.ts';
import type { EmailBrandProps } from '../types/brand.ts';

export type PostmarkFooterBrandProps = Pick<
  EmailBrandProps,
  'company_name' | 'company_address' | 'company_suite'
>;

export interface PostmarkFooterProps extends PostmarkFooterBrandProps {
  /** Optional override for the whole footer cell. */
  innerHtml?: string;
}

/**
 * Postmark default footer: company name + address lines, centered.
 * Kept as a standalone entity so templates can swap it without touching
 * `renderPostmarkDocument`.
 */
export function renderPostmarkFooter({
  company_name,
  company_address,
  company_suite,
  innerHtml,
}: PostmarkFooterProps): string {
  const content =
    innerHtml ??
    `<p class="f-fallback sub align-center">${escapeHtml(company_name)}<br>${escapeHtml(company_address)}<br>${escapeHtml(company_suite)}</p>`;

  return `<table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr><td class="content-cell" align="center">
                      ${content}
                    </td></tr>
                </table>`;
}