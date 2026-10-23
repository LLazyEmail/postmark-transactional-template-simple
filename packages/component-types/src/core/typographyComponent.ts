import type { HtmlString } from './htmlString.ts';

/**
 * A component is a pure function from props to markup.
 * New components should use this alias unless their props are optional.
 */
export type TypographyComponent<Props> = (props: Props) => HtmlString;
