import type { EmailModule } from './defineEmail.ts';
export { lookupKeys } from './defineEmail.ts';

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
 *
 * Adding a template is one `defineEmail()` module plus one line here.
 * Nothing else: the registry, the lookup maps, and `templateData` all derive
 * from this list via `createEmailSystem()` (ADR 0004).
 */
export const templates: readonly EmailModule<any>[] = [
  passwordReset,
  orderConfirmation,
  WelcomeEmail,
  InvoiceEmail,
  TrialExpiringEmail,
  UserInvitationEmail,
  ExampleEmail,
  CommentNotificationEmail,
];
