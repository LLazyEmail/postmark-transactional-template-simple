import { describe, expectTypeOf, it } from 'vitest';
import type {
  ButtonProps,
  ComponentKey,
  HeadingProps,
  HtmlString,
  ImageProps,
  LinkProps,
  ListProps,
  ParagraphUpdatedProps,
  SeparatorComponent,
  SeparatorProps,
  TypographyComponent,
  TypographyComponents,
} from '../src/index.ts';

describe('public API', () => {
  it('keeps HtmlString as a string, not a document', () => {
    expectTypeOf<HtmlString>().toEqualTypeOf<string>();
  });

  it('types a component as props to markup', () => {
    expectTypeOf<TypographyComponent<ButtonProps>>().toEqualTypeOf<
      (props: ButtonProps) => HtmlString
    >();
  });

  it('keeps the known prop shapes', () => {
    expectTypeOf<ButtonProps>().toEqualTypeOf<{ href: string; content: string }>();
    expectTypeOf<LinkProps>().toEqualTypeOf<{ href: string; content: string }>();
    expectTypeOf<HeadingProps>().toEqualTypeOf<{ content: string }>();
    expectTypeOf<ListProps>().toEqualTypeOf<{ content: string }>();
    expectTypeOf<ImageProps>().toEqualTypeOf<{ src: string; altText?: string }>();
    expectTypeOf<ParagraphUpdatedProps>().toEqualTypeOf<{
      content: string;
      src: string;
      altText?: string;
    }>();
    expectTypeOf<SeparatorProps>().toEqualTypeOf<{ src?: string; altText?: string }>();
  });

  it('lets separator be called without props', () => {
    expectTypeOf<SeparatorComponent>().toBeCallableWith();
    expectTypeOf<SeparatorComponent>().toBeCallableWith({});
  });

  it('exposes every catalog key on the component map', () => {
    expectTypeOf<ComponentKey>().toMatchTypeOf<keyof TypographyComponents>();
  });
});
