# Agent guide

Transactional email template generator: TypeScript ESM, Node >= 24, npm.
This file exists so an agent can make correct changes **without exploring the
repo first** — follow it instead of grepping. If code and this file disagree,
the code wins; update this file.

## Task router

| Task | Read first | Touch only |
|---|---|---|
| Add / remove a template | README §"Adding a new template" | `src/templates/<id>/`, `src/data/<id>.ts`, one line in `src/templates/manifest.ts`, one `tests/unit/` file |
| Change what the CLI renders by default | — | `src/data/<id>.ts` (keep the props type) |
| Change one email's copy or markup | that template's module | `src/templates/<id>/<name>Email.ts` (+ `types.ts`) |
| Change the shared shell or styles (all emails) | `src/layout/` | `src/layout/` |
| Add a lookup alias / rename an id | that template's module (`defineEmail`) | `src/templates/<id>/<name>Email.ts`; derived maps follow automatically |
| Generated HTML is wrong | "Module regressions" below | `scripts/create-project-generator.ts` only for catalog wiring; otherwise module bump |
| Understand the split of concerns | `docs/architecture.md` | — |

## Repository map

| Path | What it is |
|---|---|
| `src/index.ts` | Public API facade: the live email system, `defineEmail`/`createEmailSystem`, props types. Never add per-template lines |
| `src/templates/manifest.ts` | The only registration list: flat list of `defineEmail()` modules |
| `src/templates/defineEmail.ts` | `defineEmail()`: id/name/aliases/file/exportName/checks + typed `data` + render |
| `src/templates/system.ts` | `createEmailSystem()`: derives lookups, maps, `templateData`, `renderTemplate`/`listTemplates`/`getTemplate` |
| `src/templates/registry.ts` | Instantiates the system with the real manifest. Do not edit for a new template |
| `src/templates/<id>/` | One folder per email: `<name>Email.ts` (module) + `types.ts` |
| `src/data/<id>.ts` | One typed data instance per template — bound into its module via `defineEmail({ data })` |
| `src/layout/` | Postmark document shell + blocks shared by all emails |
| `scripts/create-project-generator.ts` | Engine catalog + `samplePayloads` wiring |
| `generate-template.config.ts` | Entry the published bin loads |
| `packages/component-types/` | Typed components; aliased as `@llazyemail/component-types`. Move-out boundary |
| `packages/template-engine/` | Starter copy; nothing imports it. Ignore unless asked |
| `tests/unit/` | Unit + generation contract tests (see `docs/architecture.md` test map) |
| `tests/integration/render-all.test.ts` | Every template through `renderTemplate` |
| `tests/fixtures/` | Props + `generated-slugs.json` baseline output stems |
| `reference/<id>/` | Original Postmark exports. Compare rendered output; never edit |
| `NEXT/` | Vendored, excluded from tsc. Do not import or build |
| `docs/architecture.md` | Layers, data flow, test map (read on demand) |
| `docs/adr/` | 0001 module boundaries, 0002 data instances, 0003 CamelCase ids, 0004 email modules + derived system |

## Commands

| Command | Purpose | Good outcome |
|---|---|---|
| `npm run typecheck` | **Do not run locally** (saves credits) — `npm test` type-checks anyway (`vitest.config.ts` has `typecheck: enabled`) | — |
| `npx vitest run tests/unit/<file>.test.ts` | focused check while iterating (cheapest) | pass |
| `npm test` | full suite before finishing | pass |
| `npm run test:real-data` | integration render | pass |
| `npm run generate:template -- --template=<id>` | render one template via its data instance | `generated/<slug>.html` |
| `npm run generate:template -- --template=<id> --data=<path>` | render a real payload (`.js` / `.json`) | overrides the data instance |
| `npm run generate:template -- --all` | render every template | `generated/*.html` |
| `npm run generate:assert` | assert generated HTML against `tests/fixtures/generated-slugs.json` | pass |
| `npm run lint` | `eslint src scripts` | pass |

Change checklist: full tests green (`npm test` type-checks via vitest — do not
run `npm run typecheck` separately). New or renamed templates keep
`tests/unit/data-instances.test.ts` green (every template id has a `templateData`
entry, no orphans). Run `test:real-data` when rendering or data changed.
Do not run coverage while iterating.

