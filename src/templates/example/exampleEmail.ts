export type { ExampleEmailProps } from './types.ts';
import type { ExampleEmailProps } from './types.ts';
import { renderPostmarkDocument } from '../../layout/postmarkDocument.ts';
import {
  actionBlock,
  attributeRow,
  attributeTable,
  bulletproofButton,
  subCopy,
} from '../../layout/blocks.ts';
import { escapeHtml } from '../../layout/html.ts';
import { defineTemplate } from '../defineTemplate.ts';

/**
 * ExampleEmail
 * ------------
 * Port of `reference/example`, the Postmark kitchen-sink template.
 * Static sections (headings, lists, formatting, the discount headline)
 * are copied from that file. `{{mustache}}` fields, button hrefs, and
 * brand placeholders are props. The escaped-mustache line is literal
 * text, matching the reference.
 */
export const ExampleEmail = defineTemplate<ExampleEmailProps>({
  id: 'example',
  name: 'ExampleEmail',
  file: 'example/exampleEmail.ts',
  exportName: 'ExampleEmail',

  render: ({
    preheader,
    sender_name,
    login_url,
    username,
    trial_extension_url,
    feedback_url,
    expiration_date,
    action_url,
    danger_url,
    success_url,
    default_url,
    discount_url,
    product_name,
    company_name,
    company_address,
    company_suite,
    company_url,
  }) => {
    const product = escapeHtml(product_name);
    const body = `<hr />
                        <h1>Escaped Handlebars Brackets</h1>
                        <p>Working with templates, you'll occasionally need to put some <a href="https://github.com/activecampaign/mustachio">Mustachio</a> code in your Handlebars templates. To prevent the Handlebars processing from attempting to process your Mustachio code, you'll need to escape the curly braces by adding a backslash just before the opening curly braces.</p>
                        \\{{ something }} will turn into {{ something }}
                        <br />
                        <br />
                        <hr />
                        <h1>Headers</h1>
                        <h1>Header 1</h1>
                        <h2>Header 2</h2>
                        <h3>Header 3</h3>
                        <hr />
                        <h1>Paragraphs &amp; Formatting</h1>
                        <p>Transactional email is fun for the whole family! You can design it, write it, code it, and test it. And test it. And test it. And send it. And find a bug.</p>
                        <p>This paragraph has some <b>bold text</b> and <strong>strong text</strong> along with <i>italicized text</i> and <em>emphasized text</em>.</p>
                        <hr />
                        <h1>Lists</h1>
                        <ul>
                          <li>Unordered list item 1</li>
                          <li>Unordered list item 2</li>
                          <li>Unordered list item 3</li>
                        </ul>
                        <ol>
                          <li>Ordered list item 1</li>
                          <li>Ordered list item 2</li>
                          <li>Ordered list item 3</li>
                        </ol>
                        <hr />
                        <h1>Action Buttons</h1>
                        ${actionBlock(
                          `${bulletproofButton(danger_url, 'Danger Button', 'red')}
                              <br />
                              ${bulletproofButton(success_url, 'Success button', 'green')}
                              <br />
                              ${bulletproofButton(default_url, 'Default button')}`
                        )}
                        <hr />
                        <h1>Attribute List</h1>
                        <p>If your email client baseline is sufficiently modern, you can achieve the same effects with list much more succinctly. We chose to use tables for these lists to accommodate Outlook 2007, 2010, and 2013.</p>
                        ${attributeTable(
                          attributeRow(`<strong>Login Page:</strong> ${escapeHtml(login_url)}`) +
                            attributeRow(`<strong>Username:</strong> ${escapeHtml(username)}`)
                        )}
                        <hr />
                        <h1>Option List</h1>
                        <p>For the most part, option lists are just like attribute lists. They just use line breaks to create some separation between the items.</p>
                        ${attributeTable(
                          attributeRow(
                            `<strong><a href="${escapeHtml(trial_extension_url)}">Restart your trial</a></strong> - If you didn't get a chance to fully try out the product or need a little more time to evaluate, just let us know. Simply reply to this email and we'll extend your trial period.
                                    <br />
                                    <br />`
                          ) +
                            attributeRow(
                              `<strong><a href="${escapeHtml(feedback_url)}">Share feedback</a></strong> - If ${product} isn't right for you, let us know what you were looking for and we might be able to suggest some alternatives that might be a better fit.`
                            )
                        )}
                        <hr />
                        <h1>Example Closing</h1>
                        <p>Thanks,
                          <br>${escapeHtml(sender_name)} and the ${product} team</p>
                        <p><strong>P.S.</strong> Need help getting started? Check out our help documentation. Or, just reply to this email with any questions or issues you have. The ${product} support team is always excited to help you.</p>
                        <hr />
                        <h1>Discount Code</h1>
                        <table class="discount" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              <h1 class="f-fallback discount_heading">10% off your next purchase!</h1>
                              <p class="f-fallback discount_body">Thanks for your support! Here's a coupon for 10% off your next purchase if used by ${escapeHtml(expiration_date)}.</p>
                              ${bulletproofButton(discount_url, 'Use this discount now...', 'green')}
                            </td>
                          </tr>
                        </table>
                        <hr />
                        <h1>Related Items</h1>
                        <hr />
                        <h1>Sub-text</h1>
                        <p>Sub-text is for any content that needs to be included at the bottom of the email but doesn't need to stand out. This can be good for disclaimers and text alternatives.</p>
                        ${subCopy(
                          "If you're having trouble clicking the confirm account button, copy and paste the URL below into your web browser.",
                          action_url,
                          true
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
