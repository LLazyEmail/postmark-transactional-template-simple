// packages/template-runtime-display/src/renderers.test.ts
import { describe, it, expect } from 'vitest';
import {
  bodyComponent,
  displayBody,
  displayContent,
  displayFooter,
  displayHead,
  displayMain,
  footerComponent,
  headComponent,
  mainComponent,
} from './index';

describe('displayHead', () => {
  it('renders empty by default', () => {
    const html = displayHead();
    expect(html).toContain('<head>');
    expect(html).toContain('</head>');
    expect(html).toContain('<title></title>');
  });

  it('interpolates title and preview', () => {
    const html = displayHead({ title: 'Hi', preview: 'peek' });
    expect(html).toContain('<title>Hi</title>');
    expect(html).toContain('>peek</div>');
  });
});

describe('displayMain', () => {
  it('renders heading and body without CTA when one is missing', () => {
    expect(displayMain({ heading: 'H', bodyText: 'B' })).not.toContain('<a href=');
    expect(displayMain({ heading: 'H', ctaLabel: 'Go' })).not.toContain('<a href=');
    expect(displayMain({ heading: 'H', ctaUrl: 'https://x' })).not.toContain('<a href=');
  });

  it('renders the CTA when both ctaLabel and ctaUrl are present', () => {
    const html = displayMain({ ctaLabel: 'Go', ctaUrl: 'https://x' });
    expect(html).toContain('href="https://x"');
    expect(html).toContain('>Go</a>');
  });
});

describe('displayFooter', () => {
  it('omits unsubscribe when unsubscribeUrl is absent', () => {
    const html = displayFooter({ companyName: 'Acme' });
    expect(html).toContain('Acme');
    expect(html).not.toContain('Unsubscribe');
  });

  it('renders unsubscribe when unsubscribeUrl is present', () => {
    const html = displayFooter({ unsubscribeUrl: 'https://x/u' });
    expect(html).toContain('href="https://x/u"');
    expect(html).toContain('Unsubscribe');
  });
});

describe('displayBody', () => {
  it('composes fragments into a full document', () => {
    const html = displayBody({
      headHtml: '<head></head>',
      mainHtml: '<main></main>',
      footerHtml: '<footer></footer>',
    });
    expect(html).toMatch(/^<!DOCTYPE html>/);
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<head></head>');
    expect(html).toContain('<main></main>');
    expect(html).toContain('<footer></footer>');
    expect(html).toContain('</body>');
    expect(html).toContain('</html>');
  });

  it('is deterministic', () => {
    const a = displayBody({ mainHtml: '<main></main>' });
    const b = displayBody({ mainHtml: '<main></main>' });
    expect(a).toBe(b);
  });

  it('renders a valid shell even with no fragments', () => {
    const html = displayBody();
    expect(html).toMatch(/^<!DOCTYPE html>/);
    expect(html).toContain('<body>');
    expect(html).toContain('</html>');
  });
});

describe('components', () => {
  it('display sections delegate to the matching component', () => {
    const head = { title: 'Hi', preview: 'peek' };
    const main = { heading: 'H', bodyText: 'B', ctaLabel: 'Go', ctaUrl: 'https://x' };
    const footer = { companyName: 'Acme', unsubscribeUrl: 'https://x/u' };
    expect(displayHead(head)).toBe(headComponent(head));
    expect(displayMain(main)).toBe(mainComponent(main));
    expect(displayFooter(footer)).toBe(footerComponent(footer));
    expect(displayBody({ mainHtml: '<main></main>', footerHtml: '<footer></footer>' })).toContain(
      bodyComponent({ mainHtml: '<main></main>', footerHtml: '<footer></footer>' })
    );
  });
});

describe('displayContent', () => {
  it('renders an empty content section by default', () => {
    const html = displayContent();
    expect(html).toContain('<div>');
    expect(html).toContain('</div>');
    expect(html).not.toContain('article');
  });

  it('inserts the supplied HTML', () => {
    expect(displayContent({ content: '<p>Hello</p>' })).toContain('<p>Hello</p>');
  });
});
