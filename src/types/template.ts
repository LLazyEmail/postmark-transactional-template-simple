// src/types/template.ts
//
// Core template contract. Every template in src/templates/ — whether it
// started life as a legacy `.definition.js` or was written natively in
// TypeScript — must satisfy `ITemplate<Props>`.
//
// Two shapes are supported and unified in `src/templates/registry.ts`:
//
//   1. Object form (preferred):
//        export const InvoiceEmail: ITemplate<InvoiceEmailProps> = {
//          name: 'InvoiceEmail',
//          render: (props) => '<html>...</html>',
//        };
//
//   2. Function form (legacy compatibility):
//        export const passwordReset: TemplateRenderFn<PasswordResetProps> =
//          (props) => '<html>...</html>';
//      ...paired with a separate `TEMPLATE_ID` constant. The registry
//      wraps these into the object form at load time.

/** A rendered email — always a full HTML document as a string. */
export type HtmlString = string;

/**
 * The object shape every typed template implements.
 * `name` doubles as the template's canonical registry ID.
 */
export interface ITemplate<Props> {
  readonly name: string;
  render(props: Props): HtmlString;
}

/**
 * The function shape legacy `.definition.js` files used.
 * Preserved so the conversion is non-breaking.
 */
export type TemplateRenderFn<Props> = (props: Props) => HtmlString;

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

/**
 * Convenience helper for declaring a typed template without repeating
 * the generic parameters. Identical to `ITemplate<Props>` — this is
 * just a `const` helper so the type reads nicely at call sites.
 */
export type Template<Props> = ITemplate<Props>;