## Data flow (one paragraph)

`src/data/<id>.ts` → bound into its module with `defineEmail({ data })` →
`registry.ts` derives `emailSystem.templateData` via `createEmailSystem()` →
`scripts/create-project-generator.ts` expands every entry over all lookup keys
(id, name, aliases) into the engine's `samplePayloads` → CLI. Payload
resolution at render: `--data=<path>` wins, then the data instance, then a
thrown error. `dataDir` is not configured and `useDataFiles` is not enabled —
do not re-add them.

## Invariants

- `manifest.ts` is the only registration list (a flat list of `defineEmail()` modules). Never edit `registry.ts`, `system.ts`, or `src/index.ts` for a template, and never add a second catalog file.
- Template ids are CamelCase (`<Name>Email`, equal to `name`). Kebab forms such as `password-reset` are aliases only; never register a new kebab-case id (ADR 0003).
- Payloads live in `src/data/` only; a module binds its instance via `defineEmail({ data })` — never inline fixture data in render bodies.
- Generated stems follow the slug of the id/alias; six baseline names are pinned in `tests/unit/generate-baseline.test.ts` and `tests/fixtures/generated-slugs.json` (`WelcomeEmail` writes `welcome.html`).
- ESM with explicit `.ts` extensions on relative imports (`allowImportingTsExtensions`). `noUncheckedIndexedAccess` is on.
- `welcomeData.signupDate` is a real `Date`; the engine is configured `reviveDates: true`.

## Generate CLI flags

Supported flags (do not rename or drop):

- `--list`
- `--all`
- `--template=<id>`
- `--data=<path>`
- `--out=<file-or-dir>`

`npm run generate:template` must keep those flags. If the package CLI changes flag names, fix `@llazyemail/generate-template` and publish. Do not fork flags in this repo.

## Package install

- Install `@llazyemail/*` packages with npm only (`npm install @llazyemail/generate-template`).
- Do **not** add git URLs (`github:LLazyEmail/...`, `git+https://...`, `#main`) as the dependency spec.
- Do **not** vendor, submodule, or `postinstall`-build the module from source as a substitute for a published package.
- Pin `@llazyemail/generate-template` to an exact published version (currently `1.6.1`). Do not use a git URL or a floating `*` range.
- If CI cannot install, fix registry auth (`GITHUB_TOKEN` / `NODE_AUTH_TOKEN` with `packages: read`). Do not switch the install source to git.
- If the published package is wrong or incomplete, publish a new version of the module and bump the pin. Do not work around it from this repo.

Registry: `.npmrc` maps `@llazyemail` to GitHub Packages and reads
`GITHUB_TOKEN`. A local `npm install` without that token fails with E401 —
that is an auth problem, never a reason to change the dependency spec.

## Component types

`packages/component-types` is the move-out boundary for `src/types/components`. Import it as `@llazyemail/component-types`. Do not add imports from this repository into that package. Publish it under that name when it leaves; do not replace the import with a git URL.

## Module regressions (generate-template)

`tests/unit/generate-html-diff.test.ts` and `tests/unit/generate-write-all.test.ts` are the contract. If an npm bump of `@llazyemail/generate-template` makes those fail, treat it as a module regression. Publish a new module version and bump the pin. Do not copy engine code back into `scripts/`.

The locally installed copy can lag the pin (e.g. 1.0.3 installed while
`package.json` pins 1.6.1). Missing exports from the package (`parseArgs`,
`requestsFromArgs`, `assertGenerated`) or `Cannot find package
'@llazyemail/validator'` mean the install is stale or unauthenticated —
reinstall with a valid token. Never patch `node_modules`, vendor the engine,
or stub the packages to make tests pass.

## Credit savers

- Read `manifest.ts` + the template module's `defineEmail({ data })` block (id/alias/payload truth) instead of grepping templates.
- Do not open `NEXT/`, `reference/` (unless diffing rendered output), or the engine's `node_modules` source; the engine is a pinned black box here.
- One focused test file before the full suite; open generated HTML in a browser instead of dumping it into context.
