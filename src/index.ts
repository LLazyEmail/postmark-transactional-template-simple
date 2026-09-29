export { WelcomeEmail } from './templates/welcomeEmail.ts';
export { InvoiceEmail } from './templates/invoiceEmail.ts';
export { TrialExpiringEmail } from './templates/trialExpiringEmail.ts';
export { UserInvitationEmail } from './templates/userInvitationEmail.ts';
export { ExampleEmail } from './templates/exampleEmail.ts';
export { CommentNotificationEmail } from './templates/commentNotificationEmail.ts';
export { passwordReset } from './templates/password-reset.definition.ts';
export { orderConfirmation } from './templates/order-confirmation.definition.ts';

export {
  renderTemplate,
  listTemplates,
  getTemplate,
} from './templates/registry.ts';

export type { WelcomeEmailProps } from './types/welcome.ts';
export type { InvoiceEmailProps } from './types/invoice.ts';
export type { TrialExpiringEmailProps } from './types/trialExpiring.ts';
export type { UserInvitationEmailProps } from './types/userInvitation.ts';
export type { PasswordResetEmailProps } from './types/passwordReset.ts';
export type { OrderConfirmationEmailProps } from './types/orderConfirmation.ts';
export type { ExampleEmailProps } from './types/example.ts';
export type {
  CommentNotificationEmailProps,
  CommentAttachment,
} from './types/commentNotification.ts';
export type { EmailBrandProps } from './types/brand.ts';
export type { ITemplate } from './types/template.ts';
