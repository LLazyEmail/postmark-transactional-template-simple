# ADR 0004 — Email Modules and the Derived Email System

## Status

Accepted (2026-10-11). Supersedes `defineTemplate()` + `adopt()` (ADR 0001)
and the hand-written `templateData` map in `src/data/index.ts` (ADR 0002).

## Context

Two growth problems after eight templates:

1. A template was described in three places: the module (render + metadata),
   the manifest (`adopt()` + meta), and `src/data/index.ts` (id → payload).
   Nothing tied them together, so a rename or a new template was a multi-file
   chore with silent-breakage failure modes (orphan data instances, props
   drift, forgotten aliases).
2. Registration surfaces grew linearly: `src/index.ts` re-exported every
   template and every data instance, and `registry.ts` rebuilt the lookups
   by hand.

At eight templates this is survivable; at thirty it is a backlog of
inconsistencies.

## Decision

Two levels of abstraction, both pure and testable:

**Level 1 — `defineEmail()` (`src/templates/defineEmail.ts`).** One factory
replacing `defineTemplate()` + `adopt()`. A module declares `id`, `name`,
`aliases`, `file`, `exportName`, optional `checks`, its typed `data`
instance, and `render`. `data` is typed by the same props the render
function consumes, so the two cannot drift. The result is an
`EmailModule<Props>`.

**Level 2 — `createEmailSystem()` (`src/templates/system.ts`).** Pure
factory: given any list of modules it derives the whole surface — `byId`,
`byName`, case-insensitive `lookup` over id/name/aliases, `templateData`
(keyed by id), `listTemplates`, `getTemplate`, and `renderTemplate` (which
runs `checks` before render). `registry.ts` instantiates it once with the
real manifest; `src/index.ts` re-exports the instance.

`src/templates/manifest.ts` becomes a flat list of modules, and nothing
else registers a template.

## Consequences

- Adding a template: one folder (types + module binding its `data`), one
  data instance, one manifest line, one test. No edits to `registry.ts`,
  `system.ts`, `src/index.ts`, or a data map.
- Renames are single-source: id/alias live in the module; the derived maps
  and the CLI `samplePayloads` follow automatically.
- `src/data/index.ts` is deleted; `templateData` derives from the modules.
- The system is pure, so `tests/unit/email-system.test.ts` covers the whole
  derived contract with fake modules in milliseconds.
- Legacy kebab ids keep resolving through `aliases` (ADR 0003 unchanged).
