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

export type { WelcomeEmailProps, WelcomeEmailTemplate } from './templates/welcome/types.ts';
export type { InvoiceEmailProps, InvoiceEmailTemplate } from './templates/invoice/types.ts';
export type { TrialExpiringEmailProps, TrialExpiringEmailTemplate } from './templates/trial-expiring/types.ts';
export type { UserInvitationEmailProps, UserInvitationEmailTemplate } from './templates/user-invitation/types.ts';
export type { PasswordResetEmailProps, PasswordResetEmailTemplate } from './templates/password-reset/types.ts';
export type { OrderConfirmationEmailProps, OrderConfirmationEmailTemplate } from './templates/order-confirmation/types.ts';
export type { ExampleEmailProps, ExampleEmailTemplate } from './templates/example/types.ts';
export type {
  CommentNotificationEmailProps,
  CommentNotificationEmailTemplate,
  CommentAttachment,
} from './templates/comment-notification/types.ts';
export type { EmailBrandProps } from './types/brand.ts';
export type { ITemplate } from './types/template.ts';
