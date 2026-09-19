// packages/template-runtime-display/src/types.ts

/**
 * Rendered HTML — always a string fragment or full document.
 * Local alias (not imported from the root app's types/) so this package
 * has zero external type dependencies.
 */
export type HtmlString = string;

// ---------------------------------------------------------------------------
// displayHead
// ---------------------------------------------------------------------------

export interface DisplayHeadProps {
  /** Contents of the <title> tag. Empty string if omitted. */
  title?: string;
  /** Hidden preview text shown in the inbox list. */
  preview?: string;
}

// ---------------------------------------------------------------------------
// displayMain
// ---------------------------------------------------------------------------

export interface DisplayMainProps {
  /** <h1> heading text. */
  heading?: string;
  /** Body paragraph text (may contain inline HTML). */
  bodyText?: string;
  /**
   * CTA button label. Button is rendered only when BOTH ctaLabel
   * and ctaUrl are present — see renderers.ts.
   */
  ctaLabel?: string;
  /** CTA href. See ctaLabel note above. */
  ctaUrl?: string;
}

// ---------------------------------------------------------------------------
// displayFooter
// ---------------------------------------------------------------------------

export interface DisplayFooterProps {
  /** Company name shown in the footer. */
  companyName?: string;
  /** Optional unsubscribe link — rendered only when provided. */
  unsubscribeUrl?: string;
}

// ---------------------------------------------------------------------------
// displayBody
// ---------------------------------------------------------------------------

export interface DisplayBodyProps {
  /** Output of displayHead(). Inserted directly after <html>. */
  headHtml?: HtmlString;
  /** Output of displayMain(). */
  mainHtml?: HtmlString;
  /** Output of displayFooter(). */
  footerHtml?: HtmlString;
}

// ---------------------------------------------------------------------------
// Renderer function types — useful for consumers that want to pass these
// around (e.g. a plugin registry, a custom pipeline).
// ---------------------------------------------------------------------------

export type DisplayHeadRenderer = (props?: DisplayHeadProps) => HtmlString;
export type DisplayMainRenderer = (props?: DisplayMainProps) => HtmlString;
export type DisplayFooterRenderer = (props?: DisplayFooterProps) => HtmlString;
export type DisplayBodyRenderer = (props?: DisplayBodyProps) => HtmlString;
