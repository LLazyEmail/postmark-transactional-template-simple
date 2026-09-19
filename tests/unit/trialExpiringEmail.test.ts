// tests/unit/trialExpiringEmail.test.ts
import { describe, it, expect } from 'vitest';
import { TrialExpiringEmail } from '../../src/templates/trialExpiringEmail';
import { trialExpiringProps } from '../fixtures/props';

describe('TrialExpiringEmail', () => {
  it('has the expected canonical name', () => {
    expect(TrialExpiringEmail.name).toBe('TrialExpiringEmail');
  });

  it('renders a full HTML document', () => {
    const html = TrialExpiringEmail.render(trialExpiringProps);
    expect(html).toMatch(/^<!DOCTYPE html/);
    expect(html).toContain('</html>');
  });

  it('includes trial metadata', () => {
    const html = TrialExpiringEmail.render(trialExpiringProps);
    expect(html).toContain(trialExpiringProps.plan_name);
    expect(html).toContain(trialExpiringProps.trial_end_date);
    expect(html).toContain(trialExpiringProps.trial_days_remaining);
    expect(html).toContain(trialExpiringProps.plan_price);
  });

  it('renders each benefit', () => {
    const html = TrialExpiringEmail.render(trialExpiringProps);
    for (const b of trialExpiringProps.benefits) {
      expect(html).toContain(b.title);
      if (b.description) expect(html).toContain(b.description);
    }
  });

  it('omits the secondary CTA when secondary_url is not provided', () => {
    const { secondary_url, ...rest } = trialExpiringProps;
    const html = TrialExpiringEmail.render(rest);
    expect(html).not.toContain('Compare plans');
  });

  it('renders the secondary CTA when secondary_url is provided', () => {
    const html = TrialExpiringEmail.render({
      ...trialExpiringProps,
      secondary_url: 'https://example.com/pricing',
    });
    expect(html).toContain('Compare plans');
    expect(html).toContain('https://example.com/pricing');
  });

  it('uses the action_url in the primary CTA', () => {
    const html = TrialExpiringEmail.render(trialExpiringProps);
    expect(html).toContain(`href="${trialExpiringProps.action_url}"`);
  });

  it('handles an empty benefits array without crashing', () => {
    expect(() =>
      TrialExpiringEmail.render({ ...trialExpiringProps, benefits: [] })
    ).not.toThrow();
  });
});