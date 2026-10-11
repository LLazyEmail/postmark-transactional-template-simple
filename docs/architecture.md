# Architecture

How this repo is wired, in one read. `AGENTS.md` is the rules and task
router; this file is the reference behind it. Ground truth is code:
`src/templates/manifest.ts` (registration), `src/data/index.ts` (payloads),
`scripts/create-project-generator.ts` (CLI wiring). If this file disagrees
with them, they win.

## Layers

| Layer | Path | Role |
|---|---|---|
| Component types | `packages/component-types/` | Typed HTML components (button, heading, …). Aliased as `@llazyemail/component-types` in `tsconfig.json` and `vitest.config.ts`. Move-out boundary: never import repo code into it |
| Shared types | `src/types/` | `ITemplate`, `EmailBrandProps`; `src/types/components/` is a compat shim re-exporting the package |
| Layout | `src/layout/` | Postmark document shell (`renderPostmarkDocument`: head, MSO fallback, body, footer, styles) + blocks (buttons, tables, sub-copy). Product-specific, not generic — not a package |
| Templates | `src/templates/<id>/` | One folder per email: `<name>Email.ts` (render logic) + `types.ts` (props). `defineTemplate.ts` normalizes both definition styles |
| Registration | `src/templates/manifest.ts` → `registry.ts` | One list → derived lookups (id, name, aliases, plus lowercase of each) |
| Data | `src/data/` | One typed instance per template + `templateData` map; `index.ts` is the only join point |
| CLI wiring | `scripts/create-project-generator.ts` | Engine catalog + `samplePayloads`; `generate-template.config.ts` is the entry the published bin loads |
| Tests | `tests/unit/`, `tests/integration/`, `tests/fixtures/` | See "Test map" below |
| Inputs, never edit | `reference/<id>/`, `NEXT/` | Original Postmark exports / vendored starter; `NEXT/` is excluded from tsc and unused |

Dependency direction is one-way: `src/templates` and `src/layout` may import
`packages/*`; nothing in `packages/*` imports from `src/`.

## Template inventory

Modules live under `src/templates/`, data instances under `src/data/`.
"Style" is how the module is defined: `defineTemplate` directly, or a legacy
`ITemplate` object adopted in the manifest.

| id | name | aliases | module (export) | style | data instance | props type |
|---|---|---|---|---|---|---|
| `PasswordResetEmail` | `PasswordResetEmail` | `password-reset` | `password-reset/passwordResetEmail.ts` (`passwordReset`) | defineTemplate | `password-reset.ts` (`passwordResetData`) | `PasswordResetEmailProps` |
| `OrderConfirmationEmail` | `OrderConfirmationEmail` | `order-confirmation` | `order-confirmation/orderConfirmationEmail.ts` (`orderConfirmation`) | legacy ITemplate | `order-confirmation.ts` (`orderConfirmationData`) | `OrderConfirmationEmailProps` |
| `WelcomeEmail` | `WelcomeEmail` | `welcome` | `welcome/welcomeEmail.ts` (`WelcomeEmail`) | legacy ITemplate | `welcome.ts` (`welcomeData`) | `WelcomeEmailProps` |
| `InvoiceEmail` | `InvoiceEmail` | `invoice` | `invoice/invoiceEmail.ts` (`InvoiceEmail`) | legacy ITemplate | `invoice.ts` (`invoiceData`) | `InvoiceEmailProps` |
| `TrialExpiringEmail` | `TrialExpiringEmail` | `trial-expiring` | `trial-expiring/trialExpiringEmail.ts` (`TrialExpiringEmail`) | legacy ITemplate | `trial-expiring.ts` (`trialExpiringData`) | `TrialExpiringEmailProps` |
| `UserInvitationEmail` | `UserInvitationEmail` | `user-invitation` | `user-invitation/userInvitationEmail.ts` (`UserInvitationEmail`) | legacy ITemplate | `user-invitation.ts` (`userInvitationData`) | `UserInvitationEmailProps` |
| `ExampleEmail` | `ExampleEmail` | `example` | `example/exampleEmail.ts` (`ExampleEmail`) | defineTemplate | `example.ts` (`exampleData`) | `ExampleEmailProps` |
| `CommentNotificationEmail` | `CommentNotificationEmail` | `comment-notification` | `comment-notification/commentNotificationEmail.ts` (`CommentNotificationEmail`) | defineTemplate | `comment-notification.ts` (`commentNotificationData`) | `CommentNotificationEmailProps` |

