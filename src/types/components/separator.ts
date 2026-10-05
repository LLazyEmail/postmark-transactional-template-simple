import type { HtmlString } from './htmlString.ts';

/** separator.js — separatorComponent */
export interface SeparatorProps {
  src?: string;
  altText?: string;
}
export type SeparatorComponent = (props?: SeparatorProps) => HtmlString;
