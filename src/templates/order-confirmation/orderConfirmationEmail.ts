export type { OrderConfirmationEmailProps } from './types.ts';
import type { OrderConfirmationEmailProps } from './types.ts';
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
import { orderConfirmationData } from '../../data/order-confirmation.ts';

function formatAddress(addr: string): string {
  return addr.split('\n').map((line) => escapeHtml(line)).join('<br>');
}

/** Billing address block; empty when billing matches shipping or is blank. */
function buildBillingBlock({
  billing_address,
  shipping_address,
}: Pick<OrderConfirmationEmailProps, 'billing_address' | 'shipping_address'>): string {
  if (!billing_address || billing_address === shipping_address) return '';
  return attributeTable(
    attributeRow(
      `<span class="f-fallback"><strong>Billing address:</strong><br>${formatAddress(billing_address)}</span>`
    )
  );
}

/** Legacy kebab-case id. Kept as an alias so `renderTemplate('order-confirmation')` keeps resolving. */
export const TEMPLATE_ID = 'order-confirmation' as const;

/**
 * OrderConfirmationEmail
 * ----------------------
 * Typed conversion of the legacy `order-confirmation.definition.js`.
 *
 * The shared Postmark document supplies the stylesheet, masthead, and
 * footer. The body is the itemized receipt, shipping/billing block, and
 * "View order" CTA.
 */
export const orderConfirmation = defineEmail<OrderConfirmationEmailProps>({
  id: 'OrderConfirmationEmail',
  aliases: [TEMPLATE_ID],
  name: 'OrderConfirmationEmail',
  file: 'order-confirmation/orderConfirmationEmail.ts',
  exportName: 'orderConfirmation',
  data: orderConfirmationData,

  render: ({
    name,
    preheader,
    order_id,
    order_date,
    total,
    order_items,
    shipping_address,
    billing_address,
    action_url,
    support_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const itemRows = order_items
      .map(
        ({ description, unit_price, quantity, total: lineTotal }) => `
                                <tr>
                                  <td width="60%" class="purchase_item"><span class="f-fallback">${escapeHtml(description)}</span></td>
                                  <td class="align-right" width="15%" class="purchase_item"><span class="f-fallback">${escapeHtml(unit_price)}</span></td>
                                  <td class="align-right" width="10%" class="purchase_item"><span class="f-fallback">${escapeHtml(quantity)}</span></td>
                                  <td class="align-right" width="15%" class="purchase_item"><span class="f-fallback">${escapeHtml(lineTotal)}</span></td>
                                </tr>`
      )
      .join('');

    const billingBlock = buildBillingBlock({
      billing_address,
      shipping_address,
    });

    const body = `<h1>Hi ${escapeHtml(name)},</h1>
                        <p>Thanks for your order. This email is your receipt for order <strong>${escapeHtml(order_id)}</strong> placed on <strong>${escapeHtml(order_date)}</strong>.</p>
                        ${actionBlock(bulletproofButton(action_url, 'View your order', 'green'))}
                        <table class="purchase" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <h3>${escapeHtml(order_id)}</h3>
                            </td>
                            <td>
                              <h3 class="align-right">${escapeHtml(order_date)}</h3>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <table class="purchase_content" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <th class="purchase_heading" align="left"><p class="f-fallback">Description</p></th>
                                  <th class="purchase_heading" align="right"><p class="f-fallback">Unit price</p></th>
                                  <th class="purchase_heading" align="right"><p class="f-fallback">Qty</p></th>
                                  <th class="purchase_heading" align="right"><p class="f-fallback">Amount</p></th>
                                </tr>${itemRows}
                                <tr>
                                  <td colspan="3" width="80%" class="purchase_footer" valign="middle">
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
                        ${attributeTable(
                          attributeRow(
                            `<span class="f-fallback"><strong>Shipping address:</strong><br>${formatAddress(shipping_address)}</span>`
                          )
                        )}${billingBlock}
                        <p>If you have any questions about this order, simply reply to this email or reach out to our <a href="${escapeHtml(support_url)}">support team</a>.</p>
                        <p>Cheers,<br>The ${escapeHtml(product_name)} team</p>
                        ${subCopy(
                          "If you're having trouble with the button above, copy and paste the URL below into your web browser.",
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
