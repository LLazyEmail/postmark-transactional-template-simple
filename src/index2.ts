export { WelcomeEmail } from './templates/welcomeEmail';
export { InvoiceEmail } from './templates/invoiceEmail';
export { TrialExpiringEmail } from './templates/trialExpiringEmail';
export { UserInvitationEmail } from './templates/userInvitationEmail';
export { ExampleEmail } from './templates/exampleEmail';
export { CommentNotificationEmail } from './templates/commentNotificationEmail';
export { passwordReset } from './templates/password-reset.definition';
export { orderConfirmation } from './templates/order-confirmation.definition';

export {
  renderTemplate,
  listTemplates,
  getTemplate,
} from './templates/registry';

export type { WelcomeEmailProps } from './types/welcome';
export type { InvoiceEmailProps } from './types/invoice';
export type { TrialExpiringEmailProps } from './types/trialExpiring';
export type { UserInvitationEmailProps } from './types/userInvitation';
export type { PasswordResetEmailProps } from './types/passwordReset';
export type { OrderConfirmationEmailProps } from './types/orderConfirmation';
export type { ExampleEmailProps } from './types/example';
export type {
  CommentNotificationEmailProps,
  CommentAttachment,
} from './types/commentNotification';
export type { EmailBrandProps } from './types/brand';
export type { ITemplate } from './types/template';
