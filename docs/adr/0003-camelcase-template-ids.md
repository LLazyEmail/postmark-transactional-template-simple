# ADR 0003 — CamelCase Template Ids

## Status

Accepted (2026-10-11).

## Context

Template ids had drifted into two styles: `WelcomeEmail`, `InvoiceEmail`,
`TrialExpiringEmail`, `UserInvitationEmail` (CamelCase, equal to `name`)
versus `password-reset`, `order-confirmation`, `example`,
`comment-notification` (legacy kebab-case). The `templateData` map in
`src/data/index.ts` is keyed by id, which made the mix visible: half the keys
were quoted kebab strings, half bare CamelCase identifiers.

## Decision

- The canonical id of every template is its CamelCase name (`<Name>Email`);
  today `id` and `name` are equal for all templates.
- Legacy kebab-case ids stay as aliases (`aliases: ['password-reset']`), so
  `renderTemplate('password-reset')`, `--template=password-reset`, and
  `tests/unit/registry.test.ts` legacy-id expectations keep resolving.
- `TEMPLATE_ID` exports (`password-reset`, `order-confirmation`) keep their
  kebab-case values: they are the legacy constants, and the password-reset
  module uses its own as the alias source.
- `src/data/index.ts` keys are the CamelCase ids.
- Template folders and module filenames are unchanged: folders follow the
  kebab slug, files were already camelCase and stay as they are.

## Consequences

- Generated filenames are unchanged: the engine slugifies the id
  (`PasswordResetEmail` → `password-reset.html`), matching
  `tests/fixtures/generated-slugs.json` and the baseline filenames.
- `tests/unit/data-instances.test.ts` enforces CamelCase ids and keeps the
  map covered with no orphans.
- New templates must use a CamelCase id; add a kebab alias only when a
  legacy or CLI name must keep resolving.
