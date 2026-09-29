import { describe, it, expect } from 'vitest';
import { CommentNotificationEmail } from '../../src/templates/commentNotificationEmail';
import { commentNotificationProps } from '../fixtures/props';

describe('CommentNotificationEmail', () => {
  it('has the expected canonical name', () => {
    expect(CommentNotificationEmail.name).toBe('CommentNotificationEmail');
  });

  it('renders a full HTML document without a preheader', () => {
    const html = CommentNotificationEmail.render(commentNotificationProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
    expect(html).not.toContain('class="preheader"');
  });

  it('turns newlines in the comment body into breaks and escapes HTML', () => {
    const html = CommentNotificationEmail.render({
      ...commentNotificationProps,
      body: 'line one\n<script>alert(1)</script>',
    });
    expect(html).toContain('line one<br />&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>');
  });

  it('lists every attachment', () => {
    const html = CommentNotificationEmail.render({
      ...commentNotificationProps,
      attachment_details: [
        {
          attachment_name: 'notes.pdf',
          attachment_url: 'https://example.com/notes.pdf',
          attachment_size: '12 KB',
          attachment_type: 'PDF',
        },
        {
          attachment_name: 'shot.png',
          attachment_url: 'https://example.com/shot.png',
          attachment_size: '80 KB',
          attachment_type: 'PNG',
        },
      ],
    });
    expect(html).toContain('href="https://example.com/notes.pdf"');
    expect(html).toContain('notes.pdf');
    expect(html).toContain('(12 KB PDF)');
    expect(html).toContain('shot.png');
  });

  it('omits the attachment table when there are no attachments', () => {
    const html = CommentNotificationEmail.render({
      ...commentNotificationProps,
      attachment_details: [],
    });
    expect(html).not.toContain('class="attributes"');
    expect(html).not.toContain('hero-v3.png');
    expect(html).toContain(commentNotificationProps.commenter_name);
  });

  it('links the comment and the notification settings', () => {
    const html = CommentNotificationEmail.render(commentNotificationProps);
    expect(html).toContain(`href="${commentNotificationProps.action_url}"`);
    expect(html).toContain('View the comment');
    expect(html).toContain(`href="${commentNotificationProps.notifications_url}"`);
    expect(html).toContain('Manage notifications');
    expect(html).toContain(
      `By ${commentNotificationProps.commenter_name} at ${commentNotificationProps.timestamp}`
    );
  });
});
