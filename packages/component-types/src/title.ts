import type { TypographyComponent } from './typographyComponent.ts';

/** mainTitle.js — titleComponent → <h1 class="mc-toc-title"> */
export interface TitleProps {
  content: string;
}
export type TitleComponent = TypographyComponent<TitleProps>;
