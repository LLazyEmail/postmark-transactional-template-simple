import type { ButtonComponent } from '../interactive/button.ts';
import type { LinkComponent } from '../interactive/link.ts';
import type { SeparatorComponent } from '../interactive/separator.ts';
import type { ListComponent } from '../list/list.ts';
import type { ListItemComponent } from '../list/listItem.ts';
import type { ImageComponent } from '../media/image.ts';
import type { ImageLinkedComponent } from '../media/imageLinked.ts';
import type { MainTitleImageComponent } from '../media/mainTitleImage.ts';
import type { HeadingComponent } from '../text/heading.ts';
import type { ItalicComponent } from '../text/italic.ts';
import type { ParagraphComponent } from '../text/paragraph.ts';
import type { ParagraphUpdatedComponent } from '../text/paragraphUpdated.ts';
import type { StrongComponent } from '../text/strong.ts';
import type { SubtitleComponent } from '../text/subtitle.ts';
import type { TitleComponent } from '../text/title.ts';
import type { ComponentKey } from './keys.ts';

/**
 * The component map a renderer implements.
 * Keys match COMPONENT_KEYS. `atoms` stays untyped until those helpers are reviewed.
 */
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
  atoms: {
    text: unknown;
    link: unknown;
    image: unknown;
    spacer: unknown;
    divider: unknown;
  };
}

type CatalogKeys = Exclude<keyof TypographyComponents, 'atoms'>;
type MissingFromInterface = Exclude<ComponentKey, CatalogKeys>;
type MissingFromKeys = Exclude<CatalogKeys, ComponentKey>;
type CatalogMatches = MissingFromInterface | MissingFromKeys extends never ? true : false;

const catalogMatches: CatalogMatches = true;
void catalogMatches;
