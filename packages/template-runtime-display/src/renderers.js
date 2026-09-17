/**
 * Pure, non-mutating display renderers.
 * Each function takes settings + returns an HTML string fragment.
 * No shared mutable state between calls (mirrors the "pure pipeline" fix
 * from hn_email_template's Phase 2 migration notes).
 */

function displayHead({ title, preview } = {}) {
  return `
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title || ''}</title>
    <!-- preview text, hidden -->
    <div style="display:none;max-height:0;overflow:hidden;">${preview || ''}</div>
  </head>`;
}

function displayMain({ heading, bodyText, ctaLabel, ctaUrl } = {}) {
  const cta =
    ctaLabel && ctaUrl
      ? `<a href="${ctaUrl}" style="display:inline-block;padding:12px 20px;background:#111;color:#fff;text-decoration:none;border-radius:4px;">${ctaLabel}</a>`
      : '';

  return `
    <main>
      <h1>${heading || ''}</h1>
      <p>${bodyText || ''}</p>
      ${cta}
    </main>`;
}

function displayFooter({ companyName, unsubscribeUrl } = {}) {
  const unsubscribe = unsubscribeUrl
    ? `<a href="${unsubscribeUrl}">Unsubscribe</a>`
    : '';

  return `
    <footer>
      <p>${companyName || ''}</p>
      ${unsubscribe}
    </footer>`;
}

function displayBody({ headHtml, mainHtml, footerHtml } = {}) {
  return `<!DOCTYPE html>
<html lang="en">
${headHtml}
<body>
${mainHtml}
${footerHtml}
</body>
</html>`;
}

module.exports = {
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
};
