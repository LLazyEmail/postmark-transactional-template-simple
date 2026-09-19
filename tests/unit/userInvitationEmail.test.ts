// tests/unit/userInvitationEmail.test.ts
import { describe, it, expect } from 'vitest';
import { UserInvitationEmail } from '../../src/templates/userInvitationEmail';
import { userInvitationProps } from '../fixtures/props';

describe('UserInvitationEmail', () => {
  it('has the expected canonical name', () => {
    expect(UserInvitationEmail.name).toBe('UserInvitationEmail');
  });

  it('renders a full HTML document', () => {
    const html = UserInvitationEmail.render(userInvitationProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('includes the inviter and role', () => {
    const html = UserInvitationEmail.render(userInvitationProps);
    expect(html).toContain(userInvitationProps.inviter_name);
    expect(html).toContain(userInvitationProps.role);
  });

  it('includes the workspace name when provided', () => {
    const html = UserInvitationEmail.render(userInvitationProps);
    expect(html).toContain('Acme HQ');
  });

  it('omits the workspace blurb when workspace_name is not provided', () => {
    const { workspace_name, ...rest } = userInvitationProps;
    const html = UserInvitationEmail.render(rest);
    expect(html).not.toContain('Acme HQ');
    // Still says the invitation part.
    expect(html).toContain(rest.inviter_name);
  });

  it('renders a Decline link when decline_url is provided', () => {
    const html = UserInvitationEmail.render(userInvitationProps);
    expect(html).toContain('Decline invitation');
    expect(html).toContain(userInvitationProps.decline_url!);
  });

  it('falls back to the "ignore this email" note when decline_url is absent', () => {
    const { decline_url, ...rest } = userInvitationProps;
    const html = UserInvitationEmail.render(rest);
    expect(html).not.toContain('Decline invitation');
    expect(html).toContain('safely ignore this email');
  });

  it('renders the expires_at timestamp', () => {
    const html = UserInvitationEmail.render(userInvitationProps);
    expect(html).toContain(userInvitationProps.expires_at);
  });
});