/**
 * Plain Node assertions — no test runner dependency required.
 * Run with: node tests/stubs.test.js
 */
const assert = require('assert');
const {
  headComponent,
  mainComponent,
  bodyComponent,
  footerComponent,
  displayHead,
  displayMain,
  displayFooter,
  displayBody,
  displayContent,
} = require('../src/index');

const cases = [
  [headComponent, 'headComponent'],
  [mainComponent, 'mainComponent'],
  [bodyComponent, 'bodyComponent'],
  [footerComponent, 'footerComponent'],
  [displayHead, 'displayHead'],
  [displayMain, 'displayMain'],
  [displayFooter, 'displayFooter'],
  [displayBody, 'displayBody'],
  [displayContent, 'displayContent'],
];

cases.forEach(([fn, expected]) => {
  const actual = fn();
  assert.strictEqual(actual, expected, `${fn.name} should return "${expected}", got "${actual}"`);
  console.log(`ok — ${fn.name}() -> "${actual}"`);
});

console.log(`\nAll ${cases.length} stub components returned their own name correctly.`);
