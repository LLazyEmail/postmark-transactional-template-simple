export type { PasswordResetEmailProps } from './types.ts';
import type { PasswordResetEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import { actionBlock, bulletproofButton, subCopy } from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineEmail } from '../defineEmail.ts';
import { passwordResetData } from '../../data/password-reset.ts';
import type { FieldCheck } from '@llazyemail/validator';

/** Legacy kebab-case id. Kept as an alias so `renderTemplate('password-reset')` and the CLI keep resolving. */
export const TEMPLATE_ID = 'password-reset' as const;

const checks: FieldCheck[] = [
  { field: 'name', errorMessage: 'Recipient name is required' },
  { field: 'preheader', errorMessage: 'Preheader is required' },
  { field: 'action_url', errorMessage: 'Action URL is required', rules: ['required', 'url'] },
  { field: 'operating_system', errorMessage: 'Operating system is required' },
  { field: 'browser_name', errorMessage: 'Browser name is required' },
  { field: 'support_url', errorMessage: 'Support URL is required', rules: ['required', 'url'] },
  { field: 'product_name', errorMessage: 'Product name is required' },
  { field: 'company_name', errorMessage: 'Company name is required' },
  { field: 'company_address', errorMessage: 'Company address is required' },
  { field: 'company_url', errorMessage: 'Company URL is required', rules: ['required', 'url'] },
];

/**
 * PasswordResetEmail
 * ------------------
 * Port of `reference/password-reset`. Mustache fields and the hardcoded
 * product/company lines are props. The shared Postmark document supplies
 * the stylesheet, masthead, and footer.
 */
export const passwordReset = defineEmail<PasswordResetEmailProps>({
  id: 'PasswordResetEmail',
  aliases: [TEMPLATE_ID],
  name: 'PasswordResetEmail',
  file: 'password-reset/passwordResetEmail.ts',
  exportName: 'passwordReset',
  checks,
  data: passwordResetData,

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
