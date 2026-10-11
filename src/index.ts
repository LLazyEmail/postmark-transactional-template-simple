export {
  emailSystem,
  templates,
  byId,
  byName,
  templateData,
  lookup,
  renderTemplate,
  listTemplates,
  getTemplate,
} from './templates/registry.ts';

export { defineEmail, lookupKeys } from './templates/defineEmail.ts';
export { createEmailSystem } from './templates/system.ts';

export type { EmailModule } from './templates/defineEmail.ts';
export type { EmailSystem } from './templates/system.ts';
export type { ITemplate } from './types/template/index.ts';
export type { EmailBrandProps } from './types/brand.ts';

export type { WelcomeEmailProps } from './templates/welcome/types.ts';
export type { InvoiceEmailProps } from './templates/invoice/types.ts';
export type { TrialExpiringEmailProps } from './templates/trial-expiring/types.ts';
export type { UserInvitationEmailProps } from './templates/user-invitation/types.ts';
export type { PasswordResetEmailProps } from './templates/password-reset/types.ts';
export type { OrderConfirmationEmailProps } from './templates/order-confirmation/types.ts';
export type { ExampleEmailProps } from './templates/example/types.ts';
export type {
  CommentNotificationEmailProps,
  CommentAttachment,
} from './templates/comment-notification/types.ts';
