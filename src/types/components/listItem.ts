import type { TypographyComponent } from './typographyComponent.ts';

/** listItem.js — listItemComponent → <li><p> */
export interface ListItemProps {
  content: string;
}
export type ListItemComponent = TypographyComponent<ListItemProps>;
