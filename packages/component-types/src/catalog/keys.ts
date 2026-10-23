/**
 * Catalog keys for TypographyComponents, excluding the untyped `atoms` bag.
 * Add a key here when adding a component. The type test fails if this list
 * and the interface drift apart.
 */
export const COMPONENT_KEYS = [
  'headingComponent',
  'imageComponent',
  'imageLinkedComponent',
  'italicComponent',
  'linkComponent',
  'listComponent',
  'listItemComponent',
  'titleComponent',
  'mainTitleImageComponent',
  'paragraphComponent',
  'paragraphComponentUpdated',
  'strongComponent',
  'subtitleComponent',
  'separatorComponent',
  'buttonComponent',
] as const;

export type ComponentKey = (typeof COMPONENT_KEYS)[number];
