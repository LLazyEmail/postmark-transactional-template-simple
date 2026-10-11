// tests/unit/types.test-d.ts  (Vitest typecheck mode)
import { describe, it } from 'vitest';
import { expectTypeOf } from 'vitest';
import type { EmailModule } from '../../src/templates/defineEmail.ts';
import type { InvoiceEmailProps } from '../../src/templates/invoice/types.ts';
import { InvoiceEmail } from '../../src/templates/invoice/invoiceEmail.ts';

describe('Type checks', () => {
  it('InvoiceEmail matches the EmailModule surface', () => {
    expectTypeOf(InvoiceEmail).toMatchTypeOf<EmailModule<InvoiceEmailProps>>();
  });

  it('data is typed by the template props', () => {
    expectTypeOf(InvoiceEmail.data).toMatchTypeOf<InvoiceEmailProps>();
  });
});
