import type { TypographyComponent } from '../core/typographyComponent.ts';

/** italic.js — italicComponent */
export interface ItalicProps {
  content: string;
}
export type ItalicComponent = TypographyComponent<ItalicProps>;
