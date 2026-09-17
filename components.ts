/**
 * Typed prop contracts for the typography components actually exported by
 * `src/components.js` (verified against that file directly — this is the
 * real public API surface, confirmed, not inferred).
 *
 * These are typed AS-IS — they mirror current runtime behavior exactly,
 * not a proposed redesign. Inconsistencies between components are
 * preserved and called out rather than silently "fixed", so this file
 * stays a safe, non-breaking addition. Fix the component first if you
 * want the type to change.
 */

export type HtmlString = string;
export type TypographyComponent<Props> = (props: Props) => HtmlString;

// ---------------------------------------------------------------------------
// heading.js — headingComponent  →  <h3 class="mc-toc-title">
// ---------------------------------------------------------------------------
export interface HeadingProps {
  content: string;
}
export type HeadingComponent = TypographyComponent<HeadingProps>;

// ---------------------------------------------------------------------------
// mainTitle.js — titleComponent  →  <h1 class="mc-toc-title">
// ---------------------------------------------------------------------------
export interface TitleProps {
  content: string;
}
export type TitleComponent = TypographyComponent<TitleProps>;

// ---------------------------------------------------------------------------
// subtitle.js — subtitleComponent  →  <p><span><span><strong>
// ---------------------------------------------------------------------------
export interface SubtitleProps {
  content: string;
}
export type SubtitleComponent = TypographyComponent<SubtitleProps>;

// ---------------------------------------------------------------------------
// paragraph.js — paragraphComponent  →  plain text/HTML paragraph, no image
// ---------------------------------------------------------------------------
export interface ParagraphProps {
  content: string;
}
export type ParagraphComponent = TypographyComponent<ParagraphProps>;

// ---------------------------------------------------------------------------
// strong.js — strongComponent  →  <strong style="font-weight: bolder;">
// ---------------------------------------------------------------------------
export interface StrongProps {
  content: string;
}
export type StrongComponent = TypographyComponent<StrongProps>;

// ---------------------------------------------------------------------------
// italic.js — italicComponent  →  <i>
// ---------------------------------------------------------------------------
export interface ItalicProps {
  content: string;
}
export type ItalicComponent = TypographyComponent<ItalicProps>;

// ---------------------------------------------------------------------------
// link.js — linkComponent  →  <a target="_blank">
// ---------------------------------------------------------------------------
export interface LinkProps {
  href: string;
  content: string;
}
export type LinkComponent = TypographyComponent<LinkProps>;

// ---------------------------------------------------------------------------
// list.js — listComponent  →  <ul>
// `content` must already be one or more listItemComponent() outputs
// concatenated together — this wrapper does no iteration itself.
// ---------------------------------------------------------------------------
export interface ListProps {
  content: string;
}
export type ListComponent = TypographyComponent<ListProps>;

// ---------------------------------------------------------------------------
// listItem.js — listItemComponent  →  <li><p>
// ---------------------------------------------------------------------------
export interface ListItemProps {
  content: string;
}
export type ListItemComponent = TypographyComponent<ListItemProps>;

// ---------------------------------------------------------------------------
// separator.js — separatorComponent
// ---------------------------------------------------------------------------
export interface SeparatorProps {
  src?: string;
  altText?: string;
}
export type SeparatorComponent = (props?: SeparatorProps) => HtmlString;

// ---------------------------------------------------------------------------
// button2.js — buttonComponent  →  <a class="mlContentButton">
// ---------------------------------------------------------------------------
export interface ButtonProps {
  href: string;
  content: string;
}
export type ButtonComponent = TypographyComponent<ButtonProps>;

// ---------------------------------------------------------------------------
// image.js — imageComponent  &  imageLinked.js — imageLinkedComponent
// ---------------------------------------------------------------------------
export interface ImageProps {
  src: string;
  altText?: string;
}
export type ImageComponent = TypographyComponent<ImageProps>;

export interface ImageLinkedProps {
  src: string;
  altText?: string;
}
export type ImageLinkedComponent = TypographyComponent<ImageLinkedProps>;

// ---------------------------------------------------------------------------
// mainTitleImage.js — mainTitleImageComponent
// Same shape as ImageComponent (src + optional altText).
// ---------------------------------------------------------------------------
export interface MainTitleImageProps {
  src: string;
  altText?: string;
}
export type MainTitleImageComponent = TypographyComponent<MainTitleImageProps>;

// ---------------------------------------------------------------------------
// paragraphComponentUpdated.js — paragraphComponentUpdated
// Paragraph plus an image (uses IMAGE_STYLE from helpers).
// ---------------------------------------------------------------------------
export interface ParagraphUpdatedProps {
  content: string;
  src: string;
  altText?: string;
}
export type ParagraphUpdatedComponent = TypographyComponent<ParagraphUpdatedProps>;

// ---------------------------------------------------------------------------
// Aggregate map — verified directly against src/components.js.
// ---------------------------------------------------------------------------
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
