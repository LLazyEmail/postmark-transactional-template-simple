# email-component-stubs

Name-only stub implementations of the components and display sections found
in [`LLazyEmail/hn_email_template`](https://github.com/LLazyEmail/hn_email_template).

Instead of returning real HTML, every function here just returns a string
containing its own name — e.g. `headComponent()` returns `"headComponent"`.
This is useful for proving out wiring, imports, and structure before the
real rendering logic is written or ported over.

## Where these names come from

Component and section names were taken directly from the source repo's
documented test files (README § Testing & Validation → Key unit test
files), so they line up with the real implementation 1:1:

| Stub | Mirrors (in `hn_email_template`) | Real location |
|------|-----------------------------------|----------------|
| `headComponent` | `headComponent.unit.test.js` | `Work/src/components/` |
| `mainComponent` | `mainComponent.unit.test.js` | `Work/src/components/` |
| `bodyComponent` | `body.unit.test.js` | `Work/src/components/` |
| `footerComponent` | `footer.unit.test.js` | `Work/src/components/` |
| `displayHead` | `displayHead.unit.test.js` | `packages/template-runtime-display/` |
| `displayMain` | `displayMain.unit.test.js` | `packages/template-runtime-display/` |
| `displayFooter` | `displayFooter.unit.test.js` | `packages/template-runtime-display/` |
| `displayBody` | `displayBody.unit.test.js` | `packages/template-runtime-display/` |
| `displayContent` | `displayContent.unit.test.js` | `packages/template-runtime-display/` |

## Structure

```
email-component-stubs/
├── src/
│   ├── components/          # low-level HTML component stubs
│   │   ├── headComponent.js
│   │   ├── mainComponent.js
│   │   ├── bodyComponent.js
│   │   └── footerComponent.js
│   ├── display/
│   │   └── sections.js      # display pipeline section stubs
│   └── index.js             # aggregated public exports
├── tests/
│   └── stubs.test.js        # plain node assert, no test runner dependency
└── package.json
```

## Usage

```js
const { headComponent, displayMain } = require('./src/index');

headComponent(); // "headComponent"
displayMain();   // "displayMain"
```

## Run the test

```bash
npm test
# or directly:
node tests/stubs.test.js
```

No dependencies to install — everything runs on plain Node.

## Turning a stub into the real thing

Each stub is a 1:1 placeholder. To implement one for real:

1. Open the matching real file in `hn_email_template` (e.g.
   `Work/src/components/` for a low-level component, or
   `packages/template-runtime-display/` for a display section).
2. Replace the stub's `return 'componentName';` with the real logic —
   parameters in, HTML string out.
3. Update `tests/stubs.test.js` (or split into per-component test files)
   to assert on real output instead of the placeholder name.
