# @llazyemail/component-types

Prop and function types for shared email components. This folder does not import anything from the Postmark template repository, so it can move to its own package without a rewrite.

Until it is published, this repository resolves the name through `tsconfig` paths:

```ts
import type { ButtonProps, TypographyComponents } from '@llazyemail/component-types';
```

After publish, drop the path mapping and install the package:

```bash
npm install @llazyemail/component-types
```

`HtmlString` here is the return type of a component (`string`). It is not the full-document `HtmlString` in `src/types/template`.
