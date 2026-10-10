import type { TypographyComponent } from './typographyComponent.ts';

/** strong.js — strongComponent → <strong style="font-weight: bolder;"> */
export interface StrongProps {
  content: string;
}
export type StrongComponent = TypographyComponent<StrongProps>;
