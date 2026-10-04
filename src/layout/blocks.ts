import { escapeHtml } from './display.ts';

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
                                    <a href="${escapeHtml(href)}" class="f-fallback button${variantClass}" target="_blank">${escapeHtml(label)}</a>
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
  const urlHtml = asLink
    ? `<a href="${escapeHtml(url)}">${escapeHtml(url)}</a>`
    : escapeHtml(url);
  return `<table class="body-sub" role="presentation">
                          <tr>
                            <td>
                              <p class="f-fallback sub">${escapeHtml(message)}</p>
                              <p class="f-fallback sub">${urlHtml}</p>
                            </td>
                          </tr>
                        </table>`;
}
