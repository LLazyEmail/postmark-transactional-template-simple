import type { TypographyComponent } from './typographyComponent.ts';

/** paragraph.js — paragraphComponent → plain text/HTML paragraph, no image */
export interface ParagraphProps {
  content: string;
}
export type ParagraphComponent = TypographyComponent<ParagraphProps>;
