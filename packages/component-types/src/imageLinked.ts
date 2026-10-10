import type { TypographyComponent } from './typographyComponent.ts';

/** imageLinked.js — imageLinkedComponent */
export interface ImageLinkedProps {
  src: string;
  altText?: string;
}
export type ImageLinkedComponent = TypographyComponent<ImageLinkedProps>;
