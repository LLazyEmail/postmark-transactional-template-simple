import type { TypographyComponent } from './typographyComponent.ts';

/** heading.js — headingComponent → <h3 class="mc-toc-title"> */
export interface HeadingProps {
  content: string;
}
export type HeadingComponent = TypographyComponent<HeadingProps>;
