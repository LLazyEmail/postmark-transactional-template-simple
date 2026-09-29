#!/usr/bin/env node
/**
 * Git installs of @llazyemail/generate-template do not include dist/.
 * Build it after npm install so CI and local git installs both resolve.
 */
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let pkgDir;
try {
  pkgDir = path.dirname(require.resolve('@llazyemail/generate-template/package.json'));
} catch {
  pkgDir = path.resolve('node_modules/@llazyemail/generate-template');
}

if (!existsSync(path.join(pkgDir, 'package.json'))) {
  console.warn('skip build-generate-template: package not installed');
  process.exit(0);
}

const distEntry = path.join(pkgDir, 'dist', 'index.js');
if (existsSync(distEntry)) {
  process.exit(0);
}

const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { cwd: pkgDir, stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund']);
run('npm', ['run', 'build']);
