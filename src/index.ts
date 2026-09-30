export { WelcomeEmail } from './templates/welcome/welcomeEmail.ts';
export { InvoiceEmail } from './templates/invoice/invoiceEmail.ts';
export { TrialExpiringEmail } from './templates/trial-expiring/trialExpiringEmail.ts';
export { UserInvitationEmail } from './templates/user-invitation/userInvitationEmail.ts';
export { ExampleEmail } from './templates/example/exampleEmail.ts';
export { CommentNotificationEmail } from './templates/comment-notification/commentNotificationEmail.ts';
export { passwordReset } from './templates/password-reset/passwordResetEmail.ts';
export { orderConfirmation } from './templates/order-confirmation/orderConfirmationEmail.ts';

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
