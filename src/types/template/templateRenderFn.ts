import type { HtmlString } from './htmlString.ts';

/**
 * The function shape legacy `.definition.js` files used.
 * Preserved so the conversion is non-breaking.
 */
export type TemplateRenderFn<Props> = (props: Props) => HtmlString;
