import type { ITemplate } from '../types/template';
import type { WelcomeEmailProps } from '../types/welcome';

export type { WelcomeEmailProps } from '../types/welcome';

/**
 * WelcomeEmail
 * ------------
 * Original minimal version preserved. All new fields are optional, so
 * callers that pass only `{ userName, signupDate }` still get the same
 * simple output.
 *
 * When `action_url` is supplied, the richer Postmark-style shell is
 * rendered; otherwise the compact original body is used.
 */
export const WelcomeEmail: ITemplate<WelcomeEmailProps> = {
  name: 'WelcomeEmail',

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
    // -----------------------------------------------------------------------
    // Backwards-compatible path: no action_url → keep the original output.
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // Rich path: Postmark-style shell with preheader, CTA, footer.
    // -----------------------------------------------------------------------
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
    p, ul, ol, blockquote { margin: .4em 0 1.1875em; font-size: 16px; line-height: 1