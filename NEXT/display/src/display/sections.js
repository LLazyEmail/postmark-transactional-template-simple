/**
 * Stubs for the display-pipeline section renderers.
 * Mirrors packages/template-runtime-display in LLazyEmail/hn_email_template
 * (see displayHead/displayBody/displayFooter/displayMain/displayContent
 * .unit.test.js files in that repo).
 *
 * In the real repo each of these runs a mapper -> model -> display pipeline
 * and returns an HTML fragment. These stubs skip all of that and just
 * return the section's own name, so the overall shape/wiring can be
 * proven out before the real rendering logic is ported over.
 */

function displayHead() {
  return 'displayHead';
}

function displayMain() {
  return 'displayMain';
}

function displayFooter() {
  return 'displayFooter';
}

function displayBody() {
  return 'displayBody';
}

function displayContent() {
  return 'displayContent';
}

module.exports = {
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
  displayContent,
};
