import type { TypographyComponent } from './typographyComponent.ts';

/**
 * list.js — listComponent → <ul>
 * `content` must already be one or more listItemComponent() outputs
 * concatenated together — this wrapper does no iteration itself.
 */
export interface ListProps {
  content: string;
}
export type ListComponent = TypographyComponent<ListProps>;
