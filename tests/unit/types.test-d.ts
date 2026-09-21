// tests/unit/types.test-d.ts  (Vitest typecheck mode)
import { describe, it } from 'vitest';
import { expectTypeOf } from 'vitest';
import type { ITemplate } from '../../src/types/template';
import { InvoiceEmail } from '../../src/templates/invoiceEmail';

describe('Type checks', () => {
  it('InvoiceEmail matches ITemplate interface', () => {
    expectTypeOf(InvoiceEmail).toMatchTypeOf<ITemplate<unknown>>();
  });
});