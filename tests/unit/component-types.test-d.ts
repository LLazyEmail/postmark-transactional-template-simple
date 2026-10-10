import { describe, expectTypeOf, it } from 'vitest';
import type { ButtonProps, TypographyComponent } from '@llazyemail/component-types';

describe('component-types package entry', () => {
  it('imports component props from the future package name', () => {
    expectTypeOf<ButtonProps>().toEqualTypeOf<{ href: string; content: string }>();
    expectTypeOf<TypographyComponent<ButtonProps>>().toBeFunction();
  });
});
