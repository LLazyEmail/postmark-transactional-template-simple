import type { HtmlString } from '../core/htmlString.ts';

/**
 * separator.js — separatorComponent.
 * Props are optional. Do not force this through TypographyComponent.
 */
export interface SeparatorProps {
  src?: string;
  altText?: string;
}
export type SeparatorComponent = (props?: SeparatorProps) => HtmlString;
