import { escapeHtml } from '@llazyemail/template-runtime-display';
import type { FieldCheck } from '@llazyemail/validator';
import type { ITemplate } from '../types/template/index.ts';

/**
 * One fully self-contained email: the render definition, the registry
 * metadata, and the typed data instance used as its default payload.
 * This is the unit you copy to add a template — create it with
 * `defineEmail()` and list it in `manifest.ts`. Nothing else derives from
 * it by hand: the registry, the generator catalog, and `templateData` all
 * come from that one list.
 */
export interface EmailModule<Props> extends ITemplate<Props> {
  /** Canonical id passed to `renderTemplate`; CamelCase, equal to `name`. */
  readonly id: string;
  /** Extra lookup keys (legacy kebab ids, short CLI names). */
  readonly aliases: readonly string[];
  /** Path under `src/templates/`, for the generator catalog. */
  readonly file: string;
  /** Named export this module is known by. */
  readonly exportName: string;
  /** Optional validation checks run before render. */
  readonly checks?: FieldCheck[];
  /** Default payload: the template's typed instance from `src/data/`. */
  readonly data: Props;
}

/**
 * Deep-copies a payload with every string HTML-escaped. Dates, numbers, and
 * other non-strings pass through, so values a render body derives itself
 * (e.g. a formatted date) stay the template's responsibility to escape.
 */
function escapePayload<Props>(value: unknown): Props {
  if (typeof value === 'string') return escapeHtml(value) as unknown as Props;
  if (Array.isArray(value)) {
    return value.map((entry) => escapePayload(entry)) as unknown as Props;
  }
  if (value instanceof Date || value === null || typeof value !== 'object') {
    return value as Props;
  }
  const escaped: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    escaped[key] = escapePayload(nested);
  }
  return escaped as Props;
}

/**
 * The only template factory. Pairs a render definition with its typed data
 * instance, so `data` is compile-time checked against the props the render
 * function consumes. Replaces `defineTemplate()` and the legacy
 * `ITemplate` + `adopt()` path (ADR 0004).
 */
export function defineEmail<Props>(config: {
  id: string;
  name: string;
  aliases?: readonly string[];
  file: string;
  exportName: string;
  checks?: FieldCheck[];
  data: Props;
  render: (props: Props) => string;
}): EmailModule<Props> {
  return {
    id: config.id,
    name: config.name,
    aliases: config.aliases ?? [],
    file: config.file,
    exportName: config.exportName,
    checks: config.checks,
    data: config.data,
    render: (props: Props) => config.render(escapePayload<Props>(props)),
  };
}

/** Every lookup key an email answers to: id, name, and aliases. */
export function lookupKeys(email: {
  id: string;
  name: string;
  aliases: readonly string[];
}): string[] {
  return [email.id, email.name, ...email.aliases];
}
