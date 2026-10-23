import type { TypographyComponent } from '../core/typographyComponent.ts';

/** button2.js — buttonComponent → <a class="mlContentButton"> */
export interface ButtonProps {
  href: string;
  content: string;
}
export type ButtonComponent = TypographyComponent<ButtonProps>;
