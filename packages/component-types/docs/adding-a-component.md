# Adding a component

A component is one props interface, one function type, and one catalog key. Do not add a renderer here. This package only describes the contract.

## 1. Pick a folder

| Kind | Folder |
|---|---|
| Text block | `src/text/` |
| Image | `src/media/` |
| Click or divider | `src/interactive/` |
| List | `src/list/` |
| Shared primitive | `src/core/` |

Create `src/<folder>/<name>.ts`:

```ts
import type { TypographyComponent } from '../core/typographyComponent.ts';

/** quote.js — quoteComponent → <blockquote> */
export interface QuoteProps {
  content: string;
}
export type QuoteComponent = TypographyComponent<QuoteProps>;
```

Use `TypographyComponent` unless the props are optional. Optional props, like `SeparatorProps`, get their own function type.

## 2. Register it

Add the key to `COMPONENT_KEYS` in `src/catalog/keys.ts`:

```ts
'quoteComponent',
```

Add the field on `TypographyComponents` in `src/catalog/typographyComponents.ts`:

```ts
quoteComponent: QuoteComponent;
```

The file already checks that those two lists match. A missing key fails typecheck.

## 3. Export it

Add the re-export to `src/index.ts`:

```ts
export type { QuoteProps, QuoteComponent } from './text/quote.ts';
```

Do not add a second public entry. Consumers import from `@llazyemail/component-types`.

## 4. Document and test

Add a row to `docs/catalog.md`. Add the props shape to `tests/public-api.test-d.ts`.

## Rules

- Do not import from the host repository, `src/layout`, or another `@llazyemail` package.
- Keep relative imports inside this package, and keep the `.ts` suffix.
- `content` is already markup or text. Do not type it as a child array unless the component iterates.
- `listComponent` does not iterate. Callers concatenate `listItemComponent` output into `content`.
