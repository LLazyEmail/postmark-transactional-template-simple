import type { HeadingComponent } from './heading.ts';
import type { ImageComponent } from './image.ts';
import type { ImageLinkedComponent } from './imageLinked.ts';
import type { ItalicComponent } from './italic.ts';
import type { LinkComponent } from './link.ts';
import type { ListComponent } from './list.ts';
import type { ListItemComponent } from './listItem.ts';
import type { TitleComponent } from './title.ts';
import type { MainTitleImageComponent } from './mainTitleImage.ts';
import type { ParagraphComponent } from './paragraph.ts';
import type { ParagraphUpdatedComponent } from './paragraphUpdated.ts';
import type { StrongComponent } from './strong.ts';
import type { SubtitleComponent } from './subtitle.ts';
import type { SeparatorComponent } from './separator.ts';
import type { ButtonComponent } from './button.ts';

/** Aggregate map — verified directly against src/components.js. */
export interface TypographyComponents {
  headingComponent: HeadingComponent;
  imageComponent: ImageComponent;
  imageLinkedComponent: ImageLinkedComponent;
  italicComponent: ItalicComponent;
  linkComponent: LinkComponent;
  listComponent: ListComponent;
  listItemComponent: ListItemComponent;
  titleComponent: TitleComponent;
  mainTitleImageComponent: MainTitleImageComponent;
  paragraphComponent: ParagraphComponent;
  paragraphComponentUpdated: ParagraphUpdatedComponent;
  strongComponent: StrongComponent;
  subtitleComponent: SubtitleComponent;
  separatorComponent: SeparatorComponent;
  buttonComponent: ButtonComponent;
  /** TODO: type once atoms/*.js are reviewed. */
  atoms: {
    text: unknown;
    link: unknown;
    image: unknown;
    spacer: unknown;
    divider: unknown;
  };
}
