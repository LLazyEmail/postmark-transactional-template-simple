/**
 * MSO (Outlook) fallback styles.
 *
 * Outlook ignores the webfont declared in POSTMARK_STYLES, so we
 * explicitly tell it to fall back to Arial for `.f-fallback`. Wrapped
 * in a conditional comment so non-Outlook clients never see it.
 */
export const POSTMARK_MSO_FALLBACK = `<!--[if mso]>
    <style type="text/css">
      .f-fallback  { font-family: Arial, sans-serif; }
    </style>
  <![endif]-->`;