# postmark-transactional-template-simple

```
templates/
  welcomeEmail.ts
  invoiceEmail.ts
  trialExpiringEmail.ts        ← new
  userInvitationEmail.ts       ← new
types/
  template.ts
  components.ts
  invoice.ts
  trialExpiring.ts             ← new
  userInvitation.ts            ← new
  welcome.ts                   ← new (optional, moves WelcomeEmailProps out of the template file)
  index.ts
templates/
  index.ts
examples/
  trialExpiringExample.ts      ← new
  userInvitationExample.ts     ← new
```


**Short answer: `src` as a whole does not work as one app.** There are two unfinished stacks mixed together. Only the small CommonJS renderer for two templates is wired enough to run. The TypeScript templates are broken at import time.

Repo: [LLazyEmail/postmark-transactional-template-simple](https://github.com/LLazyEmail/postmark-transactional-template-simple/tree/main/src)

---

### What is actually in `src`

| Path | Role |
|---|---|
| `src/index.js` | Public JS entry: `renderTemplate`, `listTemplates` |
| `src/templates/index.js` | Registry for **only** `password-reset` and `order-confirmation` |
| `src/templates/*.definition.js` | Those two templates |
| `src/data/*.data.js` | Fixture payloads |
| `src/templates/*.ts` | Separate TS email objects (`WelcomeEmail`, `InvoiceEmail`, etc.) |
| `src/index2.ts`, `src/invoice.ts` | Broken TS barrels |
| `src/types/` | TS prop types |
| `src/example/` vs `src/examples/` | One real example, one misnamed types file |

`package.json` points at `src/index.js`, has **no TypeScript**, no `tsconfig`, empty runtime `dependencies`. Scripts only cover JS (`jest`, eslint, prettier on `*.js`).

---

### What works

The JS path is internally consistent:

- `src/index.js` → `src/templates/index.js`
- definitions require `packages/template-engine` and `packages/template-runtime-display` (those folders exist)
- unit tests call `passwordReset(fixture)` / similar and expect HTML + validation errors

If you `npm install` and `npm test`, **those two templates should render**. That is the only “it works” slice.

```js
const { renderTemplate, listTemplates } = require('./src');
listTemplates(); // ['password-reset', 'order-confirmation']
renderTemplate('password-reset', { recipientName, resetUrl, companyName });
```

---

### What does not work

**1. TS entry files point at files that are not next to them**

`src/index2.ts`:

```ts
export { WelcomeEmail } from './welcomeEmail';
export { InvoiceEmail } from './invoiceEmail';
export { TrialExpiringEmail } from './trialExpiringEmail';
export { UserInvitationEmail } from './userInvitationEmail';
```

Those files live in `src/templates/`, not `src/`. Same mistake in `src/invoice.ts`. Node/TS cannot resolve this.

**2. Missing type module under `src/types`**

`src/types/welcome.ts` (and others) do:

```ts
import type { ITemplate } from './template';
```

`ITemplate` is in repo-root `types/template.ts`, **not** `src/types/template.ts`. That import fails.

**3. Two APIs that never meet**

- JS: `renderTemplate(id, payload)` + definition files  
- TS: `{ name, render(props) }` objects  

The registry does not include Welcome / Invoice / Trial / Invitation. The TS objects do not use the engine in `packages/`.

**4. Examples are wrong**

- `src/example/trialExpiringExample.ts` is a real usage of `TrialExpiringEmail.render(props)` — but there is no runner and no TS toolchain.
- `src/examples/userInvitationExample.ts` is **not an example**. It is a copy of the props interface, and it imports `./template` from the wrong folder.

**5. You cannot run the TS templates as the package is set up**

No `typescript` in `package.json`, no build step, `main` is CommonJS only. Dropping `index2.ts` into Node will not execute.

---

```
npm run generate:template
npm run generate:template -- --all
npm run generate:template -- --list
npm run generate:template -- --template=InvoiceEmail
npm run generate:template -- --template=password-reset --data=src/data/password-reset.data.js
```

### Verdict

| Question | Answer |
|---|---|
| Does the folder exist and contain real template code? | Yes |
| Can `password-reset` / `order-confirmation` render via JS? | Likely yes |
| Is `src` a finished, runnable Postmark template package? | **No** |
| Do the TS templates compile/export as written? | **No** |

It looks like a JS mini-engine was started, then Postmark-style TS templates were dumped in without fixing paths, types, or the package entry. Treat the JS pair as the only working core; the rest needs path fixes and a TypeScript build before it “works.”
