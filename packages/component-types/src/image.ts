import type { TypographyComponent } from './typographyComponent.ts';

/** image.js — imageComponent */
export interface ImageProps {
  src: string;
  altText?: string;
}
export type ImageComponent = TypographyComponent<ImageProps>;
