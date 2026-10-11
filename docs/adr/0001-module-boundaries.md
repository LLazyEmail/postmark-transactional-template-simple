# ADR 0001 — Module Boundaries

## Status

Accepted (starter repo baseline).

## Context

This repo starts from patterns proven out in `hn_email_template`
(`packages/template-engine`, `packages/template-runtime-display`,
definition-based templates rendered through a registry). Rather than
building this repo flat and reorganizing later — which is what happened in
`hn_email_template` and is still being unwound there — this repo applies the
boundary rules from day one.

## Decision

- `packages/template-engine/` — the generic factory (`createTemplateFromDefinition`)
  and validation helpers. No template-specific knowledge allowed here.
- `packages/template-runtime-display/` — pure functions that return HTML
  fragments: `head`, `main`, `body`, `footer`, `content`, and `document`.
  One module per fragment. No template-specific knowledge allowed here.
  This package is the one that will be published on its own.
- `src/layout/` — the shared Postmark document (`renderPostmarkDocument`) and
  the small blocks templates compose (button, attribute table, sub-copy).
  This is product layout, not a generic package: the stylesheet is specific
  to these transactional emails. A new template must not paste that shell again.
- `src/templates/<id>/<name>Email.ts` — one folder and one module per
  template, created with `defineEmail` (was `defineTemplate`; see ADR 0004).
  This is the ONLY place that
  template's copy and field mapping should live.
- `src/templates/<id>/sample.ts` — preview payloads moved to
  `src/data/<id>.ts`; see ADR 0002. Do not inline fixture data in the
  builder.
- `src/templates/manifest.ts` — the only registration list. The public
  `renderTemplate(id, payload)` registry and the generate-template catalog are derived
  from it. Adding a template means one module plus one line here.
- `src/templates/legacySamples.ts` — removed; superseded by the
  `templateData` map, which `createEmailSystem()` now derives from the
  modules (ADR 0002, ADR 0004).

## Rules

1. `packages/*` must never import from `src/templates/*`. Dependency
   direction is one-way: templates depend on packages, never the reverse.
2. A new template must not require changes to `packages/*` unless the
   change is genuinely generic (e.g. a new layout primitive every template
   could use). If a change only helps one template, it belongs in that
   template's definition file, not in a shared package.
3. Every template must be a `defineEmail()` module listed in
   `src/templates/manifest.ts`, with a unit test in `tests/unit/` and a
   data instance in `src/data/` (ADR 0002). Do not edit `registry.ts` for a
   new template. Do not add a second catalog file.

## Consequences

- Slightly more ceremony up front for a one-template repo, but avoids the
  "everything in one flat file, split it apart later" situation this repo
  is deliberately trying to skip.
- If `packages/template-engine` or `packages/template-runtime-display`
  diverge meaningfully from the versions in `hn_email_template`, that's
  fine — they are owned independently here (see README). Divergence is a
  signal worth noting, not a bug to immediately fix.
