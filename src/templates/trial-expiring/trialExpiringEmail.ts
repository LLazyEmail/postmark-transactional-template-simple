export type { TrialExpiringEmailProps } from './types.ts';
import type { TrialExpiringEmailProps } from './types.ts';
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
import { trialExpiringData } from '../../data/trial-expiring.ts';

/**
 * TrialExpiringEmail
 * ------------------
 * Typed port of the "trial expiring" transactional template.
 * The shared Postmark document supplies the stylesheet, masthead, and footer.
 */
export const TrialExpiringEmail = defineEmail<TrialExpiringEmailProps>({
  id: 'TrialExpiringEmail',
  aliases: ['trial-expiring'],
  name: 'TrialExpiringEmail',
  file: 'trial-expiring/trialExpiringEmail.ts',
  exportName: 'TrialExpiringEmail',
  data: trialExpiringData,

  render: ({
    name,
    preheader,
    plan_name,
    trial_end_date,
    trial_days_remaining,
    plan_price,
    benefits,
    action_url,
    secondary_url,
    support_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const benefitItems = benefits
      .map(
        ({ title, description }) => `
                        <tr>
                          <td class="benefit_item">
                            <p class="f-fallback benefit_title"><strong>${escapeHtml(title)}</strong>${
          description
            ? ` \u2014 <span class="benefit_description">${escapeHtml(description)}</span>`
            : ''
        }</p>
                          </td>
                        </tr>`
      )
      .join('');

    const secondaryCta = secondary_url
      ? `
                        <table class="body-action-secondary" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <a href="${escapeHtml(secondary_url)}" class="f-fallback" target="_blank">Compare plans</a>
                            </td>
                          </tr>
                        </table>`
      : '';

    const body = `<h1>Hi ${escapeHtml(name)},</h1>
                        <p>Your <strong>${escapeHtml(plan_name)}</strong> trial ends on <strong>${escapeHtml(trial_end_date)}</strong> \u2014 that's in <strong>${escapeHtml(trial_days_remaining)}</strong> day(s). After that, you'll be charged <strong>${escapeHtml(plan_price)}</strong> unless you cancel.</p>
                        ${attributeTable(
                          attributeRow(
                            `<span class="f-fallback"><strong>Plan:</strong> ${escapeHtml(plan_name)}</span>`
                          ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Trial ends:</strong> ${escapeHtml(trial_end_date)}</span>`
                            ) +
                            attributeRow(
                              `<span class="f-fallback"><strong>Price after trial:</strong> ${escapeHtml(plan_price)}</span>`
                            )
                        )}
                        <p>If you do nothing, your account will continue seamlessly. Here's what you'll keep:</p>
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${benefitItems}
                        </table>
                        ${actionBlock(bulletproofButton(action_url, `Keep My ${plan_name} Plan`, 'green'))}${secondaryCta}
                        <p>If you have any questions about your trial or billing, just reply to this email or reach out to our <a href="${escapeHtml(support_url)}">support team</a>.</p>
                        <p>Cheers,
                          <br>The ${escapeHtml(product_name)} team</p>
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
