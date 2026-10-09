# transactional-emails

A small, standalone transactional email template generator. Built as its own
repository (no monorepo, no shared workspace) so it can move fast and be
fully finished on its own timeline. See
[docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md) for
why the code is split the way it is.

The public entry is `src/index.ts`. It exports every template, its props, and
`renderTemplate` / `listTemplates` / `getTemplate`.

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
| `npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html` | Generate a template's HTML. The published `@llazyemail/generate-template@1.6.0` bin loads `generate-template.config.ts` |
| `npm run generate:assert -- --out=generated` | Assert generated HTML via `@llazyemail/generate-template`. A file counts if it contains `<html` or `<!doctype` |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting with Prettier |

## Structure

```
transactional-emails/
├── packages/
│   ├── template-engine/            # createTemplateFromDefinition + validation helpers
│   └── template-runtime-display/   # head, main, body, footer, content, document
├── src/
│   ├── index.ts                    # public exports
│   ├── layout/                     # shared Postmark document + body blocks
│   ├── templates/
│   │   ├── manifest.ts             # the only registration list
│   │   ├── welcome/                # one folder per email
│   │   ├── invoice/
│   │   └── …
│   └── data/                       # optional fixture payloads
├── tests/
│   ├── unit/
│   └── integration/
├── scripts/
│   └── generate-template.ts
└── docs/adr/
```

## Adding a new template

1. Add a props interface under `src/types/`. Extend `EmailBrandProps` for the
   masthead and footer.
2. Create `src/templates/<id>/<name>Email.ts` with `defineTemplate`. Render
   the body through `renderPostmarkDocument` — do not copy the stylesheet or
   the masthead/footer tables. Put the CLI preview payload in
   `src/templates/<id>/sample.ts` and pass that export as `sample`. Do not
   inline fixture data in the builder.
3. Append that export to the list in `src/templates/manifest.ts`. The
   registry, the generator catalog, and the render-all test pick it up
   from there.
4. Add a unit test in `tests/unit/`.
5. Re-export the template and its props from `src/index.ts` if callers
   should import them directly.

## End-to-end proof

```bash
npm run test:real-data
```

This renders every registered template through the same `renderTemplate(id, payload)`
path used in production, writes the HTML to `generated-real-data/`, and
asserts the output is well-formed. Open the generated files in a browser to
inspect them directly.

## Directory Policy

See [docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md).
Short version: template-specific logic lives in `src/templates/`, anything
reusable across templates belongs in `packages/`.
