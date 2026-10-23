import type { TypographyComponent } from '../core/typographyComponent.ts';

/** subtitle.js — subtitleComponent → <p><span><span><strong> */
export interface SubtitleProps {
  content: string;
}
export type SubtitleComponent = TypographyComponent<SubtitleProps>;
