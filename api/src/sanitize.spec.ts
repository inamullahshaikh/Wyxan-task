import { readFileSync } from 'node:fs';
import { sanitize } from './sanitize.js';

const hostile = readFileSync(new URL('./fixtures/escape.html', import.meta.url), 'utf8');

describe('sanitize', () => {
  const { html, text } = sanitize(hostile);

  it.each([
    ['<script', /<script/i],
    ['event handlers', /\son\w+\s*=/i],
    ['javascript: URLs', /="[^"]*script\s*:/i],
    ['forms and inputs', /<(form|input|button)/i],
    ['meta, base, link', /<(meta|base|link)\b/i],
    ['iframe, object, embed, svg', /<(iframe|object|embed|svg)\b/i],
    ['target', /\starget\s*=/i],
    ['off-web href/src', /(href|src)="(https?:)?\/\//i],
    ['the <title>', /hacked/i],
  ])('drops %s', (_, pattern) => {
    expect(html).not.toMatch(pattern);
  });

  it('keeps what authors are allowed', () => {
    expect(html).toContain('<style>');
    expect(html).toContain('<h1>Try to escape</h1>');
    expect(html).toContain('href="tidepool.zz"');
    expect(html).toContain('href="zz://fieldguide.zz"');
    expect(html).toContain('href="#end"');
    expect(html).toContain('src="data:image/gif;base64,');
    expect(html).toContain('position: fixed'); // harmless: confined to the iframe box
  });

  it('extracts readable text for search', () => {
    expect(text).toContain('Try to escape This page was published');
    expect(text).toContain('The end. Salt & pepper <3');
    expect(text).not.toMatch(/font-family|top\.location|hacked/);
    expect(sanitize('<p>one</p><p>two</p>').text).toBe('one two');
  });
});
