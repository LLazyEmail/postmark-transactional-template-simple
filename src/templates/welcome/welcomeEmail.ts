import type { WelcomeEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import { actionBlock, bulletproofButton, subCopy } from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineEmail } from '../defineEmail.ts';
import { welcomeData } from '../../data/welcome.ts';
import type { FieldCheck } from '@llazyemail/validator';

export type { WelcomeEmailProps } from './types.ts';

const checks: FieldCheck[] = [
  { field: 'userName', errorMessage: 'User name is required' },
  { field: 'signupDate', errorMessage: 'Signup date is required' },
];

/**
 * WelcomeEmail
 * ------------
 * Original minimal version preserved. All new fields are optional, so
 * callers that pass only `{ userName, signupDate }` still get the same
 * simple output.
 *
 * When `action_url` is supplied, the shared Postmark document is used.
 */
export const WelcomeEmail = defineEmail<WelcomeEmailProps>({
  id: 'WelcomeEmail',
  aliases: ['welcome'],
  name: 'WelcomeEmail',
  file: 'welcome/welcomeEmail.ts',
  exportName: 'WelcomeEmail',
  checks,
  data: welcomeData,

  render: ({
    userName,
    signupDate,
    preheader,
    action_url,
    action_label,
    support_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    if (!action_url) {
      return `
    <html>
      <body>
        <h1>Welcome, ${userName}!</h1>
        <p>Thanks for signing up on ${signupDate.toDateString()}.</p>
      </body>
    </html>
  `;
    }

    const product = product_name ?? '';
    const support = support_url
      ? `<p>If you have any questions, reach out to our <a href="${escapeHtml(support_url)}">support team</a>.</p>`
      : '';
    const body = `<h1>Welcome, ${escapeHtml(userName)}!</h1>
                        <p>Thanks for signing up on ${escapeHtml(signupDate.toDateString())}.</p>
                        ${support}
                        ${actionBlock(
                          bulletproofButton(action_url, action_label ?? 'Get Started', 'green')
                        )}
                        <p>Cheers,
                          <br>The ${escapeHtml(product)} team</p>
                        ${subCopy(
                          "If you're having trouble with the button above, copy and paste the URL below into your web browser.",
                          action_url
                        )}`;

    return renderPostmarkDocument({
      preheader: preheader ?? `Welcome to ${product || 'us'}, ${userName}!`,
      product_name: product,
      company_name: company_name ?? '',
      company_address: company_address ?? '',
      company_suite: company_suite ?? '',
      company_url: company_url ?? '',
      body,
    });
  },
});
