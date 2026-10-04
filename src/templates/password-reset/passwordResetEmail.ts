export type { PasswordResetEmailProps } from './types.ts';
import type { PasswordResetEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import { actionBlock, bulletproofButton, subCopy } from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineTemplate } from '../defineTemplate.ts';

/** Stable registry id. Legacy callers and `renderTemplate('password-reset')` use this. */
export const TEMPLATE_ID = 'password-reset' as const;

/**
 * PasswordResetEmail
 * ------------------
 * Port of `reference/password-reset`. Mustache fields and the hardcoded
 * product/company lines are props. The shared Postmark document supplies
 * the stylesheet, masthead, and footer.
 */
export const passwordReset = defineTemplate<PasswordResetEmailProps>({
  id: TEMPLATE_ID,
  name: 'PasswordResetEmail',
  file: 'password-reset/passwordResetEmail.ts',
  exportName: 'passwordReset',
  sample: {
    name: 'Jordan',
    preheader: 'Use this link to reset your password.',
    action_url: 'https://example.com/reset?token=fixture-token-123',
    operating_system: 'macOS',
    browser_name: 'Chrome',
    support_url: 'https://example.com/support',
    product_name: '[Product Name]',
    company_name: 'Acme Inc.',
    company_address: '1234 Street Rd.',
    company_suite: 'Suite 1234',
    company_url: 'https://example.com',
  },

  render: ({
    name,
    preheader,
    action_url,
    operating_system,
    browser_name,
    support_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const body = `<h1>Hi ${escapeHtml(name)},</h1>
                        <p>You recently requested to reset your password for your ${escapeHtml(product_name)} account. Use the button below to reset it. <strong>This password reset is only valid for the next 24 hours.</strong></p>
                        ${actionBlock(bulletproofButton(action_url, 'Reset your password', 'green'))}
                        <p>For security, this request was received from a ${escapeHtml(operating_system)} device using ${escapeHtml(browser_name)}. If you did not request a password reset, please ignore this email or <a href="${escapeHtml(support_url)}">contact support</a> if you have questions.</p>
                        <p>Thanks,
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
