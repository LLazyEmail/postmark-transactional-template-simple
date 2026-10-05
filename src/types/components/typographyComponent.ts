import type { HtmlString } from './htmlString.ts';

export type TypographyComponent<Props> = (props: Props) => HtmlString;
