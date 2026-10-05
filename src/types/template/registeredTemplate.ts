import type { TemplateRenderFn } from './templateRenderFn.ts';

/**
 * A template that has been normalized by the registry — carries both
 * the canonical ID and the object form, regardless of source shape.
 */
export interface RegisteredTemplate<Props = unknown> {
  /** Canonical ID used by `renderTemplate(id, payload)`. */
  readonly id: string;
  /** Human-readable name (usually === id for TS templates). */
  readonly name: string;
  /** The actual render function. */
  readonly render: TemplateRenderFn<Props>;
}
