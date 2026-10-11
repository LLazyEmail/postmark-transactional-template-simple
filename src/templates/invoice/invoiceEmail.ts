export type { InvoiceEmailProps } from './types.ts';
import type { InvoiceLineItem, InvoiceEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import {
  actionBlock,
  attributeRow,
  attributeTable,
  bulletproofButton,
  subCopy,
} from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineEmail } from '../defineEmail.ts';
import { invoiceData } from '../../data/invoice.ts';

/** Itemized rows for the invoice details table. */
function buildInvoiceRows(invoice_details: InvoiceLineItem[]): string {
  return invoice_details
    .map(
      ({ description, amount }) => `
                                <tr>
                                  <td width="80%" class="purchase_item"><span class="f-fallback">${escapeHtml(description)}</span></td>
                                  <td class="align-right" width="20%" class="purchase_item"><span class="f-fallback">${escapeHtml(amount)}</span></td>
                                </tr>`
    )
    .join('');
}

/**
 * InvoiceEmail
 * -------------
 * Typed port of the Postmark `invoice` transactional template
 * (`reference/invoice/content.html`).
 *
 * The shared Postmark document supplies the stylesheet, masthead, and
 * footer. `{{#each invoice_details}}` is expanded in TypeScript.
 */
export const InvoiceEmail = defineEmail<InvoiceEmailProps>({
  id: 'InvoiceEmail',
  aliases: ['invoice'],
  name: 'InvoiceEmail',
  file: 'invoice/invoiceEmail.ts',
  exportName: 'InvoiceEmail',
  data: invoiceData,

  render: ({
    name,
    preheader,
    invoice_id,
    date,
    total,
    due_date,
    action_url,
    support_url,
    invoice_details,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const invoiceRows = buildInvoiceRows(invoice_details);

    const body = `<h1>Hi ${escapeHtml(name)},</h1>
                        <p>Thanks for using ${escapeHtml(product_name)}. This is an invoice for your recent purchase.</p>
                        ${attributeTable(
                          attributeRow(
                            `<span class="f-fallback"><strong>Amount Due:</strong> ${escapeHtml(total)}</span>`
                          ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Due By:</strong> ${escapeHtml(due_date)}</span>`
                            )
                        )}
                        ${actionBlock(bulletproofButton(action_url, 'Pay Invoice', 'green'))}
                        <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <h3>${escapeHtml(invoice_id)}</h3>
                            </td>
                            <td>
                              <h3 class="align-right">${escapeHtml(date)}</h3>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <th class="purchase_heading" align="left">
                                    <p class="f-fallback">Description</p>
                                  </th>
                                  <th class="purchase_heading" align="right">
                                    <p class="f-fallback">Amount</p>
                                  </th>
                                </tr>${invoiceRows}
                                <tr>
                                  <td width="80%" class="purchase_footer" valign="middle">
                                    <p class="f-fallback purchase_total purchase_total--label">Total</p>
                                  </td>
                                  <td width="20%" class="purchase_footer" valign="middle">
                                    <p class="f-fallback purchase_total">${escapeHtml(total)}</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <p>If you have any questions about this invoice, simply reply to this email or reach out to our <a href="${escapeHtml(support_url)}">support team</a> for help.</p>
                        <p>Cheers,
                          <br>The ${escapeHtml(product_name)} team</p>
                        ${subCopy(
                          'If you\u2019re having trouble with the button above, copy and paste the URL below into your web browser.',
                          action_url
                        )}`;

    return renderPostmarkDocument({
      preheader,
      product_name,
      company_name,
      company_address,
      company_suite,
      company_url,
      body,
    });
  },
});
