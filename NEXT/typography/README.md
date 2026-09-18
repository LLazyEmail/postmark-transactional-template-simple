# inner-component-stubs

Name-only TypeScript stub implementations of 15 inner-content components.
Instead of returning real HTML, every function here returns a string
containing its own name — e.g. `button()` returns `"button"`. Useful for
proving out imports/wiring/structure before the real rendering logic is
written.

## Components

| File | Function | Returns |
|------|----------|---------|
| `button.ts` | `button()` | `"button"` |
| `heading.ts` | `heading()` | `"heading"` |
| `image.ts` | `image()` | `"image"` |
| `imageLink.ts` | `imageLink()` | `"imageLink"` |
| `italic.ts` | `italic()` | `"italic"` |
| `link.ts` | `link()` | `"link"` |
| `list.ts` | `list()` | `"list"` |
| `listItem.ts` | `listItem()` | `"listItem"` |
| `mainTitle.ts` | `mainTitle()` | `"mainTitle"` |
| `mainTitleImage.ts` | `mainTitleImage()` | `"mainTitleImage"` |
| `paragraph.ts` | `paragraph()` | `"paragraph"` |
| `paragraphComponentUpdated.ts` | `paragraphComponentUpdated()` | `"paragraphComponentUpdated"` |
| `separator.ts` | `separator()` | `"separator"` |
| `strong.ts` | `strong()` | `"strong"` |
| `subtitle.ts` | `subtitle()` | `"subtitle"` |

## Structure

```
inner-component-stubs/
├── src/
│   ├── components/
│   │   ├── button.ts
│   │   ├── heading.ts
│   │   ├── image.ts
│   │   ├── imageLink.ts
│   │   ├── italic.ts
│   │   ├── link.ts
│   │   ├── list.ts
│   │   ├── listItem.ts
│   │   ├── mainTitle.ts
│   │   ├── mainTitleImage.ts
│   │   ├── paragraph.ts
│   │   ├── paragraphComponentUpdated.ts
│   │   ├── separator.ts
│   │   ├── strong.ts
│   │   └── subtitle.ts
│   └── index.ts        # aggregated public exports
├── tests/
│   └── stubs.test.ts   # asserts every stub returns its own name
├── tsconfig.json
└── package.json
```

## Usage

```ts
import { button, paragraph } from './src/index';

button();    // "button"
paragraph(); // "paragraph"
```

## Setup & test

```bash
npm install
npm test
# runs: tsc && node dist/tests/stubs.test.js
```

## Turning a stub into the real thing

Each file is a 1:1 placeholder for a real inner-content component. To
implement one for real:

1. Replace `return 'componentName';` with the real render logic —
   parameters in, HTML string out.
2. Update the corresponding case in `tests/stubs.test.ts` (or split into
   per-component test files) to assert on real HTML output instead of the
   placeholder name.
3. Update `src/index.ts` if the function signature changes.
