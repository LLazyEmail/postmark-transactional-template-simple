import type { TypographyComponent } from './typographyComponent.ts';

/** mainTitleImage.js — mainTitleImageComponent. Same shape as ImageComponent. */
export interface MainTitleImageProps {
  src: string;
  altText?: string;
}
export type MainTitleImageComponent = TypographyComponent<MainTitleImageProps>;