Ids are CamelCase and equal `name`; the kebab forms are aliases kept so
legacy lookups (`renderTemplate('password-reset')`, `--template=password-reset`)
and the CLI slugs keep resolving (ADR 0003). Ground truth:
`src/templates/manifest.ts` + `src/data/index.ts`. Update this table when
either changes.

## Data and render flows

CLI (generation):

1. `src/data/<id>.ts` holds one typed instance per template.
2. `src/data/index.ts` collects them into `templateData`, keyed by template id.
3. `scripts/create-project-generator.ts` expands `templateData` over every
   lookup key (id, name, aliases) into the engine's `samplePayloads` and builds
   the `catalog` from `manifest.templates`.
4. Engine `createGenerator({ root, templatesDir: 'src/templates', outDir: 'generated', reviveDates: true, catalog, samplePayloads })`.

Payload resolution when the CLI renders: `--data=<path>` (`.js` or `.json`,
overrides) → `samplePayloads[id]` (the data instance) → error. `dataDir` is
not configured and `useDataFiles` is not enabled; do not re-add them.
`--all` / `--out` write `generated/<slug>.html` (slug derived from the id or
alias; `WelcomeEmail` → `welcome`).

Runtime (production render):

`renderTemplate(id, payload)` → registry lookup (case-insensitive over id,
name, aliases) → optional `checks` validation via `@llazyemail/validator` →
`template.render(payload)` returns a full HTML document. Callers import this
from `src/index.ts`.

## Registration pipeline

Adding a template touches exactly:

1. `src/templates/<id>/<name>Email.ts` + `types.ts` — render logic, props.
2. `src/data/<id>.ts` + an entry in `src/data/index.ts` (`templateData`, keyed by id).
3. One entry in `src/templates/manifest.ts`.
4. A re-export in `src/index.ts` if callers should import it directly.
5. A test in `tests/unit/`.

Everything else derives: `registry.ts` lookups, the engine catalog and
`samplePayloads`, and the whole-suite guards (`data-instances.test.ts`,
`registry.test.ts`, `render-all.test.ts`). Do not edit `registry.ts` for a
new template. Step-by-step recipe: README §"Adding a new template".

## Test map

| Test | Guards |
|---|---|
| `tests/unit/data-instances.test.ts` | Every template id has a `templateData` entry; no orphan instances |
| `tests/unit/registry.test.ts` | Canonical names, legacy ids, case-insensitivity, error messages |
| `tests/unit/generate-baseline.test.ts` | Six baseline filenames + per-template render markers |
| `tests/unit/generate-html-diff.test.ts` | Engine render through the catalog keeps baseline markers; welcome `Date` revives |
| `tests/unit/generate-write-all.test.ts` | `writeAll` writes every pinned slug; `assertGenerated` clean |
| `tests/unit/generate-cli-flags.test.ts` | `GENERATE_FLAGS`, `parseArgs` behavior, slug mapping, config/bin parity |
| `tests/integration/render-all.test.ts` | Every template renders valid HTML via `renderTemplate`, deterministically |
| `tests/unit/<name>Email.test.ts` | Per-template copy, escaping, field mapping |
| `tests/unit/*.test-d.ts` | Type-level tests via vitest typecheck |

The `generate-*` tests plus `data-instances` and `registry` are
contract-level: a failure after a dependency bump is a module or stale-install
problem, not something to patch here (see AGENTS.md "Module regressions").

## CI

- `.github/workflows/node.js.yml` — on push/PR to `main`: install with GitHub
  Packages auth (`secrets.GITHUB_TOKEN`), `lint` → `test` → `test:real-data` →
  `generate:template -- --all` → `generate:assert` → coverage. Uploads
  `generated/` and the coverage report. Node 24 only.
- `.github/workflows/generate-templates.yml` — render only; runs on every PR,
  on manual dispatch, and on push to `main` when `src/**`, `scripts/**`,
  `package.json`, `package-lock.json`, or itself change. Uses
  `LLazyEmail/email-template-workflows@v1` command mode with
  `--all --out=generated`, then `generate:assert`. Lint and tests stay in
  `node.js.yml`.

## Related

- `AGENTS.md` — rules, task router, commands, invariants.
- `docs/adr/0001-module-boundaries.md` — why `packages/` and `src/` are split.
- `docs/adr/0002-data-instances.md` — why data lives in `src/data` and how the join works.
- `docs/adr/0003-camelcase-template-ids.md` — why ids are CamelCase and kebab forms are aliases.
