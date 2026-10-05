import type { TypographyComponent } from './typographyComponent.ts';

/** italic.js — italicComponent → <i> */
export interface ItalicProps {
  content: string;
}
export type ItalicComponent = TypographyComponent<ItalicProps>;
