#!/usr/bin/env node
/**
 * Generate HTML for one or every template under src/templates.
 *
 * Usage:
 *   npm run generate:template
 *   npm run generate:template -- --all
 *   npm run generate:template -- --list
 *   npm run generate:template -- --template=WelcomeEmail
 *   npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html
 *
 * Arguments:
 *   --template   template id or name (omit or pass "all" to render every template)
 *   --data       path to a payload module (single-template mode only)
 *   --out        output HTML file (single) or output directory (all)
 *   --list       print discovered templates and exit
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'src', 'templates');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DEFAULT_OUT_DIR = 'generated';

const SKIP_FILES = new Set([
  'index.js',
  'index2.js',
  'registry.ts',
  'registry.js',
]);

/**
 * Every renderable module in src/templates.
 * `ids` are the CLI names accepted for --template.
 * `exportName` is the named export that is either an ITemplate or a function.
 */
const CATALOG = [
  {
    ids: ['password-reset', 'PasswordResetEmail'],
    file: 'password-reset.definition.ts',
    exportName: 'passwordReset',
  },
  {
    ids: ['order-confirmation', 'OrderConfirmationEmail'],
    file: 'order-confirmation.definition.ts',
    exportName: 'orderConfirmation',
  },
  {
    ids: ['WelcomeEmail', 'welcome'],
    file: 'welcomeEmail.ts',
    exportName: 'WelcomeEmail',
  },
  {
    ids: ['InvoiceEmail', 'invoice'],
    file: 'invoiceEmail.ts',
    exportName: 'InvoiceEmail',
  },
  {
    ids: ['TrialExpiringEmail', 'trial-expiring'],
    file: 'trialExpiringEmail.ts',
    exportName: 'TrialExpiringEmail',
  },
  {
    ids: ['UserInvitationEmail', 'user-invitation'],
    file: 'userInvitationEmail.ts',
    exportName: 'UserInvitationEmail',
  },
];
