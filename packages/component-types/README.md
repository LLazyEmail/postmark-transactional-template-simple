# @llazyemail/component-types

Typed contracts for shared email components. This package returns strings of markup. It does not render HTML and it does not import the Postmark template repository.

```ts
import type { ButtonProps, TypographyComponents } from '@llazyemail/component-types';
```

Until this package is published, the host repository resolves that name through `tsconfig` paths. After publish, drop the path mapping and install the semver package. Do not point the dependency at a git URL.

## What belongs here

A component is a function from props to `HtmlString`. `HtmlString` is a `string`. It is not a full HTML document. The document contract lives in the host `src/types/template`.

Most components use `TypographyComponent<Props>`. `SeparatorComponent` is the exception: its props are optional.

## Layout

| Path | What it is |
|---|---|
| `src/core/` | `HtmlString` and `TypographyComponent` |
| `src/text/` | heading, title, subtitle, paragraph, strong, italic |
| `src/media/` | image, linked image, main title image |
| `src/interactive/` | button, link, separator |
| `src/list/` | list and list item |
| `src/catalog/` | `COMPONENT_KEYS` and the `TypographyComponents` map |
| `src/index.ts` | The only public entry |
| `docs/adding-a-component.md` | How to add one |
| `docs/catalog.md` | Every current component |

Import from `@llazyemail/component-types`, not from a nested file. Nested files are an implementation detail.

## Extend it

1. Add a props interface and a component type in the matching folder.
2. Add the catalog key to `src/catalog/keys.ts`.
3. Add the field on `TypographyComponents`.
4. Re-export the props and component from `src/index.ts`.
5. Add a row to `docs/catalog.md`.
6. Extend `tests/public-api.test-d.ts`.

The catalog type check fails if `COMPONENT_KEYS` and `TypographyComponents` drift. See `docs/adding-a-component.md`.

## Run it on its own

From this folder, with the host `node_modules` installed:

```bash
npm run typecheck
npm test
```

The host test run also picks up `packages/component-types/tests`.
