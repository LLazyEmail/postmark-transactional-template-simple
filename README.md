# transactional-emails

A small, standalone transactional email template generator. Built as its own
repository (no monorepo, no shared workspace) so it can move fast and be
fully finished on its own timeline. See
[docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md) for
why the code is split the way it is.

The public entry is `src/index.ts`. It exports the live email system
(`renderTemplate` / `listTemplates` / `getTemplate`, `templateData`, lookup
maps), the `defineEmail` / `createEmailSystem` factories for extending it,
and every props type.

## Why this exists

This repo intentionally mirrors the target package shape used in
`hn_email_template` (`template-engine` + `template-runtime-display` +
definition-based templates), but starts from a much simpler problem —
transactional emails with flat, simple payloads and no front-matter, digest
sections, or ad variants. The goal is to prove the pattern cheaply here, then
carry lessons back into the more complex repo once it settles.

This repo does **not** depend on `hn_email_template` in any way. The
`packages/` folder started as a copy from that repo and is now owned
independently — feel free to change it without worrying about the other repo.

## Documentation

- [AGENTS.md](AGENTS.md) — task router, commands, and invariants for AI
  agents (also the fastest orientation for humans).
- [docs/architecture.md](docs/architecture.md) — layers, data and render
  flows, template inventory, test and CI maps.
- [docs/adr/](docs/adr/) — decision records: module boundaries (0001), data
  instances (0002), CamelCase template ids (0003), email modules + derived
  system (0004).

## Setup

```bash
npm install
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all unit and integration tests |
| `npm run test:real-data` | Run only the integration tests that generate real HTML from fixture data |
| `npm run test:coverage` | Run the suite with V8 coverage |
| `npm run typecheck` | Type-check the repo (`tsc --noEmit`) |
| `npm run generate:template -- --template=PasswordResetEmail --out=generated/password-reset.html` | Generate a template's HTML from its data instance in `src/data/`. Add `--data=<path>` to render a real payload (`.js` or `.json`) instead. The published `@llazyemail/generate-template@1.6.1` bin loads `generate-template.config.ts` |
| `npm run generate:assert -- --out=generated` | Assert generated HTML via `@llazyemail/generate-template`. A file counts if it contains `<html` or `<!doctype` |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting with Prettier |
| `npm run build` | Bundle with tsup |

## Structure

```
transactional-emails/
├── AGENTS.md                       # agent task router, commands, invariants
├── packages/
│   └── component-types/            # typed components; aliased as @llazyemail/component-types
├── src/
│   ├── index.ts                    # public exports
│   ├── layout/                     # shared Postmark document + body blocks
│   ├── templates/
│   │   ├── manifest.ts             # the only registration list
│   │   ├── defineEmail.ts          # module factory (render + metadata + data)
│   │   ├── system.ts               # derives lookups, maps, templateData
│   │   ├── registry.ts             # live system bound to the manifest
│   │   ├── welcome/                # one folder per email
│   │   ├── invoice/
│   │   └── …
│   └── data/                       # typed data instances (bound by modules)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── scripts/
│   └── create-project-generator.ts # catalog factory for the generate-template bin
├── generate-template.config.ts     # entry the published bin loads
└── docs/
    ├── architecture.md             # layers, data flow, test + CI map
    └── adr/                        # 0001–0004 decision records
```

## Adding a new template

1. Create `src/templates/<id>/types.ts` with the props interface. Extend
   `EmailBrandProps` for the masthead and footer.
2. Create `src/data/<id>.ts` with the payload typed as that props interface
   (the default the CLI renders).
3. Create `src/templates/<id>/<name>Email.ts`: one `defineEmail()` module
   with `id` (CamelCase, e.g. `SomethingEmail`), `name`, `aliases`, `file`,
   `exportName`, `data`, and `render`. Render the body through
   `renderPostmarkDocument` — do not copy the stylesheet or the
   masthead/footer tables. Add a kebab-case alias only when a legacy or CLI
   name must keep resolving.
4. Append the module to the list in `src/templates/manifest.ts`. The derived
   system (lookups, `templateData`), the generator catalog, and the
   render-all test pick it up from there.
5. Add a unit test in `tests/unit/`.

## End-to-end proof

```bash
npm run test:real-data
```

This renders every registered template through the same `renderTemplate(id, payload)`
path used in production, using each template's data instance from `src/data/`,
and asserts the output is well-formed HTML. To inspect real output, run
`npm run generate:template -- --all` and open `generated/`.

## Directory Policy

See [docs/adr/0001-module-boundaries.md](docs/adr/0001-module-boundaries.md).
Short version: template-specific logic lives in `src/templates/`, data
instances live in `src/data/` (see
[docs/adr/0002-data-instances.md](docs/adr/0002-data-instances.md)), and
anything reusable across templates belongs in `packages/`.
