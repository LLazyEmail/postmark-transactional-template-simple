import type { TypographyComponent } from './typographyComponent.ts';

/** subtitle.js — subtitleComponent → <p><span><span><strong> */
export interface SubtitleProps {
  content: string;
}
export type SubtitleComponent = TypographyComponent<SubtitleProps>;
