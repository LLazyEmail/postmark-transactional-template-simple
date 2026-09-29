# Agent rules

## Package install

- Install `@llazyemail/*` packages with npm only (`npm install @llazyemail/generate-template`).
- Do **not** add git URLs (`github:LLazyEmail/...`, `git+https://...`, `#main`) as the dependency spec.
- Do **not** vendor, submodule, or `postinstall`-build the module from source as a substitute for a published package.
- Dependency versions must be semver (`^1.0.1`), resolved through the registry in `.npmrc` (`https://npm.pkg.github.com` for `@llazyemail`).
- If CI cannot install, fix registry auth (`GITHUB_TOKEN` / `NODE_AUTH_TOKEN` with `packages: read`). Do not switch the install source to git.
- If the published package is wrong or incomplete, publish a new version of the module. Do not work around it from this repo.
