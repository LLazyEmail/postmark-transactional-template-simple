import type { TypographyComponent } from '../core/typographyComponent.ts';

/** listItem.js — listItemComponent → <li><p> */
export interface ListItemProps {
  content: string;
}
export type ListItemComponent = TypographyComponent<ListItemProps>;
