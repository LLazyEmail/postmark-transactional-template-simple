# ADR 0002 — Data Instances Live in `src/data`

## Status

Accepted (2026-10-11). Supersedes the preview-payload bullets in ADR 0001.
Map derivation superseded by ADR 0004 (2026-10-11): modules bind their data
via `defineEmail({ data })` and `createEmailSystem()` derives `templateData`;
`src/data/index.ts` no longer exists.

## Context

Preview payloads lived next to the templates
(`src/templates/<id>/sample.ts`) and were passed into `defineTemplate` as
`sample`. A parallel set of `src/data/*.data.js` fixtures had drifted:
`password-reset.data.js` and `order-confirmation.data.js` no longer matched
the template props — one failed validation, the other rendered `undefined`
fields. Two sources of truth, and the older one was broken.

## Decision

- `src/data/<id>.ts` — one typed data instance per template, annotated with
  that template's props interface. This is the payload the CLI uses when no
  `--data` file is passed.
- `src/data/index.ts` — the `templateData` map, keyed by template id
  (now derived; ADR 0004).
  `tests/unit/data-instances.test.ts` enforces that it covers every
  registered template and contains no orphans.
- Template modules and `defineTemplate` carry no payload. Registering a
  template is: a `defineTemplate()` module, one entry in
  `src/templates/manifest.ts`, one data instance in `src/data/`.
- `scripts/create-project-generator.ts` joins the two: it expands
  `templateData` over every lookup key (id, name, aliases) into the
  engine's `samplePayloads`.
- `--data=<path>` still overrides the built-in instance for real payloads.

## Consequences

- Templates are render logic plus metadata only; data changes never touch
  them.
- The stale `.data.js` fixtures are gone and `dataDir` is no longer
  configured in the generator.
- Renaming a template id requires updating `templateData`; the
  data-instances test fails loudly instead of the CLI silently rendering
  `undefined`.
