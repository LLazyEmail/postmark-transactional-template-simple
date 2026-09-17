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
- `packages/template-runtime-display/` — pure, non-mutating HTML rendering
  functions (`displayHead`, `displayMain`, `displayFooter`, `displayBody`).
  No template-specific knowledge allowed here either — only layout primitives.
- `src/templates/*.definition.js` — one file per template. This is the ONLY
  place template-specific content, copy, and field mapping should live.
- `src/templates/index.js` — the public `renderTemplate(id, payload)` registry.
  This is the one stable public API consumers should call.
- `src/data/` — fixture payloads for tests and the CLI generator. Not
  production data.

## Rules

1. `packages/*` must never import from `src/templates/*`. Dependency
   direction is one-way: templates depend on packages, never the reverse.
2. A new template must not require changes to `packages/*` unless the
   change is genuinely generic (e.g. a new layout primitive every template
   could use). If a change only helps one template, it belongs in that
   template's definition file, not in a shared package.
3. Every template definition must have: a fixture in `src/data/`, a unit
   test in `tests/unit/`, and a registry entry in `src/templates/index.js`.

## Consequences

- Slightly more ceremony up front for a one-template repo, but avoids the
  "everything in one flat file, split it apart later" situation this repo
  is deliberately trying to skip.
- If `packages/template-engine` or `packages/template-runtime-display`
  diverge meaningfully from the versions in `hn_email_template`, that's
  fine — they are owned independently here (see README). Divergence is a
  signal worth noting, not a bug to immediately fix.
