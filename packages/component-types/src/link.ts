import type { TypographyComponent } from './typographyComponent.ts';

/** link.js — linkComponent → <a target="_blank"> */
export interface LinkProps {
  href: string;
  content: string;
}
export type LinkComponent = TypographyComponent<LinkProps>;
