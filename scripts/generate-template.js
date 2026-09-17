#!/usr/bin/env node
/**
 * Usage:
 *   npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html
 *
 * Arguments:
 *   --template   template id (default: password-reset)
 *   --data       path to a payload module that exports the data object
 *   --out        output HTML file path
 */
const fs = require('fs');
const path = require('path');
const { renderTemplate } = require('../src/templates');

function parseArgs(argv) {
  const args = {};
  argv.forEach((arg) => {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) {
      args[match[1]] = match[2];
    }
  });
  return args;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const templateId = args.template || 'password-reset';
  const dataPath = args.data || `src/data/${templateId}.data.js`;
  const outPath = args.out || `generated/${templateId}.html`;

  const resolvedDataPath = path.resolve(process.cwd(), dataPath);
  const payload = require(resolvedDataPath);

  const html = renderTemplate(templateId, payload);

  const resolvedOutPath = path.resolve(process.cwd(), outPath);
  fs.mkdirSync(path.dirname(resolvedOutPath), { recursive: true });
  fs.writeFileSync(resolvedOutPath, html, 'utf8');

  // eslint-disable-next-line no-console
  console.log(resolvedOutPath);
}

main();
