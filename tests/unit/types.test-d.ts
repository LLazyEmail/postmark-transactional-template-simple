// tests/unit/types.test-d.ts  (Vitest typecheck mode)
import { expectTypeOf } from 'vitest';
import type { ITemplate } from '../../src/types/template';
import { InvoiceEmail } from '../../src/templates/invoiceEmail';

expectTypeOf(InvoiceEmail).toMatchTypeOf<ITemplate<unknown>>();