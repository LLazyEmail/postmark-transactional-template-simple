# Agent rules

## Package install

- Install `@llazyemail/*` packages with npm only (`npm install @llazyemail/generate-template`).
- Do **not** add git URLs (`github:LLazyEmail/...`, `git+https://...`, `#main`) as the dependency spec.
- Do **not** vendor, submodule, or `postinstall`-build the module from source as a substitute for a published package.
- Pin `@llazyemail/generate-template` to an exact published version (currently `1.0.3`). Do not use a git URL or a floating `*` range.
- If CI cannot install, fix registry auth (`GITHUB_TOKEN` / `NODE_AUTH_TOKEN` with `packages: read`). Do not switch the install source to git.
- If the published package is wrong or incomplete, publish a new version of the module and bump the pin. Do not work around it from this repo.

## Generate CLI

Supported flags (do not rename or drop):

- `--list`
- `--all`
- `--template=<id>`
- `--data=<path>`
- `--out=<file-or-dir>`

`npm run generate:template` must keep those flags. If the package CLI changes flag names, fix `@llazyemail/generate-template` and publish. Do not fork flags in this repo.

## Module breaks working generation

`tests/unit/generate-html-diff.test.ts` and `tests/unit/generate-write-all.test.ts` are the contract. If an npm bump of `@llazyemail/generate-template` makes those fail, treat it as a module regression. Publish a new module version and bump the pin. Do not copy engine code back into `scripts/`.
