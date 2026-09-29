import type { ITemplate } from '../types/template.ts';
import {
  defineTemplate,
  type DefinedTemplate,
  type TemplateRegistration,
} from './defineTemplate.ts';

export type { TemplateRegistration };

import { passwordReset } from './password-reset.definition.ts';
import { orderConfirmation } from './order-confirmation.definition.ts';
import { InvoiceEmail } from './invoiceEmail.ts';
import { WelcomeEmail } from './welcomeEmail.ts';
import { TrialExpiringEmail } from './trialExpiringEmail.ts';
import { UserInvitationEmail } from './userInvitationEmail.ts';
import { ExampleEmail } from './exampleEmail.ts';
import { CommentNotificationEmail } from './commentNotificationEmail.ts';

import {
  invoiceSample,
  orderConfirmationSample,
  trialExpiringSample,
  userInvitationSample,
  welcomeSample,
} from './legacySamples.ts';

/**
 * The only place a template is registered.
 *
 * `registry.ts` and `scripts/template-catalog.ts` both read this list.
 * A new template is a `defineTemplate()` module plus one entry here.
 */
function adopt<Props>(
  template: ITemplate<Props>,
  meta: {
    id: string;
    aliases?: readonly string[];
    file: string;
    exportName: string;
    sample: Props;
  }
): DefinedTemplate<Props> {
  return defineTemplate({
    id: meta.id,
    name: template.name,
    aliases: meta.aliases,
    file: meta.file,
    exportName: meta.exportName,
    sample: meta.sample,
    render: (props) => template.render(props),
  });
}

export const templates: readonly TemplateRegistration[] = [
  passwordReset,
  adopt(orderConfirmation, {
    id: 'order-confirmation',
    file: 'order-confirmation.definition.ts',
    exportName: 'orderConfirmation',
    sample: orderConfirmationSample,
  }),
  adopt(WelcomeEmail, {
    id: 'WelcomeEmail',
    aliases: ['welcome'],
    file: 'welcomeEmail.ts',
    exportName: 'WelcomeEmail',
    sample: welcomeSample,
  }),
  adopt(InvoiceEmail, {
    id: 'InvoiceEmail',
    aliases: ['invoice'],
    file: 'invoiceEmail.ts',
    exportName: 'InvoiceEmail',
    sample: invoiceSample,
  }),
  adopt(TrialExpiringEmail, {
    id: 'TrialExpiringEmail',
    aliases: ['trial-expiring'],
    file: 'trialExpiringEmail.ts',
    exportName: 'TrialExpiringEmail',
    sample: trialExpiringSample,
  }),
  adopt(UserInvitationEmail, {
    id: 'UserInvitationEmail',
    aliases: ['user-invitation'],
    file: 'userInvitationEmail.ts',
    exportName: 'UserInvitationEmail',
    sample: userInvitationSample,
  }),
  ExampleEmail,
  CommentNotificationEmail,
];

export function lookupKeys(template: TemplateRegistration): string[] {
  return [template.id, template.name, ...template.aliases];
}
