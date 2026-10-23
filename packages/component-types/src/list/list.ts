import type { TypographyComponent } from '../core/typographyComponent.ts';

/**
 * list.js — listComponent → <ul>
 * `content` must already be one or more listItemComponent() outputs
 * concatenated together. This wrapper does no iteration.
 */
export interface ListProps {
  content: string;
}
export type ListComponent = TypographyComponent<ListProps>;
