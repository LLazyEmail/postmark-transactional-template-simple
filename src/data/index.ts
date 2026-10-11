import { passwordResetData } from './password-reset.ts';
import { orderConfirmationData } from './order-confirmation.ts';
import { welcomeData } from './welcome.ts';
import { invoiceData } from './invoice.ts';
import { trialExpiringData } from './trial-expiring.ts';
import { userInvitationData } from './user-invitation.ts';
import { exampleData } from './example.ts';
import { commentNotificationData } from './comment-notification.ts';

export {
  passwordResetData,
  orderConfirmationData,
  welcomeData,
  invoiceData,
  trialExpiringData,
  userInvitationData,
  exampleData,
  commentNotificationData,
};

/**
 * One data instance per registered template, keyed by the CamelCase
 * template id (see `src/templates/manifest.ts`). Templates themselves
 * carry no payload — the generator and the render-all tests join the
 * two here. `tests/unit/data-instances.test.ts` enforces that every
 * template id has an entry.
 */
export const templateData: Record<string, unknown> = {
  PasswordResetEmail: passwordResetData,
  OrderConfirmationEmail: orderConfirmationData,
  WelcomeEmail: welcomeData,
  InvoiceEmail: invoiceData,
  TrialExpiringEmail: trialExpiringData,
  UserInvitationEmail: userInvitationData,
  ExampleEmail: exampleData,
  CommentNotificationEmail: commentNotificationData,
};
