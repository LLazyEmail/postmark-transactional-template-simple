/** Markup combinators. Inputs are trusted: pre-escaped payload strings or literal HTML. */
export { escapeHtml, head } from '@llazyemail/template-runtime-display';
export type { HeadProps } from '@llazyemail/template-runtime-display';


export type ButtonVariant = 'green' | 'red';

/** Border-based button used inside a Postmark `.body-action` cell. */
export function bulletproofButton(
  href: string,
  label: string,
  variant?: ButtonVariant
): string {
  const variantClass = variant ? ` button--${variant}` : '';
  return `<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                <tr>
                                  <td align="center">
                                    <a href="${href}" class="f-fallback button${variantClass}" target="_blank">${label}</a>
                                  </td>
                                </tr>
                              </table>`;
}

/** Centered action row. `innerHtml` is one or more `bulletproofButton` results. */
export function actionBlock(innerHtml: string): string {
  return `<table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td align="center">
                              ${innerHtml}
                            </td>
                          </tr>
                        </table>`;
}

export function attributeRow(html: string): string {
  return `<tr>
                                  <td class="attributes_item">${html}</td>
                                </tr>`;
}

export function attributeTable(rowsHtml: string): string {
  return `<table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td class="attributes_content">
                              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                ${rowsHtml}
                              </table>
                            </td>
                          </tr>
                        </table>`;
}

/** Fallback URL under the button. `url` is linked when `asLink` is set. */
export function subCopy(message: string, url: string, asLink = false): string {
  const urlHtml = asLink ? `<a href="${url}">${url}</a>` : url;
  return `<table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">${message}</p>
                              <p class="f-fallback sub">${urlHtml}</p>
                            </td>
                          </tr>
                        </table>`;
}

export interface AttachmentDetail {
  attachment_name: string;
  attachment_url: string;
  attachment_size: string;
  attachment_type: string;
}

/** Attribute table of file links. Omitted when there are no attachments. */
export function attachmentTable(items: readonly AttachmentDetail[] | undefined): string {
  if (!items || items.length === 0) return '';
  const rows = items
    .map((item) =>
      attributeRow(
        `<a href="${item.attachment_url}">${item.attachment_name}</a> <span>(${item.attachment_size} ${item.attachment_type})</span>`
      )
    )
    .join('');
  return attributeTable(rows);
}
