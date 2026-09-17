import type { ITemplate } from '../types/template';
import type { TrialExpiringEmailProps } from '../types/trialExpiring';

/**
 * TrialExpiringEmail
 * ------------------
 * Typed port of the "trial expiring" transactional template.
 *
 * Emits the same inline-styled, table-based HTML as the Postmark
 * reference layout so it renders consistently across email clients.
 *
 * Usage:
 *   import { TrialExpiringEmail } from './templates/trialExpiringEmail';
 *   const html = TrialExpiringEmail.render({ ...props });
 */
export const TrialExpiringEmail: ITemplate<TrialExpiringEmailProps> = {
  name: 'TrialExpiringEmail',

  render: ({
    name,
    preheader,
    trial_end_date,
    trial_days_remaining,
    plan_name,
    plan_price,
    action_url,
    secondary_url,
    support_url,
    benefits,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    // -----------------------------------------------------------------------
    // Render the benefits list from the typed array.
    // -----------------------------------------------------------------------
    const benefitItems = benefits
      .map(
        ({ title, description }) => `
                        <tr>
                          <td class="benefit_item">
                            <p class="f-fallback benefit_title"><strong>${title}</strong>${
          description
            ? ` — <span class="benefit_description">${description}</span>`
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
                              <a href="${secondary_url}" class="f-fallback" target="_blank">Compare plans</a>
                            </td>
                          </tr>
                        </table>`
      : '';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
    @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
    body { width: 100% !important; height: 100%; margin: 0; -webkit-text-size-adjust: none; }
    a { color: #3869D4; }
    a img { border: none; }
    td { word-break: break-word; }
    .preheader { display: none !important; visibility: hidden; mso-hide: all; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; }
    body, td, th { font-family: "Nunito Sans", Helvetica, Arial, sans-serif; }
    h1 { margin-top: 0; color: #333333; font-size: 22px; font-weight: bold; text-align: left; }
    h2 { margin-top: 0; color: #333333; font-size: 16px; font-weight: bold; text-align: left; }
    h3 { margin-top: 0; color: #333333; font-size: 14px; font-weight: bold; text-align: left; }
    td, th { font-size: 16px; }
    p, ul, ol, blockquote { margin: .4em 0 1.1875em; font-size: 16px; line-height: 1.625; }
    p.sub { font-size: 13px; }
    .align-right { text-align: right; }
    .align-left { text-align: left; }
    .align-center { text-align: center; }
    .button { background-color: #3869D4; border-top: 10px solid #3869D4; border-right: 18px solid #3869D4; border-bottom: 10px solid #3869D4; border-left: 18px solid #3869D4; display: inline-block; color: #FFF; text-decoration: none; border-radius: 3px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); -webkit-text-size-adjust: none; box-sizing: border-box; }
    .button--green { background-color: #22BC66; border-top: 10px solid #22BC66; border-right: 18px solid #22BC66; border-bottom: 10px solid #22BC66; border-left: 18px solid #22BC66; }
    .button--red { background-color: #FF6136; border-top: 10px solid #FF6136; border-right: 18px solid #FF6136; border-bottom: 10px solid #FF6136; border-left: 18px solid #FF6136; }
    @media only screen and (max-width: 500px) { .button { width: 100% !important; text-align: center !important; } }
    .attributes { margin: 0 0 21px; }
    .attributes_content { background-color: #F4F4F7; padding: 16px; }
    .attributes_item { padding: 0; }
    .benefit_item { padding: 4px 0; color: #51545E; font-size: 15px; line-height: 20px; }
    .benefit_title { margin: 0; }
    .benefit_description { color: #6B6E76; }
    body { background-color: #F2F4F6; color: #51545E; }
    p { color: #51545E; }
    .email-wrapper { width: 100%; margin: 0; padding: 0; background-color: #F2F4F6; }
    .email-content { width: 100%; margin: 0; padding: 0; }
    .email-masthead { padding: 25px 0; text-align: center; }
    .email-masthead_name { font-size: 16px; font-weight: bold; color: #A8AAAF; text-decoration: none; text-shadow: 0 1px 0 white; }
    .email-body { width: 100%; margin: 0; padding: 0; }
    .email-body_inner { width: 570px; margin: 0 auto; padding: 0; background-color: #FFFFFF; }
    .email-footer { width: 570px; margin: 0 auto; padding: 0; text-align: center; }
    .email-footer p { color: #A8AAAF; }
    .body-action, .body-action-secondary { width: 100%; margin: 30px auto; padding: 0; text-align: center; }
    .body-action-secondary a { font-size: 14px; color: #3869D4; text-decoration: underline; }
    .body-sub { margin-top: 25px; padding-top: 25px; border-top: 1px solid #EAEAEC; }
    .content-cell { padding: 45px; }
    @media only screen and (max-width: 600px) { .email-body_inner, .email-footer { width: 100% !important; } }
    @media (prefers-color-scheme: dark) {
      body, .email-body, .email-body_inner, .email-content, .email-wrapper, .email-masthead, .email-footer { background-color: #333333 !important; color: #FFF !important; }
      p, ul, ol, blockquote, h1, h2, h3, span, .benefit_item { color: #FFF !important; }
      .attributes_content { background-color: #222 !important; }
      .email-masthead_name { text-shadow: none !important; }
    }
    :root { color-scheme: light dark; supported-color-schemes: light dark; }
    </style>
    <!--[if mso]>
    <style type="text/css">.f-fallback { font-family: Arial, sans-serif; }</style>
    <![endif]-->
  </head>
  <body>
    <span class="preheader">${preheader}</span>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">
          <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="email-masthead">
                <a href="${company_url}" class="f-fallback email-masthead_name">${product_name}</a>
              </td>
            </tr>
            <tr>
              <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell">
                      <div class="f-fallback">
                        <h1>Hi ${name},</h1>
                        <p>Your <strong>${plan_name}</strong> trial ends on <strong>${trial_end_date}</strong> — that's in <strong>${trial_days_remaining}</strong> day(s). After that, you'll be charged <strong>${plan_price}</strong> unless you cancel.</p>

                        <table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="attributes_content">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                  <td class="attributes_item">
                                    <span class="f-fallback"><strong>Plan:</strong> ${plan_name}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="attributes_item">
                                    <span class="f-fallback"><strong>Trial ends:</strong> ${trial_end_date}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="attributes_item">
                                    <span class="f-fallback"><strong>Price after trial:</strong> ${plan_price}</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <p>If you do nothing, your account will continue seamlessly. Here's what you'll keep:</p>

                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${benefitItems}
                        </table>

                        <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${action_url}" class="f-fallback button button--green" target="_blank">Keep My ${plan_name} Plan</a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>${secondaryCta}

                        <p>If you have any questions about your trial or billing, just reply to this email or reach out to our <a href="${support_url}">support team</a>.</p>
                        <p>Cheers,
                          <br>The ${product_name} team</p>

                        <table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">If you're having trouble with the button above, copy and paste the URL below into your web browser.</p>
                              <p class="f-fallback sub">${action_url}</p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td class="content-cell" align="center">
                      <p class="f-fallback sub align-center">
                        ${company_name}
                        <br>${company_address}
                        <br>${company_suite}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
  },
};