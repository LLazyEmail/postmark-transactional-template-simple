import type { ITemplate } from '../types/template/index.ts';
import {
  defineTemplate,
  type DefinedTemplate,
  type TemplateRegistration,
} from './defineTemplate.ts';

export type { TemplateRegistration };

import { passwordReset } from './password-reset/passwordResetEmail.ts';
import { orderConfirmation } from './order-confirmation/orderConfirmationEmail.ts';
import { InvoiceEmail } from './invoice/invoiceEmail.ts';
import { WelcomeEmail } from './welcome/welcomeEmail.ts';
import { TrialExpiringEmail } from './trial-expiring/trialExpiringEmail.ts';
import { UserInvitationEmail } from './user-invitation/userInvitationEmail.ts';
import { ExampleEmail } from './example/exampleEmail.ts';
import { CommentNotificationEmail } from './comment-notification/commentNotificationEmail.ts';

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
 * `registry.ts` and `scripts/generate-template.ts` both read this list.
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
    file: 'order-confirmation/orderConfirmationEmail.ts',
    exportName: 'orderConfirmation',
    sample: orderConfirmationSample,
  }),
  adopt(WelcomeEmail, {
    id: 'WelcomeEmail',
    aliases: ['welcome'],
    file: 'welcome/welcomeEmail.ts',
    exportName: 'WelcomeEmail',
    sample: welcomeSample,
  }),
  adopt(InvoiceEmail, {
    id: 'InvoiceEmail',
    aliases: ['invoice'],
    file: 'invoice/invoiceEmail.ts',
    exportName: 'InvoiceEmail',
    sample: invoiceSample,
  }),
  adopt(TrialExpiringEmail, {
    id: 'TrialExpiringEmail',
    aliases: ['trial-expiring'],
    file: 'trial-expiring/trialExpiringEmail.ts',
    exportName: 'TrialExpiringEmail',
    sample: trialExpiringSample,
  }),
  adopt(UserInvitationEmail, {
    id: 'UserInvitationEmail',
    aliases: ['user-invitation'],
    file: 'user-invitation/userInvitationEmail.ts',
    exportName: 'UserInvitationEmail',
    sample: userInvitationSample,
  }),
  ExampleEmail,
  CommentNotificationEmail,
];

export function lookupKeys(template: TemplateRegistration): string[] {
  return [template.id, template.name, ...template.aliases];
}
