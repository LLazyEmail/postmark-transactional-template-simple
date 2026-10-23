import type { TypographyComponent } from '../core/typographyComponent.ts';

/** imageLinked.js — imageLinkedComponent */
export interface ImageLinkedProps {
  src: string;
  altText?: string;
}
export type ImageLinkedComponent = TypographyComponent<ImageLinkedProps>;
