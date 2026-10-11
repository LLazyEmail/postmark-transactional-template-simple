import type { ITemplate } from '../types/template/index.ts';
import {
  defineTemplate,
  type DefinedTemplate,
  type TemplateRegistration,
} from './defineTemplate.ts';
import type { FieldCheck } from '@llazyemail/validator';

export type { TemplateRegistration };

import { passwordReset } from './password-reset/passwordResetEmail.ts';
import { orderConfirmation } from './order-confirmation/orderConfirmationEmail.ts';
import { InvoiceEmail } from './invoice/invoiceEmail.ts';
import { WelcomeEmail } from './welcome/welcomeEmail.ts';
import { TrialExpiringEmail } from './trial-expiring/trialExpiringEmail.ts';
import { UserInvitationEmail } from './user-invitation/userInvitationEmail.ts';
import { ExampleEmail } from './example/exampleEmail.ts';
import { CommentNotificationEmail } from './comment-notification/commentNotificationEmail.ts';

/**
 * The only place a template is registered.
 *
 * `registry.ts` and `scripts/create-project-generator.ts` both read this list.
 * The published `generate-template` bin loads that factory through
 * `generate-template.config.ts`.
 * A new template is a `defineTemplate()` module, one entry here, and a data
 * instance in `src/data/`.
 */
function adopt<Props>(
  template: ITemplate<Props> & { checks?: FieldCheck[] },
  meta: {
    id: string;
    aliases?: readonly string[];
    file: string;
    exportName: string;
  }
): DefinedTemplate<Props> {
  return defineTemplate({
    id: meta.id,
    name: template.name,
    aliases: meta.aliases,
    file: meta.file,
    exportName: meta.exportName,
    checks: template.checks,
    render: (props) => template.render(props),
  });
}

export const templates: readonly TemplateRegistration[] = [
  passwordReset,
  adopt(orderConfirmation, {
    id: 'OrderConfirmationEmail',
    aliases: ['order-confirmation'],
    file: 'order-confirmation/orderConfirmationEmail.ts',
    exportName: 'orderConfirmation',
  }),
  adopt(WelcomeEmail, {
    id: 'WelcomeEmail',
    aliases: ['welcome'],
    file: 'welcome/welcomeEmail.ts',
    exportName: 'WelcomeEmail',
  }),
  adopt(InvoiceEmail, {
    id: 'InvoiceEmail',
    aliases: ['invoice'],
    file: 'invoice/invoiceEmail.ts',
    exportName: 'InvoiceEmail',
  }),
  adopt(TrialExpiringEmail, {
    id: 'TrialExpiringEmail',
    aliases: ['trial-expiring'],
    file: 'trial-expiring/trialExpiringEmail.ts',
    exportName: 'TrialExpiringEmail',
  }),
  adopt(UserInvitationEmail, {
    id: 'UserInvitationEmail',
    aliases: ['user-invitation'],
    file: 'user-invitation/userInvitationEmail.ts',
    exportName: 'UserInvitationEmail',
  }),
  ExampleEmail,
  CommentNotificationEmail,
];

export function lookupKeys(template: TemplateRegistration): string[] {
  return [template.id, template.name, ...template.aliases];
}
