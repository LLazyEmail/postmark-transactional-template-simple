| `npm test` | Run all unit and integration tests |
| `npm run test:real-data` | Run only the integration tests that generate real HTML from fixture data |
| `npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js --out=generated/password-reset.html` | Generate a template's HTML. CLI flags and the run loop come from `@llazyemail/generate-template` |
| `npm run generate:assert -- --out=generated` | Assert generated HTML via `@llazyemail/generate-template`. A file counts if it contains `<html` or `<!doctype` |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format source files with Prettier |
| `npm run format:check` | Check formatting with Prettier |
