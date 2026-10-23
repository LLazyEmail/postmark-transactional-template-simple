import type { TypographyComponent } from '../core/typographyComponent.ts';

/** paragraphComponentUpdated.js — paragraph plus an image. */
export interface ParagraphUpdatedProps {
  content: string;
  src: string;
  altText?: string;
}
export type ParagraphUpdatedComponent = TypographyComponent<ParagraphUpdatedProps>;
