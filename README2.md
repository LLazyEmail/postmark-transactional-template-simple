# transactional-emails

A small, standalone transactional email template generator. Built as its own
repository (no monorepo, no shared workspace) so it can move fast and be
fully finished on its own timeline. See
[docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md) for
why the code is split the way it is.

## Why this exists

This repo intentionally mirrors the target package shape used in
`hn_email_template` (`template-engine` + `template-runtime-display` +
definition-based templates), but starts from a much simpler problem —
transactional emails with flat, simple payloads and no front-matter, digest
sections, or ad variants. The goal is to prove the pattern cheaply here, then
carry lessons back into the more complex repo once it settles.

This repo does **not** depend on `hn_email_template` in any way. The two
packages under `packages/` were copied in as a starting point and are now
owned independently — feel free to change them without worrying about the
other repo.

## Setup

```bash
npm install
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all unit and integration tests |
| `npm run test:real-data` | Run only the integration tests that generate real HTML from fixture data |
| `npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html` | Generate a template's HTML from the CLI |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting with Prettier |

## Structure

```
transactional-emails/
├── packages/
│   ├── template-engine/            # createTemplateFromDefinition + validation helpers
│   └── template-runtime-display/   # pure displayHead/Main/Footer/Body renderers
├── src/
│   ├── templates/
│   │   ├── password-reset.definition.js
│   │   ├── order-confirmation.definition.js
│   │   └── index.js                # renderTemplate(id, payload) registry
│   └── data/                       # fixture payloads per template
├── tests/
│   ├── unit/
│   └── integration/
├── scripts/
│   └── generate-template.js
└── docs/adr/
```

## Adding a new template

1. Create `src/templates/<name>.definition.js` following the existing
   `password-reset.definition.js` pattern: `validateInput`, `map`, `render`,
   built via `createTemplateFromDefinition`.
2. Add a fixture at `src/data/<name>.data.js`.
3. Register it in `src/templates/index.js`.
4. Add a unit test in `tests/unit/` and extend the integration test to cover
   the new template.

## End-to-end proof

```bash
npm run test:real-data
```

This renders both templates through the same `renderTemplate(id, payload)`
path used in production, writes the HTML to `generated-real-data/`, and
asserts the output is well-formed. Open the generated files in a browser to
inspect them directly.

## Directory Policy

See [docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md).
Short version: template-specific logic lives in `src/templates/`, anything
reusable across templates belongs in `packages/`.
